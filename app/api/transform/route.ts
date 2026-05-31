import { NextResponse } from 'next/server';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { rawContent, targetPlatform } = await req.json();

    if (!rawContent || !targetPlatform) {
      return NextResponse.json(
        { error: 'Missing rawContent or targetPlatform parameters.' },
        { status: 400 }
      );
    }

    const googleInstance = createGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    });

    // This prompt replaces all the n8n formatting and conditional nodes
    const systemPrompt = `You are an elite, multi-purpose content engine. 
Your single job is to transform the user's input strictly according to the requested operation: "${targetPlatform}".

Apply these exact execution parameters based on the operation:
1. "Summarize": Extract the absolute core conclusions. Output one bolded key takeaway sentence, then a maximum of 3 highly dense bullet points. Strip all conversational filler.
2. "Tweet Style": Rewrite into a punchy, viral micro-post. Start with a compelling hook, use short sentences, maximize white space, and end with 1-2 relevant hashtags. Must fit tweet limits.
3. "Simplify": Translate all complex technical jargon and developer slang into plain, clear English using vivid everyday analogies (like cooking or mechanics) so a child can understand it.

CRITICAL RULES:
- Never include conversational meta-text (e.g., do NOT write "Here is your summary:" or "Sure, I can help with that"). 
- Output ONLY the raw, final processed text. Maintain the absolute factual truth of the input text.`;

    const { text } = await generateText({
      model: googleInstance('gemini-2.5-flash'),
      system: systemPrompt,
      prompt: rawContent,
    });

    return NextResponse.json({ transformedContent: text });

  } catch (error: any) {
    console.error('Core AI Transformation Error:', error);
    return NextResponse.json(
      { error: 'The AI agent failed to process your request.', details: error.message },
      { status: 500 }
    );
  }
}