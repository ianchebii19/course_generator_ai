export interface Chapter {
  chapterId: number
  About: string;
  id: number;
  chapterName: string;
  content: [];

  // Add other properties as needed
}

export interface CourseOutput {
  Chapters: Chapter[];

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
  courseBanner:string;
  name: string;
  category: string;
  level: string;
  createdBy: string;
  description: unknown; // Fixed naming convention (camelCase)
  userName: string;
  includeVideo: string;
  courseOutput?: CourseOutput;
  userProfileImage: string;
}
