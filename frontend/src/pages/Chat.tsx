import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chats/chat-item";
import { ArrowUpRight } from "lucide-react";
import { deleteUserChats, fetchUserChats, sendChatRequest } from "../api/chat";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MessageSquareCode } from "lucide-react";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Spinner } from "@/components/ui/spinner";
import { logoutUser } from "@/api/auth";
import UserMenu from "@/components/layout/user-menu";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export function Chat() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
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

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Failed to logout:", error);
      toast.error("Failed to logout");
    }
  };

  useEffect(() => {
    fetchUserChats()
      .then((chats) => {
        setChatMessages(chats || []);
      })
      .catch((error) => {
        console.error("Failed to fetch chats:", error);
        toast.error("Failed to load chats");
      });
  }, []);

  return (
    <div className="w-screen md:h-screen flex p-4 items-center justify-center">
      <div className="w-full md:max-w-6xl h-full min-h-[460px] md:max-h-[650px] 2xl:max-h-[800px] flex flex-col relative items-center overflow-hidden bg-background border border-primary rounded-2xl">
        {/* CONTROL PANEL */}
        <div className="w-full p-8 flex justify-between">
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
        <div className="w-full h-full p-8 flex flex-col items-center justify-center">
          <div>
            {chatMessages.map((message, index) => (
              <ChatItem
                key={index}
                role={message.role}
                content={message.content}
              />
            ))}
          </div>
          <Card className="w-full flex flex-col justify-between rounded-xl border">
            <CardContent className="flex gap-2">
              <Input placeholder="Enter your message..." />
              <Button type="submit" variant="outline">
                <ArrowUpRight />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Chat;
