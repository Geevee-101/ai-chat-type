import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "../profile/avatars";
import { deleteUserChats } from "@/api/chat";
import { toast } from "sonner";

export function UserMenu({
  setChatMessages,
}: {
  setChatMessages: React.Dispatch<React.SetStateAction<any[]>>;
}) {
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

  const handleLogout = () => {
    console.log("Logout");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <UserAvatar />
          <span className="sr-only">User menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem variant="destructive" onClick={handleDeleteChats}>
          Clear Conversation
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenu;
