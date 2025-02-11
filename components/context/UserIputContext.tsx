// context/UserInputContext.tsx
import { createContext, Dispatch, SetStateAction, } from "react";

// Define userCourseInput as an object
interface UserCourseInput {
  level: string;
  duration: string;
  displayVideo: string;
  noOfChapter: string;
  description: string;
  topic: string;
  category: string;
}

// Define the context type
interface UserInputContextType {
  userCourseInput: UserCourseInput;
  setUserCourseInput: Dispatch<SetStateAction<UserCourseInput>>;
}

// Create the context with undefined as default
export const UserInputContext = createContext<UserInputContextType | undefined>(undefined);


