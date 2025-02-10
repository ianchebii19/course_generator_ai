import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import axios from 'axios';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

interface GenerateCourseOptions {
  prompt: string;
  max_tokens?: number;
}

export async function generateCourse({ prompt, max_tokens = 500 }: GenerateCourseOptions) {
  try {
    const response = await axios.post(
      'https://api.deepseek.com/v1/generate',
      {
        prompt,
        max_tokens,
      },
      {
        headers: {
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error generating course:', error);
    throw new Error('Failed to generate course');
  }
}