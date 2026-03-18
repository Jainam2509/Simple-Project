import { Request, Response } from "express";
import Contact from "../models/Contact";

export const createContact = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("[Controller] createContact called");

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ message: "Name, email, and message are required." });
      return;
    }

    const contact = await Contact.create({ name, email, message });

    res.status(201).json({
      message: "Contact form submitted successfully",
      data: contact
    });
  } catch (error) {
    console.error("[Controller] createContact error", error);
    res.status(500).json({ message: "Server error while saving contact." });
  }
};

export const getAllContacts = async (_req: Request, res: Response): Promise<void> => {
  try {
    console.log("[Controller] getAllContacts called");

    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Contacts fetched successfully",
      data: contacts
    });
  } catch (error) {
    console.error("[Controller] getAllContacts error", error);
    res.status(500).json({ message: "Server error while fetching contacts." });
  }
};
