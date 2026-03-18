import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/db";
import User from "./models/User";

dotenv.config();

const seedAdmin = async (): Promise<void> => {
  try {
    console.log("[Seed] Starting admin seed...");

    await connectDB();

    const existingAdmin = await User.findOne({ email: "admin@example.com" });

    if (existingAdmin) {
      console.log("[Seed] Admin user already exists. No changes made.");
      await mongoose.connection.close();
      process.exit(0);
    }

    await User.create({
      name: "Default Admin",
      email: "admin@example.com",
      password: "admin123",
      role: "admin"
    });

    console.log("[Seed] Default admin created successfully.");
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("[Seed] Failed to seed admin", error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedAdmin();
