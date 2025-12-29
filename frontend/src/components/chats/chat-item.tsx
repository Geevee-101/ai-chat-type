import { useAuth } from "../../context/AuthContext";

export function ChatItem({
  role,
  content,
}: {
  role: "user" | "assistant";
  content: string;
}) {
  const auth = useAuth();
  return role === "user" ? (
    <div className="flex p-4 gap-4" style={{ backgroundColor: "#004d56" }}>
      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-medium flex-shrink-0">
        {auth?.user?.name?.slice(0, 1)}
        {auth?.user?.name?.split(" ")[1]?.slice(0, 1)}
      </div>
      <div>
        <p className="text-xl text-white">{content}</p>
      </div>
    </div>
  ) : (
    <div
      className="flex p-4 gap-4 my-4"
      style={{ backgroundColor: "#004d5612" }}
    >
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
        <img src="openai.png" alt="openai" width={30} />
      </div>
      <div>
        <p className="text-xl text-white">{content}</p>
      </div>
    </div>
  );
}

export default ChatItem;
