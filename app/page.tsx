"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { GenerateText } from "./_components/GenerateText";
import { GenerateTextToText } from "./_components/GenerateTextToText";
import { GenerateImageToText } from "./_components/GenerateImageToText";
import { ChatInterface } from "./_components/ChatInterface";
export function TabsDemo() {
  return (
    <div className="flex flex-wrap mt-20 ml-20 max-w-sm ">
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
      </Tabs>
      <ChatInterface />
    </div>
  );
}
export default TabsDemo;
