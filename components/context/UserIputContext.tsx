// context/UserInputContext.tsx
import { createContext, Dispatch, SetStateAction, } from "react";

// Define userCourseInput as an object
interface UserCourseInput {
  category: string;
}

// Define the context type
interface UserInputContextType {
  userCourseInput: UserCourseInput;
  setUserCourseInput: Dispatch<SetStateAction<UserCourseInput>>;
}

// Create the context with undefined as default
export const UserInputContext = createContext<UserInputContextType | undefined>(undefined);


