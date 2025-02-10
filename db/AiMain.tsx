const generateCourse = async (inputs: {
    subject: string;
    topicDescription: string;
    level: string;
    duration: number;
    includeVideo: boolean;
    numberOfChapters: number;
  }) => {
    const prompt = `Generate a course on ${inputs.subject} for ${inputs.level} level. The course should cover ${inputs.topicDescription}, have ${inputs.numberOfChapters} chapters, and a duration of ${inputs.duration} hours. Include videos: ${inputs.includeVideo}.`;
  
    const response = await fetch('https://api.deepseek.com/v1/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        prompt,
        max_tokens: 1000,
      }),
    });
  
    const data = await response.json();
    return data.choices[0].text; // Generated course content
  };