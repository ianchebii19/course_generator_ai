"use client";
import React, { useEffect, useState, useContext } from "react";
import { MdKeyboardOptionKey } from "react-icons/md";
import { FaAudioDescription } from "react-icons/fa6";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import SelectCategory from "@/components/create-course/SelectCategory";
import Description from "@/components/create-course/Description";
import SelectOption from "@/components/create-course/SelectOption";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { CourseList } from "@/configs/schema";
import { db } from "@/configs";
import { GenerateCourseLayout_AI } from "@/configs/AiModel";
import { v4 as uuidv4 } from "uuid"; // Fixed typo in import
import { UserInputContext } from "@/components/context/UserIputContext";

interface CourseLayout {
  courseId: string;
  name: string;
  level: string;
  category: string;
  courseOutput: string;
  createdBy: string;
  userName: string;
  userProfileImage: string;
}

const CreateCourse = () => {
  const StepperOptions = [
    { id: 1, name: "Category", icon: <BiSolidCategoryAlt /> },
    { id: 2, name: "Description", icon: <FaAudioDescription /> },
    { id: 3, name: "Option", icon: <MdKeyboardOptionKey /> },
  ];

  const { user } = useUser();
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const context = useContext(UserInputContext);

  if (!context) {
    throw new Error("CreateCourse must be used within a UserInputContext.Provider");
  }

  const { userCourseInput } = context;

  useEffect(() => {
    console.log(userCourseInput);
  }, [userCourseInput]);

  const generateCourseLayout = async () => {
    try {
      const BASIC_PROMPT = `Generate a course tutorial with the following details including fields such as Course Name, Description, Chapter Name, About, Duration.`;
      const USER_INPUT_PROMPT = `
        Category: ${userCourseInput?.category || "N/A"}, 
        Topic: ${userCourseInput?.topic || "N/A"}, 
        Level: ${userCourseInput?.level || "N/A"}, 
        Duration: ${userCourseInput?.duration || "N/A"}, 
        No. of Chapters: ${userCourseInput?.noOfChapter || "N/A"}
      `;
      const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;

      console.log("Prompt sent to AI:", FINAL_PROMPT);

      const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
      const textResponse = result.response?.text();
      const parsedResult = JSON.parse(textResponse || "{}");

      console.log("AI-generated course layout:", parsedResult);
      await saveCourseLayoutInDB(parsedResult);
    } catch (error) {
      console.error("Error generating course layout:", error);
    }
  };

  const saveCourseLayoutInDB = async (courseLayout: CourseLayout) => {
    try {
      if (!user?.primaryEmailAddress?.emailAddress) {
        throw new Error("User email address is missing. Cannot save course.");
      }

      const id = uuidv4(); // Generate a unique course ID

      // Insert the course layout into the database
      await db.insert(CourseList).values({
        courseId: id,
        name: userCourseInput?.topic ?? "",
        level: userCourseInput?.level ?? "",
        category: userCourseInput?.category ?? "",
        courseOutput: JSON.stringify(courseLayout),
        createdBy: user.primaryEmailAddress.emailAddress,
        userName: user?.fullName ?? "",
        userProfileImage: user?.imageUrl ?? "",
      });

      console.log("Course layout saved successfully");
      router.replace(`/create-course/course/${id}`);
    } catch (error) {
      console.error("Error saving course layout:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-10">
        <h1 className="text-2xl text-blue-600 font-medium">Create Course</h1>
        <div className="flex gap-4">
          {StepperOptions.map((item, index) => (
            <div key={item.id} className="flex items-center">
              <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                <div
                  className={`bg-gray-200 p-3 text-blue-500 rounded-full ${
                    activeIndex === index ? "bg-blue-500 text-gray-50" : ""
                  }`}
                >
                  {item.icon}
                </div>
                <div className="text-sm">{item.name}</div>
              </div>
              {index !== StepperOptions.length - 1 && (
                <div className="h-1 w-[50px] md:w-[100px] lg:w-[170px] bg-gray-300 rounded-sm"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-10 lg:px-44 mt-10">
        {activeIndex === 0 && <SelectCategory />}
        {activeIndex === 1 && <Description />}
        {activeIndex === 2 && <SelectOption />}

        <div className="flex justify-between mt-10">
          <Button
            className="bg-blue-600 hover:bg-blue-400"
            disabled={activeIndex === 0}
            onClick={() => setActiveIndex(activeIndex - 1)}
          >
            Previous
          </Button>
          {activeIndex < 2 ? (
            <Button
              className="bg-blue-600 hover:bg-blue-400"
              onClick={() => setActiveIndex(activeIndex + 1)}
            >
              Next
            </Button>
          ) : (
            <Button className="bg-blue-600 hover:bg-blue-400" onClick={generateCourseLayout}>
              Generate Course
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;