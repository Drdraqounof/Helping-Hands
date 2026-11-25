import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/session";
import { logout } from "../login/actions";
import { courses } from "../data/courses";
import { posts } from "../data/posts";

export const metadata: Metadata = {
  title: "Admin | Helping Hands Solutions",
  robots: { index: false, follow: false },
};

// Low implementation: dashboard shell. Editors arrive in later phases (see PLAN.md).
const sections = [
  {
    title: "Courses & pricing",
    detail: () => `${courses.length} courses, ${courses.filter((c) => c.price === null).length} without a price`,
    editNow: "app/data/courses.ts",
    view: "/pricing",
  },
  { title: "FAQ", detail: () => "Questions and answers", editNow: "app/faq/page.tsx", view: "/faq" },
  {
    title: "Blog posts",
    detail: () => `${posts.length} published`,
    editNow: "app/data/posts.ts",
    view: "/blog",
  },
  { title: "Home & About text", detail: () => "Headings, intro text, photos", editNow: "app/page.tsx, app/about/page.tsx", view: "/" },
  { title: "Photos", detail: () => "Upload and replace images", editNow: "public/images/", view: "/" },
  { title: "Contact inquiries", detail: () => "Messages from the contact form", editNow: "Sent to CONTACT_TO_EMAIL via Resend", view: "/contact" },
];

export default function AdminPage() {
  return (
    <section className="mx-auto w-full max-w-[1800px] px-4 pb-24 pt-12 sm:px-8 lg:px-12 lg:pt-20">
      <Suspense fallback={<p className="text-xl">Checking your session…</p>}>
        <Dashboard />
      </Suspense>
    </section>
  );
}

async function Dashboard() {
  await requireAdmin();

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-lg tracking-wide">ADMIN</p>
          <h1 className="mt-3 font-serif text-5xl font-bold sm:text-6xl">Dashboard</h1>
        </div>
        <form action={logout}>
          <button type="submit" className="rounded-lg border border-black/20 px-6 py-3 text-lg hover:bg-panel">
            Log out
          </button>
        </form>
      </div>

      <p className="mt-6 max-w-3xl text-lg text-black/70">
        Editing from this page is coming soon. Until then, each section shows
        where its content lives in the code.
      </p>

      <ul className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {sections.map((s) => (
          <li key={s.title} className="flex flex-col rounded-lg bg-white p-8 shadow-sm ring-1 ring-black/5">
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-serif text-2xl font-bold">{s.title}</h2>
              <span className="shrink-0 rounded-full bg-panel px-3 py-1 text-sm">Editor coming soon</span>
            </div>
            <p className="mt-3 text-lg">{s.detail()}</p>
            <p className="mt-2 flex-1 text-sm text-black/60">
              For now: <code>{s.editNow}</code>
            </p>
            <Link href={s.view} className="mt-6 text-lg underline hover:text-brand-red">
              View on site
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
