import EditChapter from './EditChapter';
import { Course } from '@/types'; // ✅ Import unified Course type

interface ChapterListProps {
  courseOutput: Course['courseOutput'];
  course: Course | null;
  edit?: boolean;
}

const ChapterList: React.FC<ChapterListProps> = ({ course, edit = true }) => {
  return (
    <div className="mt-3 border rounded-lg shadow-sm p-4">
      <div className="font-bold text-center text-2xl  text-blue-700 py-2">Chapters</div>
      <div className="space-y-4">
        {course?.courseOutput?.Chapters?.map((chapter, index) => (
          <div key={index} className="flex gap-4 items-start p-4 border rounded-lg shadow-sm">
            {/* Chapter Number */}
            <div className="bg-blue-400 text-white text-xl rounded-full h-8 w-8 flex items-center justify-center">
              {index + 1}
            </div>

            {/* Chapter Details */}
            <div className="flex-1">
              <h2 className="font-semibold text-md  text-blue-500 ">
                {chapter['Chapter Name'] || 'Chapter Name Not Available'}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {chapter.About || 'Description Not Available'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Duration: {chapter.Duration || 'Duration Not Available'}
              </p>
            </div>

            {/* Edit Chapter Button (Conditional) */}
            {edit && <EditChapter course={course} index={index} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterList;