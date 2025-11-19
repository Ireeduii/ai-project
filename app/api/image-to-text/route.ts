
// import { InferenceClient } from "@huggingface/inference";
// import { NextResponse } from "next/server";

// const hf = new InferenceClient(process.env.HF_TOKEN || "");

// export async function POST(req: Request) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get("file") as File | null;

//     if (!file) {
//       return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
//     }

//     //
//     const arrayBuffer = await file.arrayBuffer();
//     const result = await hf.imageToText({
//       model: "microsoft/trocr-base-handwritten", //
//       data: arrayBuffer,
//     });

//     return NextResponse.json({ text: result.generated_text });
//   } catch (error) {
//     console.error("Error extracting text:", error);
//     return NextResponse.json(
//       { error: "Failed to extract text" },
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


    const arrayBuffer = await file.arrayBuffer();


    const result = await hf.imageToText({
      model: "microsoft/trocr-base-handwritten",
      data: arrayBuffer,
    });



    const text = (result).generated_text || (result).text || "";

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Error extracting text:", error);
    return NextResponse.json(
      { error: "Failed to extract text" },
      { status: 500 }
    );
  }
}
