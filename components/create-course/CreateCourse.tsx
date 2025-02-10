'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateCourse() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    subject: '',
    topicDescription: '',
    level: 'beginner',
    duration: 0,
    includeVideo: false,
    numberOfChapters: 0,
    image: null,
  });

  const handleInputChange = (e: { target: { name: any; value: any; type: any; checked: any; }; }) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageUpload = async (e: { target: { files: any[]; }; }) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default')// with your Cloudinary upload preset
  
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
  
      // Update the formData state with the image URL
      setFormData((prevState) => ({
        ...prevState,
        image: data.secure_url,
      }));
    } catch (error) {
      console.error('Cloudinary API Error:', error);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Generate course using Deepseek API
    const deepseekResponse = await fetch('/api/generate-course', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: formData.subject,
        topicDescription: formData.topicDescription,
        level: formData.level,
      }),
    });
    const courseOutput = await deepseekResponse.json();

    // Save course to database
    const dbResponse = await fetch('/api/save-course', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        createdBy: 'user_id', // Replace with actual user ID from Clerk
        courseOutput: courseOutput.generatedText,
      }),
    });
    const { courseId } = await dbResponse.json();

    // Redirect to CourseLayout page
    router.push(`/dashboard/create-course/course/${courseId}`);
  };

  return (
    <div className="flex">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-blue-900 mb-8">Create Course</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter subject"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="topicDescription">
              Topic Description
            </label>
            <textarea
              id="topicDescription"
              name="topicDescription"
              value={formData.topicDescription}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows={4}
              placeholder="Enter topic description"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="level">
              Level
            </label>
            <select
              id="level"
              name="level"
              value={formData.level}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">
              Duration (in hours)
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter duration"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="includeVideo">
              Include Video
            </label>
            <input
              type="checkbox"
              id="includeVideo"
              name="includeVideo"
              checked={formData.includeVideo}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span>Yes</span>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numberOfChapters">
              Number of Chapters
            </label>
            <input
              type="number"
              id="numberOfChapters"
              name="numberOfChapters"
              value={formData.numberOfChapters}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter number of chapters"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              Course Display Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageUpload}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition duration-300"
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
}
