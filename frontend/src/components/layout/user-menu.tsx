import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "../profile/avatars";
import { deleteUserChats } from "@/api/chat";
import { logoutUser } from "@/api/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function UserMenu({
  setChatMessages,
}: {
  setChatMessages: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const navigate = useNavigate();

  const handleDeleteChats = async () => {
    try {
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Chats deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete chats.");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully.");
    } catch (error) {
      toast.error("Failed to logout.");
    }
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
