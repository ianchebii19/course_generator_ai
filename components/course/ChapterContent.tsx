import React from 'react';
import YouTube from 'react-youtube';

interface Chapter {
  ChapterName: string;
  description: string;
  videoId: string;
  ['Chapter Name']?: string;
}

interface ChapterContentProps {
  chapter: Chapter;
  content: { content: Array<{ title: string; }> }; 
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

  const onReady = (event: { target: any }) => {
    // Access the player instance
    event.target.pauseVideo(); // Example: Pause the video when it's ready
  };

  return (
    <div>
      <div className='p-10'>
        <h2 className='text-xl font-semibold text-blue-500 m-6'>{chapter?.ChapterName || 'Chapter Name Not Available'}</h2>
        {/*<p>{chapter['Chapter Name'] || 'Chapter Description Not Available'}</p>*/}

        <div className='flex justify-center'>
          <YouTube
            videoId={chapter?.videoId || ''} // Use the videoId from the chapter prop
            opts={opts}
            onReady={onReady} // Handle the onReady event
          />
        </div>
      </div>

      <div>
        {content?.content?.map((item , index)=>{
            <div>
                <h2 className='font-medium text-xl text-blue-300'>
                    {item.title}
                </h2>
                <p>{item.descriptio}</p>


                <pre>
                    <code>
                        
                    </code>
                </pre>
            </div>
        })}
      </div>
    </div>
  );
};

export default ChapterContent;