'use client';

import { CourseList, Chapters } from '@/configs/schema'; // Ensure Chapters is imported
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { GenerateChapterContent_AI } from '@/configs/AiModel';
import { db } from '@/configs';
import CourseInfo from '@/components/course/CourseInfo';
import CourseDetail from '@/components/course/CourseDetail';
import ChapterList from '@/components/course/ChapterList';

interface Params {
  CourseId?: string;
}

interface Course {
  id: number;
  courseId: string;
  name: string;
  category: string;
  level: string;
  createdBy: string;
  userName: string;
  includeVideo: string;
  courseOutput?: {
    course?: {
      name?: string;
      description?: string;
      category?: string;
    };
    chapters?: { name: string }[];
  };
  userProfileImage: string;
}

function CourseLayout({ params }: { params: Params }) {
  const { user } = useUser();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (params?.CourseId && user) {
      GetCourse();
    }
  }, [params, user]);

  const GetCourse = async () => {
    if (!params?.CourseId || !user?.primaryEmailAddress?.emailAddress) {
      console.log('Missing CourseId or user email address');
      return;
    }

    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.courseId, params.CourseId),
            eq(CourseList.createdBy, user.primaryEmailAddress.emailAddress)
          )
        );

      setCourse(result[0] || null);
      console.log('Fetched Course:', result[0]);
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  };

  const GenerateChapterContent = async () => {
    if (!course || !course.courseOutput?.chapters) {
      console.warn('No course or chapters available');
      return;
    }

    for (const chapter of course.courseOutput.chapters) {
      const PROMPT = `Explain the concept in detail on Topic: ${course.courseOutput.course?.name}, Chapter: ${chapter.name} in JSON format with fields as title and description in detail, Code Example (HTML format) if applicable.`;

      try {
        let videoId = '';

        const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
        const responseText = await result.response?.text();
        console.log('AI-generated content:', responseText);

        // Simulated video fetching service (replace with actual implementation)
        const res = await service.getVideos(`${course.courseOutput.course?.name}: ${chapter.name}`);
        videoId = res[0]?.id?.videoId || '';

        await db.insert(Chapters).values({
          chapterName: chapter.name,
          videoId: videoId,
          courseId: course.courseId,
        });

        console.log(`Saved chapter: ${chapter.name} with Video ID: ${videoId}`);
      } catch (error) {
        console.error('Error generating AI-generated chapter content:', error);
      }
    }
  };

  return (
    <div className='mt-10 mb-12 px-7 md:px-20 lg:px-44'>
      <div className='font-bold text-center text-2xl'>Course Layout</div>
      <CourseInfo course={course} />
      <CourseDetail course={course} />
      <ChapterList course={course} />

      <Button className='my-6' onClick={GenerateChapterContent}>
        Generate Course Content
      </Button>
    </div>
  );
}

export default CourseLayout;
