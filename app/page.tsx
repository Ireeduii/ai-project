

"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { GenerateText } from "./_components/GenerateText";
import { GenerateTextToText } from "./_components/GenerateTextToText";
import { GenerateImageToText } from "./_components/GenerateImageToText";
import { ChatInterface } from "./_components/ChatInterface";

export default function Page() {
  return (
    <div className="flex justify-center items-center mt-40 ml-40">
      <Tabs defaultValue="account">
        <TabsList className="mb-5 flex gap-2 ml-6">
          <TabsTrigger value="Image creator">Image creator</TabsTrigger>
          <TabsTrigger value="Ingredient recognition">
            Ingredient recognition
          </TabsTrigger>
          <TabsTrigger value="Image analysis">Image analysis</TabsTrigger>
        </TabsList>

        <GenerateText />
        <GenerateTextToText />
        <GenerateImageToText />
        <ChatInterface />
      </Tabs>
    </div>
  );
}
