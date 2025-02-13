import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { FaBookOpen } from "react-icons/fa";
import { ref } from 'firebase/storage';
import { storage } from '@/configs/FirebaseConfig'; // Ensure correct import for storage
import EditCourse from './EditCourse';
import Link from 'next/link';

interface Course {
  courseOutput?: {
    course?: {
      name?: string;
      description?: string;
      category?: string;
    };
  };
}

interface CourseInfoProps {
  course: Course | null;
}

const CourseInfo: React.FC<CourseInfoProps> = ({ course, refreshData, edit={true} }) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const onFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));

      const fileName = `${Date.now()}.jpg`;
      const storageRef = ref(storage, `uploads/${fileName}`);
      console.log("File selected:", fileName, storageRef);
    }
  };

  return (
    <div className="p-10 border rounded-xl shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Section */}
        <div>
          <h2 className="font-bold text-lg flex gap-3 items-center">
            {course?.courseOutput?.course?.name || 'Course Name Not Available'}
            {edit&& <EditCourse course={course} />}
          </h2>
          <p>{course?.courseOutput?.course?.description || 'Description Not Available'}</p>
        {!edit&&<Link href={'/course/'+course?CourseId+"/start"}>
          <Button className="w-full my-4">Start</Button>
          
          </Link>}
          <h3>{course?.courseOutput?.course?.category || 'Category Not Available'}</h3>
        </div>

        {/* Right Section */}
        <div>
          <label htmlFor="upload-image" className="flex flex-col items-center cursor-pointer">
            <div className="w-full h-[250px] flex items-center justify-center rounded-md bg-slate-300">
              {selectedFile ? (
                <img
                  src={selectedFile?selectedFile:'/placeholder.png'}
                  alt="Selected"
                  className="w-full h-[250px] object-cover rounded-xl"
                />
              ) : (
                <FaBookOpen size={70} className="text-purple-600" />
              )}
            </div>
            <span className="mt-2 text-sm text-gray-500">Upload Image</span>
          </label>
          <input
            type="file"
            id="upload-image"
            className="hidden"
            accept="image/*"
            onChange={onFileSelected}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
