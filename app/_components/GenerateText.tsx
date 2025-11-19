"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const GenerateText = () => {
  const [picture, setPicture] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const generateToText = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPicture("");
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      console.log("prompt", prompt);

      const data = await response.json();

      if (data.image) {
        setPicture(data.image);
      } else {
        alert("Failed to generate imagee");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate imageee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={generateToText}>
        <TabsContent value="Image creator">
          <Card>
            <CardHeader>
              <div className="flex gap-2">
                <img className="w-[15px] h-[15px]" src="star.png" />
                <CardTitle>Food image creator</CardTitle>
                <button
                  type="button"
                  onClick={() => setPrompt("")}
                  className="ml-48 border rounded-md w-6 h-6 flex justify-center items-center"
                >
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
                className="ml-130 -mt-2 bg-gray-500"
              >
                {loading ? "Generating..." : "Generate"}
              </Button>
            </CardFooter>

            <CardDescription>
              <div className="flex gap-2 ml-8">
                <img className="mt-1" src="image.png" />
                <CardTitle className="text-black text-[16px] mt-1">
                  Result
                </CardTitle>
              </div>
              {picture && (
                <div>
                  <img
                    className="rounded-lg w-[300px] h-[300px] flex mx-auto mt-3"
                    src="/sheet.png"
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
    </div>
  );
};
