import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { connectDB } from "./config/db";
import userRoutes from "./routes/userRoutes";
import contactRoutes from "./routes/contactRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Logs each incoming request at app level.
app.use((req: Request, _res: Response, next) => {
  console.log(`[APP] ${req.method} ${req.originalUrl}`);
  next();
});

// Health route to check if API is running.
app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Backend API is running" });
});

// API routes.
app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);

const startServer = async (): Promise<void> => {
  console.log("[APP] Starting server...");
  await connectDB();

  app.listen(port, () => {
    console.log(`[APP] Server is running at http://localhost:${port}`);
  });
};

startServer();
