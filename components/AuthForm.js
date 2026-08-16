"use client";

import { useState } from "react";

export default function AuthForm({ mode, onSubmit, submitting }) {
  const isSignup = mode === "signup";
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (isSignup && name.trim().length < 2) {
      setError("Enter your name.");
      return;
    }
    if (username.trim().length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    const result = onSubmit(
      isSignup ? { name, username, password } : { username, password }
    );

    if (result && result.ok === false) {
      setError(result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {isSignup && (
        <Field label="Full name" htmlFor="name">
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ada Lovelace"
            className="input"
            autoComplete="name"
          />
        </Field>
      )}

      <Field label="Username" htmlFor="username">
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="ada"
          className="input"
          autoComplete="username"
        />
      </Field>

      <Field label="Password" htmlFor="password">
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="input"
          autoComplete={isSignup ? "new-password" : "current-password"}
        />
      </Field>

      {error && (
        <p className="text-sm text-rust bg-rust-light border border-rust/20 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-ink text-paper font-medium rounded-md py-3 hover:bg-ink-soft transition-colors disabled:opacity-60"
      >
        {submitting
          ? "Please wait…"
          : isSignup
          ? "Create account"
          : "Log in"}
      </button>

      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid var(--line);
          background: white;
          border-radius: 0.5rem;
          padding: 0.65rem 0.85rem;
          font-size: 0.925rem;
          color: var(--ink);
        }
        .input:focus {
          outline: 2px solid var(--brass);
          outline-offset: 1px;
          border-color: var(--brass);
        }
      `}</style>
    </form>
  );
}

function Field({ label, htmlFor, children }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-ink-soft">
        {label}
      </label>
      {children}
    </div>
  );
}
