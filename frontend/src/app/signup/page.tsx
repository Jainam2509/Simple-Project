"use client";

import { FormEvent, useState } from "react";
import { signupApi } from "../../lib/api";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      await signupApi({ name, email, password });
      router.push("/login");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Signup failed");
    }
  };

  return (
    <section className="card page-wrap">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit} className="form-grid">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>
      {error ? <p className="error-text">{error}</p> : null}
    </section>
  );
}
