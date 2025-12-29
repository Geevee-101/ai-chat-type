import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chats/chat-item";
import { ArrowUpRight } from "lucide-react";
import { deleteUserChats, fetchUserChats, sendChatRequest } from "../api/chat";
import { toast } from "sonner";

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

  const handleDeleteChats = async () => {
    try {
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Chats deleted successfully");
    } catch (error) {
      console.error("Failed to delete chats:", error);
      toast.error("Failed to delete chats");
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
    <div className="flex flex-1 w-full h-full mt-3 gap-3">
      <div className="hidden md:flex md:flex-[0.2] flex-col">
        <div className="flex w-full h-[60vh] bg-[rgb(17,29,39)] rounded-[20px] flex-col mx-3">
          <div className="w-10 h-10 rounded-full bg-white text-black font-bold flex items-center justify-center mx-auto my-4">
            {auth?.user?.name?.slice(0, 1)}
            {auth?.user?.name?.split(" ")[1]?.slice(0, 1)}
          </div>
          <p className="mx-auto text-white">You are talking to a Chatbot</p>
          <p className="mx-auto my-4 p-3 text-white">
            Ask any question you have
          </p>
          <button
            onClick={handleDeleteChats}
            className="mx-auto my-auto w-[200px] bg-red-300 hover:bg-red-400 text-white font-bold rounded-xl px-4 py-2 transition-colors"
          >
            Clear Conversation
          </button>
        </div>
      </div>
      <div className="flex flex-1 flex-col px-3 rounded-lg">
        <h2 className="mx-auto text-[40px] text-white mb-4">
          Model - GPT 4o Mini
        </h2>
        <div className="w-full h-[60vh] rounded-xl mx-auto flex flex-col overflow-y-auto overflow-x-hidden scroll-smooth">
          {chatMessages.map((message, index) => (
            <ChatItem
              key={index}
              role={message.role}
              content={message.content}
            />
          ))}
        </div>
        <div className="w-full rounded-lg bg-[rgb(17,29,39)] flex m-auto">
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent p-8 border-none outline-none text-white text-xl"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSubmit}
            className="ml-auto text-white p-4 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowUpRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
