import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined in environment variables.");
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("[DB] MongoDB connected successfully");
  } catch (error) {
    console.error("[DB] MongoDB connection failed", error);
    process.exit(1);
  }
};
