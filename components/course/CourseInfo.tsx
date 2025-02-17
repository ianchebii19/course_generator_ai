
import { Button } from '@/components/ui/button';
import { FaBookOpen } from 'react-icons/fa';
import EditCourse from './EditCourse';
import Link from 'next/link';
import Image from 'next/image';
import { Course } from '@/types';
import { useState } from 'react';
import { db } from '@/configs';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';

interface CourseInfoProps {
  course: Course | null;
  edit?: boolean;
}

const CourseInfo: React.FC<CourseInfoProps> = ({ course, edit = true }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
      }
    };
  
    const handleImageUpload = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!selectedFile) {
        alert('No file selected. Please choose an image.');
        return;
      }
  
      if (!course?.id) {
        alert('Course ID is missing. Please select a course.');
        return;
      }
  
      setUploading(true);
      setIsLoading(true);
  
      try {
        const imageData = new FormData();
        imageData.append('file', selectedFile);
        imageData.append('cloud_name', 'dhhxjnlc6');
        imageData.append('upload_preset', 'tanotano');
  
        const response = await fetch('https://api.cloudinary.com/v1_1/dhhxjnlc6/image/upload', {
          method: 'POST',
          body: imageData,
        });
  
        if (!response.ok) {
          throw new Error('Failed to upload image to Cloudinary.');
        }
  
        const data = await response.json();
        const imageURL = data.secure_url;
  
        // Update the course banner in the database
        await db
          .update(CourseList)
          .set({ courseBanner: imageURL })
          .where(eq(CourseList.id, course.id));
  
        alert('Image uploaded successfully!');
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image. Please try again.');
      } finally {
        setUploading(false);
        setIsLoading(false);
      }
    ;
  
    return (
      <div className="flex flex-col items-center">
        
      </div>
    );
  };
  return (
    <div className="p-10 border rounded-xl shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Section: Course Details */}
        <div>
          <h2 className="font-bold text-md flex gap-3 items-center text-blue-600">
            {course?.courseOutput?.['Course Name'] || 'Course Name Not Available'}
            {edit && course && <EditCourse course={course} />}
          </h2>
          <p className='text-gray-500'>{course?.courseOutput?.Description || 'Description Not Available'}</p>
       
          <h3 className="mt-2 text-sm text-blue-400">Category: {course?.category || 'Category Not Available'}</h3>
          {edit && (
            <Link href={`/course/${course?.courseId}/start`}>
              <Button className="w-full my-4 bg-blue-500 hover:bg-blue-400">Start</Button>
            </Link>
          )}
        </div>

        {/* Right Section: Image Upload */}
        <div>
        <form onSubmit={handleImageUpload}>
        <label htmlFor="upload-image" className="cursor-pointer flex flex-col items-center">
          <div className="w-full h-[250px] flex items-center justify-center rounded-md bg-slate-300">
            {previewUrl ? (
              <Image 
              src={course?.courseBanner ||previewUrl} alt="Selected"
              width={250}
            height={250}
            className="w-full h-[250px] object-cover rounded-xl"
            unoptimized 
              />
            ) : (
              <FaBookOpen size={70} className="text-blue-600" />
            )}
          </div>
          <span className="mt-2 text-sm text-gray-500">{uploading ? 'Uploading...' : 'Choose Image'}</span>
        </label>
        <input
          type="file"
          id="upload-image"
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
        />
        <Button type="submit" disabled={uploading || isLoading} className="bg-blue-500 hover:bg-blue-400">
          {uploading ? 'Uploading...' : 'Upload'}
        </Button>
      </form>
        </div>
      </div>

      {/* Course Chapters Section
      <div className="mt-8">
        <h3 className="font-bold text-lg mb-4">Course Chapters</h3>
        <div className="space-y-4">
          {course?.courseOutput?.Chapters?.map((chapter, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-sm">
              <h4 className="font-semibold">{chapter['Chapter Name']}</h4>
              <p className="text-sm text-gray-600">{chapter.About}</p>
              <p className="text-sm text-gray-500 mt-2">Duration: {chapter.Duration}</p>
            </div>
          ))}
        </div>
      </div>
       */}
    </div>
  );
};

export default CourseInfo;