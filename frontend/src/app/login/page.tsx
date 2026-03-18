"use client";

import { KeyboardEvent, useState } from "react";
import { loginApi, saveLoggedInUser } from "../../lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      const result = await loginApi({ email, password });
      saveLoggedInUser(result.user);
      router.push(result.user.role === "admin" ? "/admin" : "/");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed");
    }
  };

  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      void handleLogin();
    }
  };

  return (
    <section className="card page-wrap">
      <h1>Login</h1>
      <div className="form-grid">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onKeyDown={handleEnter}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onKeyDown={handleEnter}
          required
        />
        <button type="button" onClick={() => void handleLogin()}>
          Login
        </button>
      </div>
      {error ? <p className="error-text">{error}</p> : null}
    </section>
  );
}
