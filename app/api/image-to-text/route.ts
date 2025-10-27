// import { InferenceClient } from "@huggingface/inference";
// import { NextRequest, NextResponse } from "next/server";
// const hf = new InferenceClient(process.env.HF_TOKEN || "");
// console.log(process.env.HF_TOKEN);
// export async function POST(req: NextRequest) {
//   try {
//     const { prompt } = await req.json();

//     if (!prompt) {
//       return NextResponse.json(
//         { error: "Prompt is required" },
//         { status: 400 }
//       );
//     }

//     const image = (await hf.imageToText({
//       model: "PaddlePaddle/PP-OCRv5_server_det",
//       inputs: prompt,
//     })) as unknown as Blob;

//     const buffer = await file.arrayBuffer();
//     const base64 = Buffer.from(buffer).toString("base64");

//     return NextResponse.json({
//       image: `data:image/png;base64,${base64}`,
//     });
//   } catch (error) {
//     console.error("Error generating image:", error);
//     return NextResponse.json(
//       { error: "Failed to generate imageee" },
//       { status: 500 }
//     );
//   }
// }
import { InferenceClient } from "@huggingface/inference";
import { NextResponse } from "next/server";

const hf = new InferenceClient(process.env.HF_TOKEN || "");

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    //
    const arrayBuffer = await file.arrayBuffer();
    const result = await hf.imageToText({
      model: "microsoft/trocr-base-handwritten", //
      data: arrayBuffer,
    });

    return NextResponse.json({ text: result.generated_text });
  } catch (error) {
    console.error("Error extracting text:", error);
    return NextResponse.json(
      { error: "Failed to extract text" },
      { status: 500 }
    );
  }
}
