// Handles AI profile and image generation

export async function generateAIProfile(prompt) {
  try {
    // Use the LLM to generate a fictional profile based on the prompt
    const completion = await websim.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a creative AI profile generator. Create a vivid, detailed, and engaging fictional profile based on the user's prompt. 
          The profile should be 3-4 paragraphs long and include:
          - A fictional name
          - Background story
          - Personality traits
          - Interesting habits or quirks
          - Fictional achievements or life events
          
          Make it creative, detailed, and intriguing, but keep it appropriate for all audiences.
          Do not include any disclaimers about the person being fictional - we know they are.`
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });

    return completion.content;
  } catch (error) {
    console.error('Error generating AI profile:', error);
    throw new Error('Failed to generate AI profile');
  }
}

export async function generateAIImage(profileText) {
  try {
    // First, generate a concise visual description from the profile text
    const visualPrompt = await createVisualPrompt(profileText);
    
    // Then generate the image based on the enhanced prompt
    const result = await websim.imageGen({
      prompt: visualPrompt,
      aspect_ratio: "1:1",
    });

    return result.url;
  } catch (error) {
    console.error('Error generating AI image:', error);
    throw new Error('Failed to generate AI image');
  }
}

// Helper function to create a visual prompt from the profile text
async function createVisualPrompt(profileText) {
  try {
    const completion = await websim.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You're an expert at converting text descriptions into visual prompts for AI image generation.
          Based on the profile text, create a detailed, vivid image generation prompt that will produce a realistic portrait of this fictional person.
          
          Your prompt should:
          - Focus on the person's physical appearance and distinguishing features
          - Include details about their expression, pose, and clothing
          - Suggest appropriate lighting, background, and atmosphere
          - Include style cues like "photorealistic portrait", "detailed digital art", etc.
          
          Keep the prompt under 100 words and focused on visual elements that can be depicted in an image.
          Do not include any disclaimers or text about the person being fictional.`
        },
        {
          role: "user",
          content: profileText
        }
      ]
    });

    return completion.content;
  } catch (error) {
    console.error('Error creating visual prompt:', error);
    throw new Error('Failed to create visual prompt');
  }
}

