'use client';

import CourseDetail from '@/components/course/CourseDetail';
import { db } from '@/configs';
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { eq, and } from 'drizzle-orm';
import ChapterList from '@/components/course/ChapterList';
import FinishClient from '@/components/course/FinishClient';
import Heaader from '@/components/course/Heaader';
import { Course } from '@/types';

interface CoursePageProps {
  params: Promise<{ id: string }>;
}


const CoursePage = ({ params }: CoursePageProps) => {
  const { user } = useUser();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  // Unwrap the params object using React.use()
  const { id } = React.use(params);

  useEffect(() => {
    if (!id || !user) {
      setLoading(false);
      return;
    }

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
          setCourse(result[0] as Course);
        } else {
          console.error('Course not found');
        }
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };

    getCourse();
  }, [id, user]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading course details...</p>;
  }

  if (!course) {
    return <p className="text-center text-gray-500">Course not found.</p>;
  }

  return (
    <div>
      <Heaader />
      <div className="mt-10 mb-8 px-7 md:px-16 lg:px-32">
        <div className="font-bold text-center text-2xl text-blue-700 py-2">Course Page</div>
        <FinishClient course={course} />
        <CourseDetail course={course} />
        <ChapterList course={course} edit={false} />
      </div>
    </div>
  );
};

export default CoursePage;