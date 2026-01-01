import User from "../models/User.js";
import { hash } from "bcrypt";

const defaultUsers = [
  {
    name: "Shinji Ikari",
    email: "shinji@nerv.com",
    password: "123456",
  },
];

const shinjiDefaultChats = [
  { role: "user", content: "Hello, World!" },
  {
    role: "assistant",
    content: "Hello! How can I assist you today?",
  },
];

export const resetDatabase = async (req, res) => {
  try {
    // Delete everything first
    await User.deleteMany({});
    console.log("All users deleted successfully.");

    // Create default users and add default chats
    await Promise.all(
      defaultUsers.map(async (userData) => {
        const hashedPassword = await hash(userData.password, 10);
        await User.create({
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          chats: shinjiDefaultChats,
        });
        console.log(`Created user: ${userData.name}`);
      }),
    );

    res.status(200).json({ message: "Database reset successful." });
  } catch (error) {
    console.log("Error in resetDatabase:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
