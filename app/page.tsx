"use client";

import { AppWindowIcon, CodeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export function TabsDemo() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setImage("");

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.image) {
        setImage(data.image);
      } else {
        alert("Faled to generate image");
      }
    } catch (error) {
      alert("Failed to generate image");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-wrap mt-20 ml-20 max-w-sm ">
      <Tabs defaultValue="account">
        <form onSubmit={generateImage}>
          <TabsList className="mb-5 flex gap-2 ml-6">
            <TabsTrigger value="account">Image creator</TabsTrigger>
            <TabsTrigger value="password">Ingredient recognition</TabsTrigger>
            <TabsTrigger value="password">x</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            {/* card1 */}
            <Card>
              <CardHeader>
                <div className="flex gap-2">
                  <img className="w-[15px] h-[15px]" src="star.png" />
                  <CardTitle>Food image creator</CardTitle>
                  <button className="ml-55 border">
                    <img className="w-3 h-3" src="reload.png" />
                  </button>
                </div>

                <CardDescription className="mt-5">
                  What food image do you want? Describe it briefly.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  {/* <Label htmlFor="tabs-demo-username">Username</Label> */}
                  <Input
                    id="tabs-demo-username"
                    className="-mt-4 flex p-10"
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    // placeholder="Хоолны тайлбар"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  disabled={loading || !prompt}
                  className="ml-82 -mt-2 bg-gray-500"
                >
                  {loading ? "Generating... " : "Generate"}
                </Button>
              </CardFooter>

              <CardDescription>
                <div className="flex gap-2 ml-8">
                  <img className="w-4 h-4 mt-1" src="image.png" />
                  <CardTitle className="text-black text-[16px]">
                    Result
                  </CardTitle>
                </div>
                {image && (
                  <div>
                    <img src={image} alt="Generated" />
                  </div>
                )}
              </CardDescription>
              <CardDescription className="ml-7 -mt-3">
                First, enter your text to generate an image.
              </CardDescription>

              <CardDescription className="ml-8 -mt-4"></CardDescription>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you&apos;ll be logged
                  out.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-current">Current password</Label>
                  <Input id="tabs-demo-current" type="password" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="tabs-demo-new">New password</Label>
                  <Input id="tabs-demo-new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>

            <Card></Card>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  );
}
export default TabsDemo;

// "use client";

// import { useState } from "react";

// export default function Home() {
//   const [prompt, setPrompt] = useState("");
//   const [image, setImage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const generateImage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setImage("");

//     try {
//       const response = await fetch("/api/generate-image", {
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
//       console.error("Error:", error);
//       alert("Failed to generate imageee");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-8">
//       <h1 className="text-4xl font-bold mb-8">Text to Image </h1>

//       <form onSubmit={generateImage} className="w-full max-w-2xl">
//         <input
//           type="text"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           placeholder="Enter your prompt "
//           className="w-full p-4 border border-gray-300 rounded-lg mb-4 text-lg"
//         />

//         <button
//           type="submit"
//           disabled={loading || !prompt}
//           className="w-full bg-gray-500 text-white p-4 rounded-lg text-lg font-semibold  disabled:bg-gray-300"
//         >
//           {loading ? "Generating..." : "Generate Image"}
//         </button>
//       </form>

//       {image && (
//         <div className="mt-8 w-full max-w-2xl">
//           <img
//             src={image}
//             alt="Generated"
//             className="w-full rounded-lg shadow-lg"
//           />
//         </div>
//       )}
//     </div>
//   );
// }
