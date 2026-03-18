"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createContactApi, getLoggedInUser } from "../../lib/api";

export default function ContactPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    const currentUser = getLoggedInUser();

    if (!currentUser) {
      router.push("/login");
    }
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await createContactApi({ name, email, message });
      setResult("Message sent successfully.");

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setResult(error instanceof Error ? error.message : "Failed to send message.");
    }
  };

  return (
    <section className="card page-wrap">
      <h1>Contact</h1>
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
        <textarea
          placeholder="Message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={4}
          required
        />
        <button type="submit">Send Message</button>
      </form>
      {result ? <p>{result}</p> : null}
    </section>
  );
}
