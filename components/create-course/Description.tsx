import React, { useContext } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { UserInputContext } from "../context/UserIputContext";

const Description = () => {
  const context = useContext(UserInputContext);

  // Ensure context exists before accessing its properties
  if (!context) {
    throw new Error("Description must be used within a UserInputContext.Provider");
  }

  const {userCourseInput, setUserCourseInput } = context;

  const handleInputChange = (fieldName: string, value: string) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className='mx-20  lg:mx-32'>
    <div  className='mt-6'>
        <label htmlFor=""> Write topic you want to generte (i.e python, sports, politics)</label>
        <Input placeholder={'topic'}
          defaultValue={userCourseInput?.topic || ""}
            
        onChange={(e)=>handleInputChange('topic', e.target.value)}
        />
    </div>
    <div className='mt-6'>
        <label htmlFor="">Tell us more about your topic</label>
        <Textarea placeholder='Description of your topic'
         defaultValue={userCourseInput?.description || ""}
         onChange={(e)=>handleInputChange('description', e.target.value)}
        />
    </div>
    </div>
  );
};

export default Description;
