// import { GoogleGenAI } from "@google/genai";
// import { NextResponse } from "next/server";

// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// export async function POST(req: Request) {
//   const p = "How to lose weight?";

//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: p,
//   });

//   return NextResponse.json({ output: response.text });
// }

import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  const { chat } = await req.json();

  const response: any = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: chat,
  });
  console.log("aaa", response);

  return NextResponse.json({ output: response.text });
}
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "AI request failed" }, { status: 500 });
//   }
