"use client";

import { FormEvent, useState } from "react";
import AppNav from "../../components/AppNav";
import { createContactApi } from "../../lib/api";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setIsError(false);

      // This demonstrates the frontend -> backend contact API call.
      const result = await createContactApi({ name, email, message });
      setStatusMessage(result.message);

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setIsError(true);
      setStatusMessage(error instanceof Error ? error.message : "Contact form submission failed");
    }
  };

  return (
    <main className="container">
      <div className="card">
        <h1>Contact Us Page</h1>
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
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <button type="submit">Send Message</button>
        </form>

        {statusMessage ? (
          <p className={`message ${isError ? "error" : ""}`}>{statusMessage}</p>
        ) : null}
      </div>
    </main>
  );
}
