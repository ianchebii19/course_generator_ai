import { db } from '@/db';
import { courses } from '@/db/schema';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { subject, topicDescription, level, duration, includeVideo, numberOfChapters, imageUrl, createdBy, courseOutput } = req.body;

  try {
    const newCourse = await db.insert(courses).values({
      subject,
      topicDescription,
      level,
      duration,
      includeVideo,
      numberOfChapters,
      imageUrl,
      createdBy,
      courseOutput,
    }).returning();

    res.status(200).json({ courseId: newCourse[0].id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save course' });
  }
}