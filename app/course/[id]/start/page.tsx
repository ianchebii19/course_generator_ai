// @ts-nocheck
'use client';

import { db } from '@/configs';
import { Chapters, CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState, use } from 'react';
import { eq, and } from 'drizzle-orm';
import { Chapter, Course } from '@/types';
import ChapterListCard from '@/components/course/ChapterListCard';
import ChapterContent from '@/components/course/ChapterContent';
import Heaader from '@/components/course/Heaader';

function CoursePage({ params: promiseParams }: { params: Promise<{ id: string }> }) {
  const params = use(promiseParams); // Unwrap the params Promise
  const { user } = useUser();
  const [course, setCourse] = useState<Course | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);

  useEffect(() => {
    if (!params?.id || !user) return;

    const getCourse = async () => {
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

    getCourse();
  }, [params.id, user]);

  const getSelectedChapterContent = async (chapterId: number) => {
    if (!course?.courseId) {
      console.error('Course ID is not available');
      return;
    }

    try {
      const result = await db
        .select()
        .from(Chapters)
        .where(
          and(
            eq(Chapters.chapterId, chapterId),
            eq(Chapters.courseId, course.courseId)
          )
        );

      if (result.length > 0) {
        setSelectedChapter(result[0]); // Update selectedChapter directly
        console.log('Selected Chapter Content:', result[0]);
      } else {
        setSelectedChapter(null);
        console.warn('No chapter content found for chapterId:', chapterId);
      }
    } catch (error) {
      console.error('Error fetching chapter content:', error);
    }
  };
  // @ts-ignore

  return (
    <div>
      <Heaader/>
      <div className="flex">
      {/* Sidebar */}
      <div className="md:w-64 h-screen hidden md:block border-r shadow-sm">
        <h2 className="text-white bg-blue-400 px-4 py-2 font-medium text-lg">
        {/* @ts-ignore*/}
          {course?.courseOutput?.['Course Name'] || 'Course Name Not Available'}
        </h2>
        <div>
           {/* @ts-ignore*/}
          {course?.courseOutput?.Chapters?.map((chapter, index) => (
             
            <div
              key={index}
               
              className={`cursor-pointer hover:bg-blue-100 ${
                
                selectedChapter?.['Chapter Name'] === chapter['Chapter Name'] ? 'bg-blue-100' : ''
              }`}
              onClick={() => getSelectedChapterContent(index + 1)}
            >
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full p-4">
         {/* @ts-ignore*/}
        <ChapterContent chapter={selectedChapter} />
      </div>
    </div>
    </div>
   
  );
}

export default CoursePage;