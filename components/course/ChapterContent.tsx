import React from 'react';
import YouTube from 'react-youtube';

interface Chapter {
  ChapterName: string;
  description: string;
  videoId: string;
  ['Chapter Name']?: string;
}

interface ContentItem {
  title: string;
  description?: string; // Add this if you intend to use description
}

interface ChapterContentProps {
  chapter: Chapter;
  content: { content: Array<ContentItem> }; 
}

const ChapterContent = ({ chapter, content }: ChapterContentProps) => {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

 

  return (
    <div>
      <div className='p-10'>
        <h2 className='text-xl font-semibold text-blue-500 m-6 flex justify-center'>
          {chapter?.ChapterName || 'Click to choose chapter'}
        </h2>
        {/*<p>{chapter['Chapter Name'] || 'Chapter Description Not Available'}</p>*/}

        <div className='flex justify-center'>
          <YouTube
            videoId={chapter?.videoId || ''} // Use the videoId from the chapter prop
            opts={opts} // Handle the onReady event
          />
        </div>
      </div>

      <div>
        {content?.content?.map((item, index) => (
          <div key={index}>
            <h2 className='font-medium text-xl text-blue-300'>
              {item.title}
            </h2>
            {item.description && <p>{item.description}</p>}
            <pre>
              <code>
                {/* Add code content here if needed */}
              </code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterContent;