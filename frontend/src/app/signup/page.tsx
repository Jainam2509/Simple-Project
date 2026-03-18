"use client";

import { FormEvent, useState } from "react";
import AppNav from "../../components/AppNav";
import { signupApi } from "../../lib/api";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setIsError(false);
      const result = await signupApi({ name, email, password });
      setMessage(result.message);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setIsError(true);
      setMessage(error instanceof Error ? error.message : "Signup failed");
    }
  };

  return (
    <main className="container">
      <div className="card">
        <h1>Signup Page</h1>
        <AppNav />

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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

          <button type="submit">Create Account</button>
        </form>

        {message ? <p className={`message ${isError ? "error" : ""}`}>{message}</p> : null}
      </div>
    </main>
  );
}
