import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogClose,
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
import { Button } from '@/components/ui/button';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/configs';
import { Course } from '@/types';

interface EditCourseProps{
  course: Course | null;

}
const EditCourse: React.FC<EditCourseProps> = ({ course }) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  // Update state when `course` changes
  useEffect(() => {
    setName(course?.courseOutput?.course?.name || '');
    setDescription(course?.courseOutput?.Description || '');
  }, [course]);

  const onUpdateHandler = async () => {
    if (!course.id) {
      console.error("Missing course ID");
      return;
    }

    setIsUpdating(true);

    try {
      // Ensure courseOutput is correctly structured
      const updatedCourseOutput = {
        ...course?.courseOutput,
        course: {
          ...course?.courseOutput.course,
          name,
          description,
        },
      };

      const result = await db
        .update(CourseList)
        .set({ courseOutput: updatedCourseOutput })
        .where(eq(CourseList.id, course.id))
        .returning({ id: CourseList.id });

      console.log("Updated Course:", result);

      // Close dialog after successful update
      document.getElementById(`close-dialog-${course.id}`)?.click();
    } catch (error) {
      console.error("Error updating course:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <FaEdit className="text-xl text-primary cursor-pointer" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-blue-500'>Edit Course Title and Description</DialogTitle>
            <DialogDescription>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-blue-400">Course Title</label>
                <Input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  disabled={isUpdating}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-blue-400">Course Description</label>
                <Textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  disabled={isUpdating}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={onUpdateHandler} disabled={isUpdating} className='bg-blue-500 hover:400'>
              {isUpdating ? "Updating..." : "Update"}
            </Button>
            <DialogClose asChild>
              <Button id={`close-dialog-${course.id}`} className="hidden" />
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditCourse;
