import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send } from "lucide-react";
import { useState } from "react";

export function ChatInterface() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const onSendChat = async () => {
    if (!input.trim()) return;

    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat: input }),
    });

    const data = await res.json();
    if (data.output) setResponse(data.output);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendChat();
    }
  };

  return (
    <div className="w-[250px] ml-100 mt-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-black rounded-full">
            <MessageCircle />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="p-3 w-72">
          <DropdownMenuLabel>Chat assistant</DropdownMenuLabel>

          <Button
            size="sm"
            variant="outline"
            className="absolute top-2 right-2 "
            onClick={() => setResponse("")}
          >
            X
          </Button>

          {response && (
            <div className="relative bg-gray-100 rounded-md p-2 mt-2 text-sm">
              {response}
            </div>
          )}

          <DropdownMenuSeparator />

          <div className="flex gap-2 mt-2 h-50">
            <Input
              placeholder="Type your message..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              value={input}
              className="mt-40"
            />
            <Button onClick={onSendChat} className="mt-40">
              <Send />
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
