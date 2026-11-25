"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={formAction} className="mt-10 grid gap-6 rounded-lg bg-white p-8 shadow-sm ring-1 ring-black/5">
      <label className="text-lg font-semibold">
        Email
        <input
          name="email"
          type="email"
          required
          autoComplete="username"
          defaultValue={state.email}
          key={state.email}
          placeholder="you@gmail.com"
          className="mt-2 w-full rounded-md border border-black/15 bg-white px-4 py-3 text-lg outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20"
        />
      </label>
      <label className="text-lg font-semibold">
        Password
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-2 w-full rounded-md border border-black/15 bg-white px-4 py-3 text-lg outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20"
        />
      </label>
      {state.error && (
        <p role="alert" className="text-lg text-brand-red">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-accent px-9 py-4 text-xl transition-colors hover:bg-accent-hover disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Log in"}
      </button>
    </form>
  );
}
