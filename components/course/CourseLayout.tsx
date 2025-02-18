import React from 'react';
import YouTube from 'react-youtube';

interface Section {
  title: string;
  description: string;
  codeExample: string;
}

interface Chapter {
  ChapterName: string;
  Description: string;
  videoId: string;
  content?: {
    Chapter: string;
    Topic: string;
    Sections: Section[];
  };
}

interface ChapterContentProps {
  chapter: Chapter | null;
}

const ChapterContent = ({ chapter }: ChapterContentProps) => {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  const onReady = (event: { target: any }) => {
    // Access the player instance
    event.target.pauseVideo(); // Example: Pause the video when it's ready
  };

  if (!chapter) {
    return (
      <div className="p-10">
        <h2 className="text-xl font-semibold text-blue-500 m-6 flex justify-center">
          Click to choose a chapter
        </h2>
      </div>
    );
  }

  return (
    <div>
      <div className="p-10">
        <h2 className="text-xl font-semibold text-blue-500 m-6 flex justify-center">
          {chapter?.ChapterName || 'Chapter Name Not Available'}
        </h2>

        <div className="flex justify-center mx-6">
          <YouTube
            videoId={chapter?.videoId || ''} // Use the videoId from the chapter prop
            opts={opts}
            onReady={onReady} // Handle the onReady event
          />
        </div>

        {/* Render Chapter Sections */}
        {chapter?.content?.Sections?.map((section, index) => (
          <div key={index} className="mt-6">
            <h3 className="font-medium text-xl text-blue-300">
              {section.title}
            </h3>
            {section.description && <p>{section.description}</p>}
            {section.codeExample && (
              <pre className="bg-black text-white  p-4 rounded-md">
                <code className='bg-black text-white' dangerouslySetInnerHTML={{ __html: section.codeExample }} />
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterContent;