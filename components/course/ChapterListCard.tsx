import React from 'react';

// Define the structure of the chapter prop
interface Chapter {
  'Chapter Name': string;
  Duration?: string;
}

// Define the props for the ChapterListCard component
interface ChapterListCardProps {
  chapter: Chapter;
  index: number;
}

const ChapterListCard: React.FC<ChapterListCardProps> = ({ chapter, index }) => {
  return (
    <div className="grid grid-cols-5 p-3 border border-b border-gray-200">
      {/* Chapter Number */}
      <div>
        <h2 className="w-8 h-8 bg-blue-400 text-white rounded-full flex items-center justify-center">
          {index + 1}
        </h2>
      </div>
      {/* Chapter Details */}
      <div className="col-span-4">
        <h2 className=" text-gray-500 font-semibold">
          {chapter['Chapter Name'] || 'Chapter Name Not Available'}
        </h2>
        <h2 className='text-sm text-gray-500'>
          {chapter.Duration || 'Duration Not Available'}
        </h2>
      </div>
    </div>
  );
};

export default ChapterListCard;
