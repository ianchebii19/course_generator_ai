import CourseDetail from '@/components/course/CourseDetail'
import CourseInfo from '@/components/course/CourseInfo'
import { db } from '@/configs'
import { CourseList } from '@/configs/schema'
import React, { useEffect } from 'react'

const Course = (params) => {
    const course=params.courseId
    const [courseData, setCourseData]=React.useState()
    useEffect(course){
        getCourse()
    }[]
    const getCourse=async ()=>{
        const result=await db.select().from(CourseList)
        .where(eq(CourseList.courseId, course))
        setCourseData(result[0])
    }
    
  return (
    <div>
        <CourseInfo  course={course} edit={false}>
        <CourseDetail course={course}/>

    </div>
  )
}

export default Course