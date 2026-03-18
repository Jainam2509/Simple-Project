import { NextFunction, Request, Response } from "express";

export const checkAdminRole = (req: Request, res: Response, next: NextFunction): void => {
  const userRole = req.header("x-user-role");

  console.log(`[Middleware] checkAdminRole called with role: ${userRole || "none"}`);

  if (userRole !== "admin") {
    res.status(403).json({ message: "Access denied. Admin role required." });
    return;
  }

  next();
};
