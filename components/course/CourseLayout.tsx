// components/course/CourseLayout.tsx (Client Component)
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import CourseInfo from '@/components/course/CourseInfo';
import CourseDetail from '@/components/course/CourseDetail';
import ChapterList from '@/components/course/ChapterList';
import { Course } from '@/types';
import { GenerateChapterContent_AI } from '@/configs/AiModel';
import { db } from '@/configs';
import { Chapters } from '@/configs/schema';

function CourseLayout({ course }: { course: Course | null }) {
  const [currentCourse, setCurrentCourse] = useState(course);

  const generateChapterContent = async () => {
    if (!currentCourse || !currentCourse.courseOutput?.Chapters) {
      console.warn('No course or chapters available');
      return;
    }

    for (const chapter of currentCourse.courseOutput.Chapters) {
      const prompt = `Explain the concept in detail on Topic: ${currentCourse.name}, Chapter: ${chapter.name} in JSON format with fields as title and description in detail, Code Example (HTML format) if applicable.`;

      try {
        // Generate AI content for the chapter
        const result = await GenerateChapterContent_AI.sendMessage(prompt);
        const responseText = await result.response?.text();
        console.log('AI-generated content:', responseText);

        // Save chapter content to the database
        await db.insert(Chapters).values({
          chapterName: chapter.name,
          videoId: '', // Replace with actual video ID if available
          courseId: currentCourse.courseId,
          content: responseText || '', // Save AI-generated content
        });

        console.log(`Saved chapter: ${chapter.ChapterName}`);
      } catch (error) {
        console.error('Error generating AI-generated chapter content:', error);
      }
    }
  };

  return (
    <div className="mt-10 mb-12 px-7 md:px-20 lg:px-44">
      <div className="font-bold text-center text-2xl">Course Layout</div>

      {/* Render Course Info */}
      <CourseInfo course={currentCourse} edit={true} />

      {/* Render Course Details */}
      <CourseDetail course={currentCourse} />

      {/* Render Chapter List */}
      <ChapterList course={currentCourse} />

      {/* Generate Course Content Button */}
      <Button className="my-6" onClick={generateChapterContent}>
        Generate Course Content
      </Button>
    </div>
  );
}

export default CourseLayout;
