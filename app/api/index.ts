'use server'
import { uploadImage } from '@/lib/cloudinary';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const file = req.body.file;
    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    try {
      const url = await uploadImage(file);
      res.status(200).json({ url });
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ error: 'Failed to upload image' });
      }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}