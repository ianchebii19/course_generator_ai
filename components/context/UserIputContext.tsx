import { createContext, Dispatch, SetStateAction } from "react";

// Define the context type
interface UserInputContextType {
  userInput: string;
  setUserInput: Dispatch<SetStateAction<string>>;
}

// Create the context with a default undefined value
export const UserInputContext = createContext<UserInputContextType | undefined>(undefined);
