import React, { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { UserInputContext } from "../context/UserIputContext";
const SelectOption = () => {
  const context = useContext(UserInputContext);

  // Ensure context exists before accessing its properties
  if (!context) {
    throw new Error("SelectOption must be used within a UserInputContext.Provider");
  }

  const { userCourseInput, setUserCourseInput } = context;

  const handleInputChange = (fieldName: string, value: string | number) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className="mx-10 lg:mx-20">
      <div className="mt-10 grid grid-cols-2 gap-2 md:gap-6">
        {/* Difficulty Level */}
        <div>
          <label htmlFor="level" className="text-sm">
            Difficulty Level
          </label>
          <Select
            defaultValue={userCourseInput?.level || ""}
            onValueChange={(value) => handleInputChange("level", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Beginner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Duration */}
        <div>
          <label htmlFor="duration" className="text-sm">
            Duration
          </label>
          <Select
            defaultValue={userCourseInput?.duration || ""}
            onValueChange={(value) => handleInputChange("duration", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="1 hour" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 Hour">1 Hour</SelectItem>
              <SelectItem value="2 Hours">2 Hours</SelectItem>
              <SelectItem value="More than 3 Hours">More than 3 Hours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Include Video */}
        <div>
          <label htmlFor="displayVideo" className="text-sm">
            Include Video
          </label>
          <Select
            defaultValue={userCourseInput?.displayVideo || ""}
            onValueChange={(value) => handleInputChange("displayVideo", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Yes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Number of Chapters */}
        <div>
          <label htmlFor="noOfChapter" className="text-sm">
            No of Chapters
          </label>
          <Input
            type="number"
            placeholder="1"
            defaultValue={userCourseInput?.noOfChapter || ""}
            onChange={(e) => handleInputChange("noOfChapter", parseInt(e.target.value, 10) || 0)}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectOption;
