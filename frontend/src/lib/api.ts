import { Contact, User } from "../types";

const BASE_URL = "http://localhost:5000/api";
const USER_STORAGE_KEY = "loggedInUser";

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

export const saveLoggedInUser = (user: User): void => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("auth-change"));
};

export const getLoggedInUser = (): User | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const savedUser = localStorage.getItem(USER_STORAGE_KEY);

  if (!savedUser) {
    return null;
  }

  try {
    return JSON.parse(savedUser) as User;
  } catch (_error) {
    return null;
  }
};

export const logoutUser = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(USER_STORAGE_KEY);
  window.dispatchEvent(new Event("auth-change"));
};

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
  const currentUser = getLoggedInUser();

  return request<{ message: string; data: User[] }>(`${BASE_URL}/users`, {
    method: "GET",
    headers: {
      "x-user-role": currentUser?.role || ""
    }
  });
};

export const getContactsApi = () => {
  const currentUser = getLoggedInUser();

  return request<{ message: string; data: Contact[] }>(`${BASE_URL}/contacts`, {
    method: "GET",
    headers: {
      "x-user-role": currentUser?.role || ""
    }
  });
};
