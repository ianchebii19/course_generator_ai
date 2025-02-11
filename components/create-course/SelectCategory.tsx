import React, { useContext } from 'react';
import CategoryList from '../shared/CategoryList';
import { UserInputContext } from '../context/UserIputContext';

function SelectCategory() {
  const context = useContext(UserInputContext);

  // Handle undefined context
  if (!context) {
    throw new Error("SelectCategory must be used within a UserInputProvider");
  }

  const { userCourseInput, setUserCourseInput } = context;

  const handleCategoryChange = (category: string) => {
    setUserCourseInput((prev) => ({
      ...prev,
      category,
    }));
  };

  return (
    <div className='grid grid-cols-3 sm:gap-3 md:gap-10 px-10'>
      {CategoryList.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col p-5 border rounded-md hover:bg-blue-100 cursor-pointer
            ${userCourseInput.category === item.name ? 'bg-blue-200' : ''}`}
          onClick={() => handleCategoryChange(item.name)}
        >
          <div className='text-3xl text-blue-600'>
            {item.icon}
          </div>
          <h1>{item.name}</h1>
        </div>
      ))}
    </div>
  );
}

export default SelectCategory;
