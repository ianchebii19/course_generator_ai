import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaEdit } from "react-icons/fa";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm'; // Ensure this is imported
import { db } from '@/configs';

interface Chapter {
  name?: string;
  description?: string;
}

interface Course {
  id?: string; // Assuming there is an id field
  courseOutput: {
    course: {
      chapters: Chapter[];
    };
  };
}

interface EditChapterProps {
  course: Course;
  index: number; // Corrected type from 'index' to 'number'
}

const EditChapter: React.FC<EditChapterProps> = ({ course, index }) => {
  const chapters = course?.courseOutput?.course.chapters;

  const [name, setName] = useState<string | undefined>(chapters?.[index]?.name);
  const [about, setAbout] = useState<string | undefined>(chapters?.[index]?.description);

  // Correct usage of useEffect
  useEffect(() => {
    if (chapters && chapters[index]) {
      setName(chapters[index].name);
      setAbout(chapters[index].description);
    }
  }, [course, index]); // Dependency array to update when course or index changes

  const onUpdateHandler = async () => {
    if (chapters && chapters[index]) {
      // Update chapter details
      chapters[index].name = name;
      chapters[index].description = about;

      // Update the course object with new values
      const updatedCourse = {
        ...course.courseOutput,
        course: {
          ...course.courseOutput.course,
          chapters,
        },
      };

      try {
        const result = await db.update(CourseList)
          .set({ courseOutput: updatedCourse })
          .where(eq(CourseList.id, course.id)) // Assuming course.id exists
          .returning({ id: CourseList.id });

        console.log(result);
      } catch (error) {
        console.error('Error updating course:', error);
      }
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <FaEdit className="text-xl text-primary" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Course Chapter and Description</DialogTitle>
            <DialogDescription>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Chapter Title</label>
                <Input
                  value={name} // Use value for controlled component
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Chapter Description</label>
                <Textarea
                  value={about} // Use value for controlled component
                  onChange={(event) => setAbout(event.target.value)}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={onUpdateHandler}>Update</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditChapter;
