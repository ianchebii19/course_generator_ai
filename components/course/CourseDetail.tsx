import React from 'react';

// Define the types for the course prop
interface Course {
  level?: string;
  courseOutput?: {
    course?: {
      duration?: string;
      noOfChapters?: number;
    };
  };
  includeVideo?: boolean; // Assuming this is a boolean
}

interface CourseDetailProps {
  course: Course;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course }) => {
  return (
    <div className='border p-6 rounded-md shadow-sm mt-4'>
      <div className='grid grid-cols-2 md:grid-cols-4'>
        <div className='flex gap-3'>
          <h2 className='text-gray-400'>Skill Level</h2>
          <h2 className='font-medium text-lg'>{course?.level}</h2>
        </div>
        <div className='flex gap-3'>
          <h2 className='text-gray-400'>Duration</h2>
          <h2 className='font-medium text-lg'>{course?.courseOutput?.course?.duration}</h2>
        </div>
        <div className='flex gap-3'>
          <h2 className='text-gray-400'>No of Chapters</h2>
          <h2 className='font-medium text-lg'>{course?.courseOutput?.course?.noOfChapters}</h2>
        </div>
        <div className='flex gap-3'>
          <h2 className='text-gray-400'>Video</h2>
          <h2 className='font-medium text-lg'>{course?.includeVideo ? 'Yes' : 'No'}</h2>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
