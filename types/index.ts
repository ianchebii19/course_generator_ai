export interface Chapter {
  chapterId: number
  id: number;
  content: [] | unknown;
  videoId: string;
  courseId: string;

  // Add other properties as needed
}

export interface CourseOutput {
  Chapters?: Chapter[] | unknown;
  ['Course Name']?: string;
  course?: {
    id?: number;
    chapterName?: string;
    category?: string;
    duration?: string; 
    publish: boolean; // Changed from array to string for consistency
  };
}

export interface Course {
  id: number;
  courseId: string;
  name: string;
  category: string;
  level: string;
  createdBy: string;
  userName: string;
  includeVideo: string;
  courseOutput: unknown;
  userProfileImage: string;
  courseBanner: string | null;
  published: boolean | null;
}
