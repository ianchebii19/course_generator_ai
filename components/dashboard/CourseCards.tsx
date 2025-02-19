// @ts-nocheck
import React from 'react';
import { IoMdMore } from 'react-icons/io';
import Dropdown from './Dropdown';
import { CourseList } from '@/configs/schema';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/configs';
import { eq } from 'drizzle-orm';
import { Course } from '@/types';

// Define the props for the CourseCards component
interface CourseCardsProps {
  course: Course;
  refreshData: () => void;
  ['Course Name']?: string;
}

function CourseCards({ course, refreshData }: CourseCardsProps) {
  const handleDelete = async () => {
    try {
      const resp = await db
        .delete(CourseList)
        .where(eq(CourseList.id, course.id))
        .returning({ id: CourseList.id });

      if (resp) {
        refreshData(); // Refresh the data after deletion
        alert('Course deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course. Please try again.');
    }
  };

  return (
    <div className="border rounded-lg shadow-sm overflow-hidden">
      <Link href={`/course/${course.courseId}`}>
        <Image
          src={course.courseBanner || '/coursegen.jpeg'} // Fallback image
          alt={course?.name || 'Course Image'}
          width={300}
          height={200}
          className="rounded-t-md h-[200px] object-cover w-full"
        />
      </Link>

      <div className="p-4">
        <div className="flex justify-between items-center">
        {/* @ts-ignore*/}
          <h2 className="text-lg font-medium text-blue-500">
            {course?.courseOutput?.['Course Name'] || 'Untitled Course'}
          </h2>
          <div>
            <Dropdown handleOnDelete={handleDelete}>
              <IoMdMore className="text-xl cursor-pointer" />
            </Dropdown>
          </div>
        </div>

        <div className="mt-2 text-sm text-gray-600 flex justify-between">
          <p>{course.courseOutput?.Chapters?.length || 0} Chapters</p>
          <p>{course?.level || 'Level Not Available'}</p>
        </div>
      </div>
    </div>
  );
}

export default CourseCards;