import { NextFunction, Request, Response, Router } from "express";
import { getAllUsers, loginUser, signupUser } from "../controllers/userController";

const router = Router();

router.use((req: Request, _res: Response, next: NextFunction) => {
	console.log(`[Route] User route hit: ${req.method} ${req.originalUrl}`);
	next();
});

// Signup route.
router.post("/signup", signupUser);

// Login route.
router.post("/login", loginUser);

// Admin route to fetch all users.
router.get("/", getAllUsers);

export default router;
