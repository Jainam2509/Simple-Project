import { Contact, User } from "../types";

const BASE_URL = "http://localhost:5000/api";

// Reusable helper for JSON requests.
async function request<T>(url: string, options: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data as T;
}

export const signupApi = (userData: { name: string; email: string; password: string }) => {
  return request<{ message: string; user: User }>(`${BASE_URL}/users/signup`, {
    method: "POST",
    body: JSON.stringify(userData)
  });
};

export const loginApi = (loginData: { email: string; password: string }) => {
  return request<{ message: string; user: User }>(`${BASE_URL}/users/login`, {
    method: "POST",
    body: JSON.stringify(loginData)
  });
};

export const createContactApi = (contactData: Contact) => {
  return request<{ message: string; data: Contact }>(`${BASE_URL}/contacts`, {
    method: "POST",
    body: JSON.stringify(contactData)
  });
};

export const getUsersApi = () => {
  return request<{ message: string; data: User[] }>(`${BASE_URL}/users`, {
    method: "GET"
  });
};

export const getContactsApi = () => {
  return request<{ message: string; data: Contact[] }>(`${BASE_URL}/contacts`, {
    method: "GET"
  });
};
