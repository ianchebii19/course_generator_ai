"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs";
import { CourseList } from "@/configs/schema"; // Import correct SQL helper functions

interface Course {
  courseId: string;
  name: string;
  createdBy: string;
  courseOutput: {
    name: string;
    chapter: { id: string; name: string; duration: string }[];
  };
}
const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
    //11137096

interface Params {
  CourseId: string;
}

function CourseStart({ params }: { params: Params }) {
  const { user } = useUser();
  const [course, setCourse] = useState<Course | null>(null);
  const [selectChapter, setSelectChapter] = useState<Course["courseOutput"]["chapter"][0] | null>(null);
  const [chapterContent , setChapterContent] = useState<Course["courseOutput"]["
  const GetSelectedChapterContent=()=>{
    const result=await db.select().from(Chapters)
    .where(and(
        eq(Chapter.chapterId, chapterId)
        eq(Chapter.courseId, course?.courseId)
    ))
    setChapterContent(result[0] || null)
  }
  
  // Fetch course data when params or user changes
  useEffect(() => {
    const GetCourse = async () => {
      if (!params?.CourseId || !user?.primaryEmailAddress?.emailAddress) {
        console.log("Missing CourseId or user email address");
        return;
      }

      try {
        const result = await db
          .select()
          .from(CourseList)
          .where(
            and(
              eq(CourseList.courseId, params.CourseId),
              eq(CourseList.createdBy, user.primaryEmailAddress.emailAddress)
            )
          );

        setCourse(result[0] || null);
        GetSelectedChapterContent(0)
        console.log("Fetched Course:", result[0]);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    if (params?.CourseId && user) {
      GetCourse();
    }
  }, [params, user]);

  return (
    <><div>
          <div className="inset-y-0 left-0 w-48 bg-white shadow-lg hidden sm:block h-full">
              <h2>{course?.courseOutput?.name}</h2>

              <div>
                  {course?.courseOutput?.chapter?.map((chapter, index) => (
                      <div
                          key={chapter.id}
                          className={`flex gap-2 items-center cursor-pointer ${selectChapter === chapter ? "bg-blue-500 text-white" : ""}`}
                          onClick={() => setSelectChapter(chapter)}
                          GetSelectChapterContent />)(index)
                      >
                      <h3>{chapter.name}</h3>
                      ,
                      <p>{chapter.duration}</p>)}
              </div>
              ))}
          </div>
      </div><div className="w-full">
              <div>
                  <h2>{selectChapter?.name}</h2>
                  <p>{selectChapter?.description}</p>

                  <div>
                      <YouTube
                          videoId={selectChapter?.videoId}
                          opts={opts} />

                  </div>
                  <div>
                    {Content?.content?.map((item)=>{
                        <h2>{item.title}</h2>
                        <p className="whitespace-pre-wrap">
                            <ReactMarkdown>
                            {item.description}
                            </ReactMarkdown>
                            </p>
                        {item.codeExample&& <div className="rounded-md mt-4 p-4 bg-black text-white">
                            <pre>
                                <code>{item.codeExample}</code>
                            </pre>
                        </div>}
                          
                    })}
                  </div>
                  <button>Start Course</button>
              </div>

          </div></>
    </div>
  );
}

export default CourseStart;
