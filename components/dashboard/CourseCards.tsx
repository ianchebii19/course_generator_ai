import React from 'react'
import { IoMdMore } from "react-icons/io";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import Dropdown from './Dropdown';
import { CourseList } from '@/configs/schema';
import Link from 'next/link';

  
function CourseCards(course , refreshData) {
    const handleOnDelete=async ()=>{
        const resp= await db.delete(CourseList, )
        .where(
            eq(CourseList.id, course?.id)

        )
        .returning({id:CourseList?.id})
        if (resp){
            refreshData();
        }
    }
  return (
    <div className=' '>
        <Link href={'/course'+course?.courseId>} >
      <Image
      src={course?.courseOutput?.course?.image}
      alt="Course 1"
      width={300}
      height={200}
      className='rounded-md h-[200px] object-cover w-full'
      />  
      </Link>
      <div className='flex justify-between items-center'>
        <h2 >{course?.courseOutput?.course?.name}</h2>
        <div>
        

        <Dropdown
        handleOnDelete={() => handleDelete()}
        ><IoMdMore/></Dropdown>
        </div>
        </div>
        <div>
            <h2>
                {course?.courseOutput?.course?.noOfChapter?.length} Chapters
            </h2>
        </div>
        <div>
            <h2>
                {course?.courseOutput?.level}
            </h2>
  
      </div>
      di

    </div>
  )
}

export default CourseCards