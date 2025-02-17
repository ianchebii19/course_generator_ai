'use client';

import CourseDetail from '@/components/course/CourseDetail';
import { db } from '@/configs';
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState, use } from 'react';
import { eq, and } from 'drizzle-orm';
import ChapterList from '@/components/course/ChapterList';
import FinishClient from '@/components/course/FinishClient';
import Heaader from '@/components/course/Heaader';

interface CoursePageProps {
  params: Promise<{ id: string }>;
}

const Course = ({ params }: CoursePageProps) => {
  const { user } = useUser();
  const [course, setCourse] = useState<typeof Course  | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Unwrap the params object using React.use()
  const { id } = use(params);

  useEffect(() => {
    setIsClient(true); // Set isClient to true after component mounts
  }, []);

  useEffect(() => {
    if (!id || !user || !isClient) return; // Only run on the client

    const getCourse = async () => {
      try {
        const result = await db
          .select()
          .from(CourseList)
          .where(
            and(
              eq(CourseList.courseId, id),
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
  }, [id, user, isClient]);

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <div>
      <Heaader />
      <div className="mt-10 mb-8 px-7 md:px-16 lg:px-32">
        <div className="font-bold text-center text-2xl text-blue-700 py-2">Course Page</div>

        {course ? (
          <>
            <FinishClient course={course} />
            <CourseDetail course={course} />
            <ChapterList course={course} edit={false} />
          </>
        ) : (
          <p className="text-center text-gray-500">Loading course details...</p>
        )}
      </div>
    </div>
  );
};

export default Course;