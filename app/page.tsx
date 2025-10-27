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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export function TabsDemo() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const generateText = async (e: React.FormEvent) => {
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
        alert("Failed to generate image");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate image");
    } finally {
      setLoading(false);
    }
  };

  const extractIngredients = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIngredients("");

    try {
      const response = await fetch("/api/text-to-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.text) {
        setIngredients(data.text);
      } else {
        alert("Failed to text");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to text");
    } finally {
      setLoading(false);
    }
  };

  // const generateImage = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!file) return alert("Please upload an image!");

  //   setLoading(true);
  //   setContent("");

  //   try {
  //     const formData = new FormData();
  //     formData.append("file", file);

  //     const response = await fetch("/api/image-to-text", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const data = await response.json();

  //     if (data.text) {
  //       setContent(data.text);
  //     } else {
  //       alert("Failed to extract text");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("Failed to extract text");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const generateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setContent("");

    try {
      const response = await fetch("/api/image-to-text", {
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
        alert("Failed to generate image");
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
        <form onSubmit={generateText}>
          <TabsList className="mb-5 flex gap-2 ml-6">
            <TabsTrigger value="Image creator">Image creator</TabsTrigger>
            <TabsTrigger value="Ingredient recognition">
              Ingredient recognition
            </TabsTrigger>
            <TabsTrigger value="Image analysis">Image analysis</TabsTrigger>
          </TabsList>
          <TabsContent value="Image creator">
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
                  <Input
                    id="tabs-demo-username"
                    className="-mt-4 flex p-10"
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Хоолны тайлбар"
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
                  <img className=" mt-1" src="image.png" />
                  <CardTitle className="text-black text-[16px]">
                    Result
                  </CardTitle>
                </div>
                {image && (
                  <div>
                    <img
                      className="rounded-lg w-[300px] h-[300px] flex mx-auto mt-3"
                      src={image}
                      alt="Generated"
                    />
                  </div>
                )}
              </CardDescription>
              <CardDescription className="ml-7 -mt-3">
                First, enter your text to generate an image.
              </CardDescription>
            </Card>
          </TabsContent>
        </form>

        {/* card 2 */}
        <form onSubmit={extractIngredients}>
          <TabsContent value="Ingredient recognition">
            <Card>
              <CardHeader>
                <div className="flex gap-2">
                  <img className="w-[15px] h-[15px]" src="star.png" />
                  <CardTitle>Ingredient recognition</CardTitle>
                  <button className=" ml-50 border">
                    <img className="w-3 h-3" src="reload.png" />
                  </button>
                </div>

                <CardDescription className="mt-5">
                  Describe the food, and AI will detect the ingredients.
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
                    placeholder="Орц тодорхойлох"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  disabled={loading || !prompt}
                  className="ml-82 -mt-2 bg-gray-500"
                >
                  {loading ? "Extracting... " : "Generate"}
                </Button>
              </CardFooter>

              <CardDescription>
                <div className="flex gap-2 ml-8">
                  <img className=" mt-1" src="sheet.png" />
                  <CardTitle className="text-black text-[16px]">
                    Identified Ingredients
                  </CardTitle>
                </div>

                {ingredients && (
                  <div className="mt-5 mx-5 p-4 border-1 rounded-md">
                    <h2 className="text-sm font-semibold mb-4">
                      Extracted Ingredients:
                    </h2>
                    <div>
                      <p>{ingredients}</p>
                    </div>
                  </div>
                )}
              </CardDescription>
              <CardDescription className="ml-7 -mt-3">
                First, enter your text to recognize an ingredients.
              </CardDescription>

              <CardDescription className="ml-8 -mt-4"></CardDescription>
            </Card>
          </TabsContent>
        </form>

        {/* card 3 */}
        <form onSubmit={generateImage}>
          <TabsContent value="Image analysis">
            <Card>
              <CardHeader>
                <div className="flex gap-2">
                  <img className="w-[15px] h-[15px]" src="star.png" />
                  <CardTitle>Ingredient recognition</CardTitle>
                  <button className=" ml-50 border">
                    <img className="w-3 h-3" src="reload.png" />
                  </button>
                </div>

                <CardDescription className="mt-5">
                  Upload a food photo, and AI will detect the ingredients.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  {/* <Label htmlFor="tabs-demo-username">Username</Label> */}
                  <Input
                    id="tabs-demo-username"
                    className="-mt-4 flex p-10"
                    type="file"
                    value={prompt}
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    placeholder="Choose File JPG, PNG"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  disabled={loading || !prompt}
                  className="ml-82 -mt-2 bg-gray-500"
                >
                  {loading ? "Extracting... " : "Generate"}
                </Button>
              </CardFooter>

              <CardDescription>
                <div className="flex gap-2 ml-8">
                  <img className=" mt-1" src="sheet.png" />
                  <CardTitle className="text-black text-[16px]">
                    Here is the summary
                  </CardTitle>
                </div>

                {content && (
                  <div className="mt-5 mx-5 p-4 border-1 rounded-md">
                    <h2 className="text-sm font-semibold mb-4">
                      Extracted Ingredients:
                    </h2>
                    <div>
                      <p>{content}</p>
                    </div>
                  </div>
                )}
              </CardDescription>
              <CardDescription className="ml-7 -mt-3">
                First, enter your image to recognize an ingredients.
              </CardDescription>

              <CardDescription className="ml-8 -mt-4"></CardDescription>
            </Card>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  );
}
export default TabsDemo;
