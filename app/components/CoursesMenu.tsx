"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const courses = [
  { href: "/pricing#cpr-aed", label: "CPR & AED" },
  { href: "/pricing#first-aid", label: "First Aid" },
  { href: "/pricing#bls", label: "BLS for Healthcare Providers" },
];

export default function CoursesMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-3 hover:text-brand-red"
      >
        Courses
        <svg
          viewBox="0 0 24 24"
          className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <ul className="absolute left-0 top-full z-20 mt-3 min-w-64 rounded-lg bg-white py-2 text-lg shadow-lg ring-1 ring-black/5">
          {courses.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                onClick={() => setOpen(false)}
                className="block px-5 py-2 hover:bg-panel"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
