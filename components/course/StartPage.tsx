'use client';  

import { db } from '@/configs';  
import { Chapters, CourseList } from '@/configs/schema';  
import { useUser } from '@clerk/nextjs';  
import React, { useEffect, useState, use } from 'react';  
import { eq, and } from 'drizzle-orm';  

interface Course {  
  courseId: string;  
  createdBy: string;  
  courseOutput: {  
    'Course Name': string;  
    Chapters: Array<{  
      'Chapter Name': string;  
      Duration: string;  
    }>;  
  };  
}  

interface CoursePageProps {  
  params: Promise<{ id: string }>;  
}  

const CoursePage = ({ params }: CoursePageProps) => {  
  const { user } = useUser();  
  const [course, setCourse] = useState<Course | null>(null);  
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
          .where(eq(CourseList.courseId, id));  

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

  const getSelectedChapterContent = async (chapterId: string) => {  
    if (!course) {  
      console.error('Course is not available');  
      return;  
    }  

    try {  
      const result = await db  
        .select()  
        .from(Chapters)  
        .where(  
          and(  
            eq(Chapters.id, parseInt(chapterId)), // Convert chapterId to number  
            eq(Chapters.courseId, course.courseId),  
          )  
        );  

      console.log(result);  
    } catch (error) {  
      console.error('Error fetching chapter content:', error);  
    }  
  };  

  if (!isClient) {  
    return null; // Render nothing on the server  
  }  

  return (  
    
    <div className='flex'>
      <div className='md:w-64 h-screen bg-blue-50 hidden md:block'>
        <h2 className='bg-blue-600 font-bold text-ld px-6 py-4 text-white'>
          {course?.courseOutput?.['Course Name'] || 'Course Name Not Available'}
        </h2>
        <div>
          <div className="font-bold text-center text-2xl text-blue-700 py-2">Chapters</div>
          <div className="space-y-4 cursor-pointer">
            {course?.courseOutput?.Chapters?.map((chapter, index) => (
              <div
                key={index}
                className="flex gap-4 items-start p-4 border rounded-lg shadow-sm"
                onClick={() => getSelectedChapterContent(index.toString())}
              >
                {/* Chapter Number */}
                <div className="bg-blue-400 text-white text-lg rounded-full h-8 w-8 flex items-center justify-center">
                  {index + 1}
                </div>

                {/* Chapter Details */}
                <div className="flex-1">
                  <h2 className="font-semibold text-md text-blue-500">
                    {chapter['Chapter Name'] || 'Chapter Name Not Available'}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Duration: {chapter.Duration || 'Duration Not Available'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='w-full'>
       
      </div>
    </div>
  );  
};  

export default CoursePage;