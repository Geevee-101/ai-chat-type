import { NextFunction, Request, Response } from "express";
import { openai } from "../config/openai-config.js";

export const createChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { message } = req.body;
  if (!res.locals.user) {
    return res.status(401).json({ message: "Unauthorized, not authenticated" });
  }
  const user = res.locals.user;

  const chats = user.chats;
  const userChat = {
    role: "user",
    content: message,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  chats.push(userChat);
  user.chats = chats;

  try {
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: chats,
    });

    const assistantMessage = chatResponse.choices?.[0]?.message?.content;
    if (!assistantMessage) {
      return res
        .status(500)
        .json({ message: "Failed to generate chat response" });
    }

    const assistantChat = {
      role: "assistant",
      content: assistantMessage,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    user.chats.push(assistantChat);
    await user.save();
  } catch (error: unknown) {
    const cause = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ message: "OpenAI request failed", cause });
  }

  return res.status(200).json({
    message: user.chats,
  });
};

export const getUserChats = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!res.locals.user) {
    return res
      .status(401)
      .json({ message: "Unauthorized, user not found or token invalid." });
  }
  try {
    const user = res.locals.user;
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.error("Error in getUserChats:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUserChats = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!res.locals.user) {
    return res
      .status(401)
      .json({ message: "Unauthorized, user not found or token invalid." });
  }
  try {
    const user = res.locals.user;
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "Chats deleted successfully" });
  } catch (error) {
    console.error("Error in deleteUserChats:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
