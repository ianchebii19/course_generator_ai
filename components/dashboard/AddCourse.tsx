import Link from 'next/link';

export default function AddCourse() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Create a New Course</h2>
      <p className="text-gray-600 mb-6">
        Start building your personalized course by adding topics, videos, and more.
      </p>
      <Link href="/create-course">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition duration-300">
          Create Course
        </button>
      </Link>
    </div>
  );
}