// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { useState } from "react";
// import { TabsContent } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";

// export function GenerateImageToText() {
//   const [prompt, setPrompt] = useState("");
//   const [content, setContent] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [image, setImage] = useState("");

//   const generateImage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setContent("");

//     try {
//       const response = await fetch("/api/image-to-text", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ prompt }),
//       });

//       const data = await response.json();

//       if (data.image) {
//         setImage(data.image);
//       } else {
//         alert("Failed to generate image");
//       }
//     } catch (error) {
//       alert("Failed to generate image");
//     } finally {
//       setLoading(false);
//     }
//   };
//   function setFile(arg0: File | null): void {
//     throw new Error("Function not implemented.");
//   }

//   return (
//     <div>
//       <form onSubmit={generateImage}>
//         <TabsContent value="Image analysis">
//           <Card>
//             <CardHeader>
//               <div className="flex gap-2">
//                 <img className="w-[15px] h-[15px]" src="star.png" />
//                 <CardTitle>Ingredient recognition</CardTitle>
//                 <button className=" ml-48 border rounded-md w-6 h-6 flex  justify-center items-center">
//                   <img className="w-3 h-3 " src="reload.png" />
//                 </button>
//               </div>

//               <CardDescription className="mt-5">
//                 Upload a food photo, and AI will detect the ingredients.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="grid gap-6">
//               <div className="grid gap-3">
//                 {/* <Label htmlFor="tabs-demo-username">Username</Label> */}
//                 <Input
//                   id="tabs-demo-username"
//                   className="-mt-4 flex p-10 pt-4"
//                   type="file"
//                   value={prompt}
//                   // onChange={(e) => setFile(e.target.files?.[0] || null)}
//                   placeholder="Choose File JPG, PNG"
//                 />
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button
//                 type="submit"
//                 disabled={loading || !prompt}
//                 className="ml-82 -mt-2 bg-gray-500"
//               >
//                 {loading ? "Extracting... " : "Generate"}
//               </Button>
//             </CardFooter>

//             <CardDescription>
//               <div className="flex gap-2 ml-8">
//                 <img className=" mt-1" src="sheet.png" />
//                 <CardTitle className="text-black text-[16px]">
//                   Here is the summary
//                 </CardTitle>
//               </div>

//               {content && (
//                 <div className="mt-5 mx-5 p-4 border-1 rounded-md">
//                   <h2 className="text-sm font-semibold mb-4">
//                     Extracted Ingredients:
//                   </h2>
//                   <div>
//                     <p>{content}</p>
//                   </div>
//                 </div>
//               )}
//             </CardDescription>
//             <CardDescription className="ml-7 -mt-3">
//               First, enter your image to recognize an ingredients.
//             </CardDescription>

//             <CardDescription className="ml-8 -mt-4"></CardDescription>
//           </Card>
//         </TabsContent>
//       </form>
//     </div>
//   );
// }
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export function GenerateImageToText() {
  const [file, setFile] = useState<File | null>(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    setLoading(true);
    setContent("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/image-to-text", {
        method: "POST",
        body: formData, 
      });

      const data = await response.json();

      if (data.text) {
        setContent(data.text);
      } else {
        alert("Failed to extract text");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to extract text");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={generateImage}>
        <TabsContent value="Image analysis">
          <Card>
            <CardHeader>
              <div className="flex gap-2">
                <Image className="w-[15px] h-[15px]" src={"/star.png"} alt="star"/>
                <CardTitle>Ingredient recognition</CardTitle>
                <button
                  type="button"
                  className="ml-48 border rounded-md w-6 h-6 flex justify-center items-center "
                  onClick={() => setFile(null)}
                >
                  <Image className="w-3 h-3  " src="reload.png" alt="reload"/>
                </button>
              </div>

              <CardDescription className="mt-5">
                Upload a food photo, and AI will detect the ingredients.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit" disabled={loading || !file} className="ml-130 bg-gray-500">
                {loading ? "Extracting..." : "Generate"}
              </Button>
            </CardFooter>

            {content && (
              <CardDescription>
                <div className="mt-5 mx-5 p-4 border rounded-md">
                  <h2 className="text-sm font-semibold mb-4">
                    Extracted Ingredients:
                  </h2>
                  <p>{content}</p>
                </div>
              </CardDescription>
            )}
          </Card>
        </TabsContent>
      </form>
    </div>
  );
}
