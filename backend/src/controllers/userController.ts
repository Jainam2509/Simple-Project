import { Request, Response } from "express";
import User from "../models/User";

export const signupUser = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("[Controller] signupUser called");

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: "Name, email, and password are required." });
      return;
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: "Email already exists." });
      return;
    }

    const user = await User.create({
      name,
      email,
      password,
      role: "user"
    });

    res.status(201).json({
      message: "Signup successful",
      user
    });
  } catch (error) {
    console.error("[Controller] signupUser error", error);
    res.status(500).json({ message: "Server error during signup." });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("[Controller] loginUser called");

    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required." });
      return;
    }

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }

    res.status(200).json({
      message: "Login successful",
      user
    });
  } catch (error) {
    console.error("[Controller] loginUser error", error);
    res.status(500).json({ message: "Server error during login." });
  }
};

export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    console.log("[Controller] getAllUsers called");

    const users = await User.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Users fetched successfully",
      data: users
    });
  } catch (error) {
    console.error("[Controller] getAllUsers error", error);
    res.status(500).json({ message: "Server error while fetching users." });
  }
};
