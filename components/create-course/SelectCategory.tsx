import React, { useContext, useState } from 'react'
import CategoryList from '../shared/CategoryList'
import { UserInputContext } from '../context/UserIputContext';

function SelectCategory() {
      const {userCourseInput, setuserCourseInput} = useContext(UserInputContext); // Define a suitable value for the context
    
  return (
<div className='grid grid-cols-3 sm:gap-3 md:gap-10 px-10 hover:te'>
    { CategoryList.map((item, index)=>(
        <div  className='flex flex-col p-5 border rounded-md  hover:bg-blue-100 cursor-pointer'>
            <div className='text-3xl text-blue-600'> 
                {item.icon}
            </div>
            <h1>
                {item.name}
            </h1>
        </div>
    ))}
</div>
  )
}

export default SelectCategory