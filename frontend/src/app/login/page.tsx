"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { loginApi } from "../../lib/api";

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
        <nav>
          <Link href="/">Home</Link>
          <Link href="/signup">Signup</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href="/admin">Admin Dashboard</Link>
        </nav>

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
