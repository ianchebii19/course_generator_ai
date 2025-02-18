export interface Chapters {
  chapterId: number
  About: string;
  id: number;
  chapterName: string;
  content: [];

  // Add other properties as needed
}

export interface CourseOutput {
  Chapters?: Chapters[];
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
  courseOutput: CourseOutput[];
  userProfileImage: string;
  courseBanner: string | null;
  published: boolean | null;
  description?: string;
}
