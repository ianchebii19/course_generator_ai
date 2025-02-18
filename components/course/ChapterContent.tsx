import React from 'react';
import YouTube from 'react-youtube';

interface Section {
  title: string;
  description: string;
  codeExample?: string;
}

interface Chapter {
  ChapterName: string;
  Description?: string;
  videoId?: string;
  content?: {
    Sections?: Section[];
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

  if (!chapter) {
    return <p className="text-center text-gray-500">Click to choose a chapter</p>;
  }

  return (
    <div>
      <div className='p-10'>
        <h2 className='text-xl font-semibold text-blue-500 m-6 flex justify-center'>
          {chapter.ChapterName || 'Chapter Title Not Available'}
        </h2>
        
        {chapter.videoId && (
          <div className='flex justify-center'>
            <YouTube videoId={chapter.videoId} opts={opts} />
          </div>
        )}

        <div className='mt-6'>
          {chapter.content?.Sections && chapter.content.Sections.length > 0 ? (
            chapter.content.Sections.map((section, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
                <p className="text-gray-600">{section.description}</p>
                {section.codeExample && (
                  <pre className="bg-gray-100 p-2 rounded-md">
                    <code dangerouslySetInnerHTML={{ __html: section.codeExample }} />
                  </pre>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No sections available for this chapter.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterContent;
