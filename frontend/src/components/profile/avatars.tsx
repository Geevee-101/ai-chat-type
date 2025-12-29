import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";

export function UserAvatar() {
  const auth = useAuth();
  return (
    <Avatar>
      {/* <AvatarImage src={auth?.user?.image || undefined} alt="User" /> */}
      <AvatarFallback>
        {auth?.user?.name?.slice(0, 1)}
        {auth?.user?.name?.split(" ")[1]?.slice(0, 1) || "U"}
      </AvatarFallback>
    </Avatar>
  );
}

export function AIAvatar() {
  return (
    <Avatar>
      <AvatarImage src="https://via.placeholder.com/150" alt="@ai" />
      <AvatarFallback>AI</AvatarFallback>
    </Avatar>
  );
}
