import { NextFunction, Request, Response, Router } from "express";
import { createContact, getAllContacts } from "../controllers/contactController";

const router = Router();

router.use((req: Request, _res: Response, next: NextFunction) => {
	console.log(`[Route] Contact route hit: ${req.method} ${req.originalUrl}`);
	next();
});

// Contact form submit route.
router.post("/", createContact);

// Admin route to fetch all contacts.
router.get("/", getAllContacts);

export default router;
