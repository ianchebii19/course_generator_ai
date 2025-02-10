import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { subject, topicDescription, level } = req.body;

  try {
    const response = await axios.post(
      'https://api.deepseek.com/v1/generate',
      {
        prompt: `Generate a course outline on ${subject} for ${level} level. Topic: ${topicDescription}`,
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        },
      }
    );
    res.status(200).json({ generatedText: response.data.choices[0].text });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate course' });
  }
}