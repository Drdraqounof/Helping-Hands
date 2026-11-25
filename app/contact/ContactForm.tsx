"use client";

import { useActionState } from "react";
import { sendContact, type ContactState } from "./actions";
import { courses } from "../data/courses";

const initialState: ContactState = { status: "idle" };

const inputClass =
  "mt-2 w-full rounded-md border border-black/15 bg-white px-4 py-3 text-lg outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, initialState);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-lg bg-white p-10 text-xl shadow-sm ring-1 ring-black/5">
        <p className="font-serif text-3xl font-bold">Message sent</p>
        <p className="mt-4">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-6 rounded-lg bg-white p-8 shadow-sm ring-1 ring-black/5 sm:grid-cols-2">
      {/* Honeypot */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <label className="text-lg font-semibold">
        Name *
        <input name="name" required className={inputClass} autoComplete="name" />
        {state.errors?.name && <span className="mt-1 block text-base font-normal text-brand-red">{state.errors.name}</span>}
      </label>
      <label className="text-lg font-semibold">
        Email *
        <input name="email" type="email" required className={inputClass} autoComplete="email" />
        {state.errors?.email && <span className="mt-1 block text-base font-normal text-brand-red">{state.errors.email}</span>}
      </label>
      <label className="text-lg font-semibold">
        Phone
        <input name="phone" type="tel" className={inputClass} autoComplete="tel" />
      </label>
      <label className="text-lg font-semibold">
        Organization
        <input name="organization" className={inputClass} autoComplete="organization" />
      </label>
      <label className="text-lg font-semibold">
        Course
        <select name="course" className={inputClass} defaultValue="">
          <option value="">Not sure yet</option>
          {courses.map((c) => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </select>
      </label>
      <label className="text-lg font-semibold">
        Group size
        <input name="groupSize" type="number" min={1} className={inputClass} />
      </label>
      <fieldset className="text-lg font-semibold sm:col-span-2">
        <legend>Where would you like the class?</legend>
        <div className="mt-2 flex flex-wrap gap-6 font-normal">
          <label className="flex items-center gap-2">
            <input type="radio" name="location" value="On-site (come to us)" defaultChecked /> Come to us
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="location" value="Trenton training center" /> Trenton training center
          </label>
        </div>
      </fieldset>
      <label className="text-lg font-semibold sm:col-span-2">
        Message *
        <textarea name="message" required rows={5} className={inputClass} placeholder="Preferred dates, questions, anything we should know" />
        {state.errors?.message && <span className="mt-1 block text-base font-normal text-brand-red">{state.errors.message}</span>}
      </label>

      {state.status === "error" && state.message && (
        <p role="alert" className="text-lg text-brand-red sm:col-span-2">{state.message}</p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-accent px-9 py-4 text-xl transition-colors hover:bg-accent-hover disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
