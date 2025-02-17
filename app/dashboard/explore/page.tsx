

const Explore = () => {
    const course=params.courseId
    const [courseData, setCourseData]=React.useState()
    useEffect(course){
        getCourse()
    }[]
    const getCourse=async ()=>{
        const result=await db.select().from(CourseList)
        .limit(9)
        .offset(0)
        .where(eq(CourseList.courseId, course))
        setCourseData(result[0])
    }
    
  return (
    <div>
        <div>
            <h1>
                Explore More Projects
            </h1>
            <div>
                {
                    courseData &&
                    courseData.relatedCourses.map((relatedCourse, index) => (
                        <div key={index}>
                            <CourseCard course={relatedCourse} />
                        </div>
                    ))
                }
            </div>
        </div>

    </div>
  )
}

export default Explore