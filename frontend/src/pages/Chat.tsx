import { useEffect, useRef, useState } from "react";
import ChatItem from "../components/chats/chat-item";
import { ArrowUpRight } from "lucide-react";
import { fetchUserChats, sendChatRequest } from "../api/chat";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/theme/mode-toggle";
import UserMenu from "@/components/layout/user-menu";
import { MessageSquareCode } from "lucide-react";
import { toast } from "sonner";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export function Chat() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const handleSubmit = async () => {
    if (!inputRef.current?.value) return;

    const newMessage: ChatMessage = {
      role: "user",
      content: inputRef.current.value,
    };

    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(newMessage.content);

    setChatMessages((prev) => [
      ...prev,
      { role: "assistant", content: chatData },
    ]);

    inputRef.current.value = "";
  };

  useEffect(() => {
    fetchUserChats()
      .then((chats) => {
        setChatMessages(chats || []);
      })
      .catch(() => {
        toast.error("Failed to load chats.");
      });
  }, []);

  useEffect(() => {
    if (chatMessages.length === 0) return;

    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ block: "end" });
    });
  }, [chatMessages.length]);

  return (
    <div className="w-full h-full flex px-4 pt-4 items-center justify-center">
      <div className="w-full md:max-w-6xl h-full min-h-[460px] md:max-h-[650px] 2xl:max-h-[800px] flex flex-col relative items-center bg-background border border-primary rounded-2xl overflow-hidden">
        {/* CONTROL PANEL */}
        <div className="w-full p-4 md:p-8 flex justify-between bg-muted">
          <div className="flex gap-2 items-center justify-center">
            <MessageSquareCode className="text-primary" />
            <h1 className="text-2xl font-bold text-primary">AI Chat Type</h1>
          </div>
          <div className="flex items-center gap-2">
            <UserMenu setChatMessages={setChatMessages} />
            <ModeToggle />
          </div>
        </div>
        {/* CHAT PANEL */}
        <div className="relative flex-1 min-h-0 ml-4 mr-0 mb-4 md:ml-8 md:mr-4 md:mb-8 flex flex-col overflow-hidden">
          {/* CHAT MESSAGES */}
          <ScrollArea className="flex-1 min-h-0">
            <div className="pr-4">
              {chatMessages.map((message, index) => (
                <ChatItem
                  key={index}
                  role={message.role}
                  content={message.content}
                />
              ))}
              <div ref={messagesEndRef} className="pt-28" />
            </div>
          </ScrollArea>
          {/* CHAT INPUT */}
          <div className="absolute bottom-0 w-full pr-4">
            <div className="w-full bg-background rounded-t-2xl">
              <Card className="w-full">
                <CardContent className="flex gap-2">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                    className="flex gap-2 w-full"
                  >
                    <Input placeholder="Enter your message..." ref={inputRef} />
                    <Button type="submit" variant="outline">
                      <ArrowUpRight />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
