'use client';

import { db } from '@/configs';
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { eq, and } from 'drizzle-orm';
import React, { use, useEffect, useState } from 'react';
import { Course } from '@/types'; // ✅ Import shared type
// Updated import
import FinishClient from '@/components/course/FinishClient';

function CourseLayout({ params: promiseParams }: { params: Promise<{ id: string }> }) {
  const params = use(promiseParams);
  const { user } = useUser();
  const [course, setCourse] = useState<Course | null>(null);
  const [isClient, setIsClient] = useState(false);// Updated router import

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
            ...result[0],});
        }

        console.log('Fetched Course:', result[0]);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    GetCourse();
  }, [params.id, user, isClient]);

  
  return (
    <div className="mt-10 mb-8 px-7 md:px-16 lg:px-32">
      <div className="font-bold text-center text-xl text-blue-600 py-2">Congratulation your course is ready!</div>

<FinishClient course={course}/>
    
      
    </div>
  );
}

export default CourseLayout;