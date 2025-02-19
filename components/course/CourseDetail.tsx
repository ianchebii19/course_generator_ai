
// @ts-nocheck
import { Course } from "@/types";

interface CourseInfoProps {
  course: Course | null;

}
const CourseDetail: React.FC<CourseInfoProps> = ({ course }) => {
  
  return (
    <div className='border p-6 rounded-md shadow-sm mt-3'>
      <div className='grid grid-cols-2 md:grid-cols-4'>
        <h3 className="mt-2 text-xs text-blue-400 hover:text-blue-600">Level: {course?.level || 'Level Not Available'}</h3>
        <h3 className="mt-2 text-xs text-blue-400 hover:text-blue-600">User: {course?.userName || 'Creator Not Available'}</h3>
        <h3 className="mt-2 text-xs text-blue-400 hover:text-blue-600">Duration: {course?.courseOutput?.['Total Duration'] || 'Duration Not Available'}</h3>
        <h3 className="mt-2 text-xs text-blue-400 hover:text-blue-600">Video: {course?.includeVideo ? 'Yes' : 'No'}</h3>

      </div>
    </div>
  );
};

export default CourseDetail;