'use client';

import CourseCards from "@/components/dashboard/CourseCards";
import { db } from "@/configs";
import { CourseList } from "@/configs/schema";
import { Course } from "@/types";
import { use, useEffect, useState } from "react";

const Explore = ({ params: promiseParams }: { params: Promise<{ id: string }> }) => {
  const params = use(promiseParams);
  const [courseData, setCourseData] = useState<Course[] | null>(null);

  useEffect(() => {
    getAllCourses();
  }, []);

  const getAllCourses = async () => {
    try {
      const result = await db
        .select()
        .from(CourseList)
        .limit(9)
        .offset(0);

      setCourseData(result);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  return (
    <div>
      <div className="mx-4 bg-gray-100 p-6 rounded-md">
        <h1 className="text-center text-xl font-bold my-6 text-blue-500">
          Explore More Projects Built by Other Users
        </h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courseData?.map((course, index) => (
            <div key={index}>
              <CourseCards course={course} refreshData={getAllCourses} />
            </div>
          ))}
        </div>
        <div>
            
        </div>
      </div>
    </div>
  );
};

export default Explore;