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

export const GenerateTextToText = () => {
  // const [picture, setPicture] = useState("");
  const [prompt, setPrompt] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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

  return (
    <form onSubmit={extractIngredients}>
      <TabsContent value="Ingredient recognition">
        <Card>
          <CardHeader>
            <div className="flex gap-2">
              <img className="w-[15px] h-[15px]" src="star.png" />
              <CardTitle>Ingredient recognition</CardTitle>
              <button
                type="button"
                className=" ml-48 border rounded-md w-6 h-6 flex  justify-center items-center"
              >
                <img className="w-3 h-3" src="reload.png" alt="reload"/>
              </button>
            </div>

            <CardDescription className="mt-5">
              Describe the food, and AI will detect the ingredients.
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
                placeholder="Орц тодорхойлох"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={loading || !prompt}
              className="ml-130 -mt-2 bg-gray-500"
            >
              {loading ? "Extracting... " : "Generate"}
            </Button>
          </CardFooter>

          <CardDescription>
            <div className="flex gap-2 ml-8 ">
              <img className=" mt-1" src="sheet.png" alt="sheet" />
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
  );
};
