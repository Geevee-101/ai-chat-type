import axios from "../lib/axios";

export const sendChatRequest = async (message: string) => {
  const res = await axios.post("/chats", { message });
  const messages = res.data.message;
  const lastMessage = messages[messages.length - 1];
  return lastMessage.content;
};

export const fetchUserChats = async () => {
  const res = await axios.get("/chats");
  return res.data.chats;
};

export const deleteUserChats = async () => {
  const res = await axios.delete("/chats");
  return res.data.message;
};
