// @ts-nocheck
'use client';

import { db } from '@/configs';
import { Chapters, CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { eq, and } from 'drizzle-orm';
import React, { use, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import CourseInfo from '@/components/course/CourseInfo';
import { Course } from '@/types'; // ✅ Import shared type
import CourseDetail from '@/components/course/CourseDetail';
import ChapterList from '@/components/course/ChapterList';
import { GenerateChapterContent_AI } from '@/configs/AiModel';
import { getVideos } from '@/configs/service';
import { useRouter } from 'next/navigation'; 
// Updated import

function CourseLayout({ params: promiseParams }: { params: Promise<{ id: string }> }) {
  const params = use(promiseParams);
  const { user } = useUser();
  const [course, setCourse] = useState<Course | null>(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter(); // Updated router import

  useEffect(() => {
    setIsClient(true); // Set isClient to true after component mounts
  }, []);

  useEffect(() => {
    if (!params?.id || !user || !isClient) return; // Only run on the client

    const GetCourse = async () => {
      try {
        const result = await db
          .select()
          .from(CourseList)
          .where(
            and(
              eq(CourseList.courseId, params.id),
              eq(CourseList.createdBy, user.primaryEmailAddress?.emailAddress || '')
            )
          );

        if (result.length > 0) {
          setCourse({
            ...result[0],
            courseOutput: result[0].courseOutput as Course['courseOutput'],
          });
        }

        console.log('Fetched Course:', result[0]);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    GetCourse();
  }, [params.id, user, isClient]);

  const GenerateChapterContent = async () => {
    if (!isClient || !course || !course.courseOutput?.Chapters) {
      console.warn('No course or chapters available');
      return;
    }

    try {
      for (let index = 0; index < course.courseOutput.Chapters.length; index++) {
        const chapter = course.courseOutput.Chapters[index];
        const PROMPT = `Explain the concept in detail on Topic: ${course.name}, Chapter: ${chapter['Chapter Name']} in JSON format with fields as title and description in detail, Code Example (HTML format) if applicable.`;

        let videoId: string = '';

        // Generate AI content for the chapter
        const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
        const responseText = await result.response?.text();
        console.log('AI-generated content:', responseText);

        // Fetch YouTube videos for the chapter
        const query = `${course.name}: ${chapter['Chapter Name']}`;
        const videos = await getVideos(query);

        if (videos.length > 0) {
          videoId = videos[0].id.videoId;
          console.log('Fetched videoId:', videoId); // Extract videoId from the first result
        }

        // Save chapter content to the database
        await db.insert(Chapters).values({
          chapterId: index + 1, // Use a unique identifier for each chapter
          ChapterName: chapter['Chapter Name'] || 'Untitled Chapter',
          videoId: videoId, // Use the fetched videoId
          courseId: course.courseId,
          content: responseText || '', // Save AI-generated content
        });

        console.log(`Saved chapter: ${chapter['Chapter Name']} with Video ID: ${videoId}`);
      }

      // Update the course after all chapters are processed
      await db
        .update(CourseList)
        .set({ 
          published: true
        })
        .where(eq(CourseList.courseId, course.courseId));

      // Redirect to the finish page
      router.replace(`/create-course/course/${course.courseId}/finish`);
    } catch (error) {
      console.error('Error generating AI-generated chapter content:', error);
    }
  };

  return (
    <div className="mt-10 mb-8 px-7 md:px-16 lg:px-32">
      <div className="font-bold text-center text-2xl text-blue-700 py-2">Course Layout</div>

      {/* Render Course Info */}
      {isClient && <CourseInfo course={course} edit={true} />}

      {/* Render Course Details */}
      {isClient && <CourseDetail course={course} />}

      {/* Render Chapter List */}
      {isClient && <ChapterList course={course} edit={true} />}

      {/* Generate Course Content Button */}
      {isClient && (
        <Button className="my-6 bg-blue-500 hover:bg-blue-400" onClick={GenerateChapterContent}>
          Generate Course Content
        </Button>
      )}
    </div>
  );
}

export default CourseLayout;