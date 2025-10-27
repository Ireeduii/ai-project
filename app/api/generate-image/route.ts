// import { InferenceClient } from "@huggingface/inference";
// import { error } from "console";
// import { NextResponse } from "next/server";

// const hf  = new InferenceClient(process.env.HF_TOKEN || "")
//   export async function POST(req: NextResponse) {
//     try {
//         const {prompt} = await req.json

//         {!prompt} {
//             return NextResponse.json(
//                 {error: "Prompt is required"},
//                 {status:4000}
//             );
//         }
//         const image = (await hf.textToImage({
//             model: "black-forest-labs/FLUX.1-schnell",
//             inputs: prompt
//         })) as unknown as Blob

//         const buffer = await image.arrayBuffer()
//         const base64= Buffer.from(buffer).toString("base64")

//         return NextResponse.json({
//             image: `data:image/png;base64,${base64}`,
//         })
//     } catch(error)
//        return NextResponse.json(
//         {error:"Failed to generate image"},
//         {status:5000}
//     )
//   }
// }

import { InferenceClient } from "@huggingface/inference";
import { NextRequest, NextResponse } from "next/server";
const hf = new InferenceClient(process.env.HF_TOKEN || "");
console.log(process.env.HF_TOKEN);
export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const image = (await hf.textToImage({
      model: "black-forest-labs/FLUX.1-schnell",
      inputs: prompt,
    })) as unknown as Blob;

    const buffer = await image.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    return NextResponse.json({
      image: `data:image/png;base64,${base64}`,
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Failed to generate imageee" },
      { status: 500 }
    );
  }
}
