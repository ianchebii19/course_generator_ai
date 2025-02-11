'use client'

import { UserInputContext } from "@/components/context/UserIputContext";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { useState } from "react";

export default function CreateCourseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Initialize with an object, not an array
  const [userCourseInput, setUserCourseInput] = useState({ category: "" });

  return (
    <div>
      <div className="flex">
        <div className="z-0">
          <Sidebar />
        </div>

        {/* Provide an object with both state and setter function */}
        <UserInputContext.Provider value={{ userCourseInput, setUserCourseInput }}>
          <div className="w-full">
            <Header />
            {children}
          </div>
        </UserInputContext.Provider>
      </div>
    </div>
  );
}
