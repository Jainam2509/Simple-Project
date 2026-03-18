"use client";

import { FormEvent, useState } from "react";
import AppNav from "../../components/AppNav";
import { loginApi, saveLoggedInUser } from "../../lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setIsError(false);
      const result = await loginApi({ email, password });
      // Save user in localStorage for role-based UI and simple protected pages.
      saveLoggedInUser(result.user);
      setMessage(`${result.message} | Welcome, ${result.user.name} (${result.user.role})`);
    } catch (error) {
      setIsError(true);
      setMessage(error instanceof Error ? error.message : "Login failed");
    }
  };

  return (
    <main className="container">
      <div className="card">
        <h1>Login Page</h1>
        <AppNav />

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>

        {message ? <p className={`message ${isError ? "error" : ""}`}>{message}</p> : null}
      </div>
    </main>
  );
}
