import React from 'react'
import EditChapter from './EditChapter';
// Define the types for the chapter and course props
interface Chapter {
  id?: string; // Assuming each chapter has a unique ID
  name?: string;
  description?: string;
  duration?: string;
}

interface Course {
  courseOutput?: {
    course?: {
      chapters?: Chapter[];
    };
  };
}

interface ChapterListProps {
  course: Course;
}

const ChapterList: React.FC<ChapterListProps> = ({ course }) => {
  return (
    <div className='mt-3 border rounded-lg shadow-sm'>
      <div className='text-xl'>Chapters</div>
      <div>
        {course?.courseOutput?.course?.chapters?.map((chapter, index) => (
          <div key={chapter.id || index} className='flex gap-2 items-center'>
            <h2 className='bg-primary text-xl rounded-full h-10 p-2 items-center w-10'>
              {index + 1}
            </h2>
            <div>
              <h2>{chapter?.name || 'Chapter Name Not Available'}</h2>
              <p>{chapter?.description || 'Description Not Available'}</p>
              <p>{chapter?.duration || 'Duration Not Available'}</p>
            </div>
            <EditChapter course={course} index={index} /> {/* Render EditChapter for each chapter */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterList;
