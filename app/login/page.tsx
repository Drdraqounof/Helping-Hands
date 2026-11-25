import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin login | Helping Hands Solutions",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <section className="mx-auto w-full max-w-lg px-4 pb-24 pt-12 sm:px-8 lg:pt-24">
      <h1 className="font-serif text-5xl font-bold">Admin login</h1>
      <p className="mt-4 text-xl text-black/70">For site staff only.</p>
      <LoginForm />
    </section>
  );
}
