// @ts-nocheck
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Course } from '@/types';

interface FinishClientProps {
  course: Course | null;
}

export default function FinishClient({ course }: FinishClientProps) {
  return (
    <div className="p-10 border rounded-xl shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Section: Course Details */}
        <div>
          <h2 className="font-bold text-md flex gap-3 items-center text-blue-600">
            {course?.courseOutput?.['Course Name'] || 'Course Name Not Available'}
          </h2>
          <p className="text-gray-500">{course?.courseOutput?.Description || 'Description Not Available'}</p>

          <h3 className="mt-2 text-sm text-blue-400">Category: {course?.category || 'Category Not Available'}</h3>

          <Link href={`/course/${course?.courseId}/start`}>
            <Button className="w-full my-4 bg-blue-500 hover:bg-blue-400">Start</Button>
          </Link>
        </div>

        {/* Right Section: Image Upload */}
        <div>
          <Image
            src={course?.courseBanner || '/coursegen.jpeg'}
            alt="Selected"
            width={250}
            height={250}
            className="w-full h-[250px] object-cover rounded-xl"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
