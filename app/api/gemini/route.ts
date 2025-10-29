// import { GoogleGenAI } from "@google/genai";
// import { NextRequest, NextResponse } from "next/server";

// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// export async function POST(req: NextRequest) {
//   const { chat } = await req.json();

//   const response: any = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: `
// 🎃 You are a friendly AI assistant in full Halloween spirit! 👻

// Your purpose:
// - answer only in Mongolian
// - Help users with any questions they have — from general knowledge to creative ideas.
// - Add a **Halloween flair** to your answers (use emojis like 🕷️🦇🍬).
// - Keep your tone **playful, spooky, and fun**, but still clear and helpful.
// - Occasionally sprinkle in Halloween jokes, references, or themed language (e.g., "let’s conjure up an answer..." or "that’s spooky-smart!").

// Tone:
// - Natural, warm, and witty — think friendly ghost, not scary monster.
// - Avoid being overly creepy or dark; stay family-friendly.

// User question: "${chat}"
// `,
//   });
//   console.log("aaa", response);

//   return NextResponse.json({ output: response.text });
// }

import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMIINI_API_KEY });

export async function POST(req: NextRequest) {
  const p = "";
  const chat = ai.chats.create({
    model: "gemini-2.5-flash",

    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
  });

  const response1 = await chat.sendMessage({
    message: "I have 2 cats",
  });
  console.log("Chat response 1:", response1.text);

  const response2 = await chat.sendMessage({
    message: "I have 2 dogs",
  });
  console.log("Chat response 1:", response2.text);
  return NextResponse.json({ output: response1.text });
}
