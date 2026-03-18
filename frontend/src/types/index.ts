export interface User {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role: "user" | "admin";
}

export interface Contact {
  _id?: string;
  name: string;
  email: string;
  message: string;
}
