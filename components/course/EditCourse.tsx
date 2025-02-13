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

interface Course {
  id?: string; // Assuming there is an id field
  courseOutput: {
    course: {
      name?: string;
      description?: string;
    };
  };
}

interface EditCourseProps {
  course: Course;
}

const EditCourse: React.FC<EditCourseProps> = ({ course }) => {
  const [name, setName] = useState<string | undefined>(course?.courseOutput?.course?.name);
  const [description, setDescription] = useState<string | undefined>(course?.courseOutput?.course?.description);

  // Correct usage of useEffect
  useEffect(() => {
    setName(course?.courseOutput.course.name);
    setDescription(course?.courseOutput.course.description);
  }, [course]); // Dependency array to update when course changes

  const onUpdateHandler = async () => {
    if (course.courseOutput.course) {
      // Update the course object with new values
      const updatedCourse = {
        ...course.courseOutput,
        course: {
          ...course.courseOutput.course,
          name,
          description,
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
            <DialogTitle>Edit Course Title and Description</DialogTitle>
            <DialogDescription>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">Course Title</label>
                <Input
                  value={name} // Use value for controlled component
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Course Description</label>
                <Textarea
                  value={description} // Use value for controlled component
                  onChange={(event) => setDescription(event.target.value)}
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

export default EditCourse;
