'use client'
import { UserInputContext } from "@/components/context/UserIputContext";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userCourseInput, setuserCourseInput] = useState([]); // Define a suitable value for the context

  return (
    <div>
      <UserInputContext.Provider value={{userCourseInput, setuserCourseInput}}>
        <div className="flex">
          <div className="z-0">
            <Sidebar />
          </div>
          <div className="w-full">
            <Header />
            {children}
          </div>
        </div>
      </UserInputContext.Provider>
    </div>
  );
}
