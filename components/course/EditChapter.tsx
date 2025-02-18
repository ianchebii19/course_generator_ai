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
import { eq } from 'drizzle-orm';
import { db } from '@/configs';
import { Course } from '@/types';

interface EditChapterProps {
  course: Course;
  index: number;
  
}

const EditChapter: React.FC<EditChapterProps> = ({ course, index }) => {
  const chapters = course?.courseOutput?.Chapters; // Corrected to match the data structure

  const [name, setName] = useState(chapters?.[index]?.['Chapter Name'] || '');
  const [description, setDescription] = useState(chapters?.[index]?.About || '');

  useEffect(() => {
    if (chapters?.[index]) {
      setName(chapters[index]['Chapter Name'] || '');
      setDescription(chapters[index].About || '');
    }
  }, [course, index]);

  const onUpdateHandler = async () => {
    if (!chapters || !chapters[index]) return;

    const updatedChapters = [...chapters];
    updatedChapters[index] = {
      ...updatedChapters[index],
      'Chapter Name': name,
      About: description,
    };

    const updatedCourse = {
      ...course,
      courseOutput: {
        ...course.courseOutput,
        Chapters: updatedChapters,
      },
    };

    try {
      const result = await db
        .update(CourseList)
        .set({ courseOutput: updatedCourse.courseOutput }) // Update only the courseOutput
        .where(eq(CourseList.id, course.id)) // Ensure `course.id` exists
        .returning({ id: CourseList.id });

      console.log('Updated Course:', result);
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <FaEdit className="text-xl text-primary cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Chapter</DialogTitle>
          <DialogDescription>
            Modify the chapter title and description.
          </DialogDescription>
        </DialogHeader>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-blue-400">Chapter Title</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-blue-400">Chapter Description</label>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={onUpdateHandler} className='bg-blue-500 hover:bg-blue-400'>Update</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditChapter;