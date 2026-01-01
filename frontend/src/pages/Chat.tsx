import { useEffect, useRef } from "react";
import ChatItem from "../components/chats/chat-item";
import { fetchUserChats, sendChatRequest } from "../api/chat";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/theme/mode-toggle";
import UserMenu from "@/components/layout/user-menu";
import { MessageSquareCode } from "lucide-react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export function Chat() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();

  // Tanstack Query: Fetch chat messages
  const {
    data: chatMessages = [],
    isLoading,
    error,
  } = useQuery<Array<{ role: "user" | "assistant"; content: string }>>({
    queryKey: ["chats"],
    queryFn: fetchUserChats,
  });

  // Tanstack Query: Send chat message mutation
  const sendMessageMutation = useMutation({
    mutationFn: sendChatRequest,
    onMutate: async (newMessage) => {
      // Cancel ongoing queries to avoid race conditions
      await queryClient.cancelQueries({ queryKey: ["chats"] });

      // Save current state for rollback
      const previousChats = queryClient.getQueryData(["chats"]);

      // Optimistically add user message immediately
      queryClient.setQueryData(
        ["chats"],
        (old: Array<{ role: "user" | "assistant"; content: string }> = []) => [
          ...old,
          { role: "user", content: newMessage },
        ],
      );

      return { previousChats };
    },
    onSuccess: () => {
      // Refetch to get AI response from server
      queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
    onError: (_error, _variables, context) => {
      // Rollback user message if send failed
      if (context?.previousChats) {
        queryClient.setQueryData(["chats"], context.previousChats);
      }
      toast.error("Failed to send message.");
    },
  });

  const handleSubmit = () => {
    if (!inputRef.current?.value) return;

    const userMessage = inputRef.current.value;
    inputRef.current.value = "";

    // Use mutation to send message
    sendMessageMutation.mutate(userMessage);
  };

  // Show error toast if query fails
  useEffect(() => {
    if (error) {
      toast.error("Failed to load chats.");
    }
  }, [error]);

  // Track if this is the first load
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (chatMessages.length === 0) return;

    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({
        block: "end",
        behavior: isFirstLoad.current ? "auto" : "smooth",
      });

      // After first scroll, set to false
      if (isFirstLoad.current) {
        isFirstLoad.current = false;
      }
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
            <UserMenu />
            <ModeToggle />
          </div>
        </div>
        {/* CHAT PANEL */}
        <div className="relative w-full flex-1 min-h-0 pl-4 pr-0 pb-4 md:pl-8 md:pr-4 md:pb-8 flex flex-col overflow-hidden">
          {/* CHAT MESSAGES */}
          <ScrollArea className="w-full h-full">
            <div className="pr-4">
              {isLoading && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center py-8 gap-2">
                  <Spinner />
                  <p className="text-muted-foreground">Loading chats...</p>
                </div>
              )}
              {chatMessages.map((message, index) => (
                <ChatItem
                  key={index}
                  role={message.role}
                  content={message.content}
                />
              ))}
              {sendMessageMutation.isPending && (
                <ChatItem
                  role="assistant"
                  content="Thinking..."
                  useSpinner={true}
                />
              )}
              <div ref={messagesEndRef} className="pt-28" />
            </div>
          </ScrollArea>
          {/* CHAT INPUT */}
          <div className="absolute bottom-0 w-full pr-8 pb-4 md:pr-16 md:pb-8">
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
                    <Input
                      placeholder="Enter your message..."
                      ref={inputRef}
                      disabled={isLoading}
                    />
                    <Button
                      type="submit"
                      variant="outline"
                      disabled={isLoading}
                    >
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
