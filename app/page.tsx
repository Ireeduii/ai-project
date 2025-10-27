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
            <TabsTrigger value="Image creator">Image creator</TabsTrigger>
            <TabsTrigger value="Ingredient recognition">
              Ingredient recognition
            </TabsTrigger>
            <TabsTrigger value="password">x</TabsTrigger>
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

              <CardDescription className="ml-8 -mt-4"></CardDescription>
            </Card>
          </TabsContent>

          <TabsContent value="Ingredient recognition">
            <Card>
              <CardHeader>
                <div className="flex gap-2">
                  <img className="w-[15px] h-[15px]" src="star.png" />
                  <CardTitle>Food image creator</CardTitle>
                  <button className="ml-55 border">
                    <img className="w-3 h-3" src="reload.png" />
                  </button>
                </div>

                <CardDescription className="mt-5">aaaaaa</CardDescription>
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

              <CardDescription className="ml-8 -mt-4"></CardDescription>
            </Card>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  );
}
export default TabsDemo;
