import axios from "../lib/axios";

export const sendChatRequest = async (message: string) => {
  const res = await axios.post("/chats", { message });
  if (res.status !== 200) {
    throw new Error("Unaable to send message");
  }
  const data = res.data;
  const messages = data.message;
  const lastMessage = messages[messages.length - 1];
  return lastMessage.content;
};

export const fetchUserChats = async () => {
  const res = await axios.get("/chats");
  if (res.status !== 200) {
    throw new Error("Unable to fetch chats");
  }
  const data = res.data;
  return data.chats;
};

export const deleteUserChats = async () => {
  const res = await axios.delete("/chats");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = res.data;
  return data.message;
};
