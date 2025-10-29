// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
// import { MessageCircle, Send } from "lucide-react";
// import { useState } from "react";

// export function ChatInterface() {
//   const [input, setInput] = useState<string>("");
//   const [response, setResponse] = useState<string>("");

//   const onSendChat = async () => {
//     const response = await fetch("/api/gemini", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ chat: input }),
//     });
//     const data = await response.json();
//     if (data) {
//       setResponse(data.message);
//     }
//   };
//   return (
//     <div>
//       <DropdownMenu>
//         <DropdownMenuTrigger>
//           <Button className="bg-black rounded-full">
//             <MessageCircle />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent>
//           <div className="flex">
//             <DropdownMenuLabel>Chat assistant</DropdownMenuLabel>
//             {response && <p>{response}</p>}
//             <Button className="bg-white text-black border rounded-md w-3 h-5 mt-2 mx-auto ">
//               X
//             </Button>
//           </div>

//           <DropdownMenuSeparator />
//           <div>
//             <Input
//               className="w-[200px]"
//               placeholder="Type your message..."
//               onChange={(e) => setInput(e.target.value)}
//               value={input}
//             ></Input>
//             <Button onClick={onSendChat}>
//               <Send />
//             </Button>
//           </div>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   );
// }
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
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat: input }),
    });

    const data = await res.json();
    if (data?.output) setResponse(data.output);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-black rounded-full">
            <MessageCircle />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="p-3 w-72">
          <DropdownMenuLabel>Chat assistant</DropdownMenuLabel>

          {response && (
            <div className="relative bg-gray-100 rounded-md p-2 mt-2 text-sm">
              {response}
              <Button
                size="sm"
                variant="outline"
                className="absolute top-1 right-1"
                onClick={() => setResponse("")}
              >
                X
              </Button>
            </div>
          )}

          <DropdownMenuSeparator />

          <div className="flex gap-2 mt-2">
            <Input
              placeholder="Type your message..."
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <Button onClick={onSendChat}>
              <Send />
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
