'use client';

import { db } from '@/configs';
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { eq, and } from 'drizzle-orm';
import React, { useEffect, useState, useCallback } from 'react';
import CourseCards from './CourseCards';
import { Course } from '@/types';

function UserCourseList() {
    const [courseList, setCourseList] = useState<Course[]>([]);
    const [isClient, setIsClient] = useState(false);
    const { user } = useUser();

    // Memoize the getUserCourses function
    const getUserCourses = useCallback(async (user) => {
        try {
            if (!user?.primaryEmailAddress?.emailAddress) return;

            const result = await db
                .select()
                .from(CourseList)
                .where(
                    and(
                        eq(CourseList.createdBy, user.primaryEmailAddress.emailAddress)
                    )
                );

            console.log('User Courses:', result);
            setCourseList(result); // Update state with fetched courses
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    }, []);

    useEffect(() => {
        setIsClient(true); // Set isClient to true after component mounts
    }, []);

    useEffect(() => {
        if (!user || !isClient) return; // Only run on the client
        getUserCourses(user)

    }, [user, isClient, getUserCourses]); // Add getUserCourses to dependencies


    return (
        <div>
            <h2 className='font-bold text-center text-xl text-blue-600 py-2 mt-8 mb-4'>User Courses List</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {courseList.map((course, index) => (
                    <CourseCards course={course} key={index} refreshData={() => getUserCourses(user)} />
                ))}
            </div>
        </div>
    );
}

export default UserCourseList;
