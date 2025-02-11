"use client"
import React, { useState } from 'react';
  import { MdKeyboardOptionKey } from 'react-icons/md';
  import { FaAudioDescription } from 'react-icons/fa6';
  import { BiSolidCategoryAlt } from 'react-icons/bi';
  import { Button } from '@/components/ui/button';
import CategoryList from '@/components/shared/CategoryList';
import Category from '@/components/create-course/Category';
import SelectCategory from '@/components/create-course/SelectCategory';
import Description from '@/components/create-course/Description';
import SelectOption from '@/components/create-course/SelectOption';
  
  const CreateCourse = () => {
    const StepperOptions = [
      {
        id: 1,
        name: 'Category',
        icon: <BiSolidCategoryAlt />,
      },
      {
        id: 2,
        name: 'Description',
        icon: <FaAudioDescription />,
      },
      {
        id: 3,
        name: 'Option',
        icon: <MdKeyboardOptionKey />,
      },
    ];
  const [activeIndex, setActiveIndex]=useState(0)
    return (
      <div>
        <div className="flex flex-col justify-center items-center mt-10">
          <h1 className="text-2xl text-blue-600 font-medium">Create Course</h1>
          <div className="flex gap-4">
          {StepperOptions.map((item, index) => (
  <div key={item.id} className="flex items-center">
    <div className="flex flex-col items-center w-[50px] md:w-[100px]">
      <div className={`bg-gray-200 p-3 text-blue-500 rounded-full ${activeIndex==index &&'bg-blue-500 text-gray-50'}`}>
        {item.icon}
      </div>
      <div className="text-sm">{item.name}</div>
    </div>
    {index !== StepperOptions.length - 1 && (
      <div className='h-1 w-[50px] md:w-[100px] lg:w-[170px] bg-gray-300 rounded-sm'></div>
    )}
  </div>
))}
          </div>
        </div>
  
        <div className='px-10  lg:px-44 mt-10'>
          {/* Step 1: Category */}
          {activeIndex ==0? <SelectCategory/>: null
          }
          {/* Step 1: Category */}
          {activeIndex ==2? <SelectOption/>: null
          }
           {activeIndex ==1? <Description/>: null
          }
        
        <div className='flex justify-between mt-10'>
          <Button  className='bg-blue-600 hover:bg-blue-400' disabled={activeIndex==0} onClick={()=>setActiveIndex(activeIndex -1)}>Previous</Button>
          {activeIndex<2 &&<Button  className='bg-blue-600 hover:bg-blue-400' onClick={()=>setActiveIndex(activeIndex +1)}>Next</Button>}
          {activeIndex==2 &&<Button  className='bg-blue-600 hover:bg-blue-400'>Generate Course</Button>}
        </div>
      </div>
      </div>
    );
  };
  
  export default CreateCourse;
  