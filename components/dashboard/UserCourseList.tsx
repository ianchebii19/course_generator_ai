
'use client'
import { db } from '@/configs'
import { CourseList } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import CourseCards from './CourseCards'

function UserCourseList () {
  const user = useUser()
  useEffect(() =>{
    if(!user) return
    getUserCourse()
  })
 const [courseList, setCourseList] = useState([])
 const getUserCourse=() =>{
  const result = await db.select(.from(CourseList)
  .where(eq(CourseList.createdBy, user?.primaryEmailAddress.emailAddress)))
  setCourseList(result)
 }

  return (
    <>
    <div>
      <h2>
        My AI Courses
      </h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {
          courseList?.map(course, index) => (
            <CourseCards course={course} key={index} refreshData={getUserCourse}/>

          )
            }
      </div>
    </div>
    </>
  )
}

export default UserCourseList