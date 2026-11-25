import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact | Helping Hands Solutions",
  description: "Schedule CPR, AED, First Aid, or BLS training for yourself or your group.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto grid w-full max-w-[1800px] items-start gap-12 px-4 pb-24 pt-12 sm:px-8 lg:grid-cols-[2fr_3fr] lg:px-12 lg:pt-32">
      <div>
        <p className="text-lg tracking-wide">CONTACT US</p>
        <h1 className="mt-6 font-serif text-5xl font-bold leading-[1.1] sm:text-7xl">
          Schedule your training
        </h1>
        <p className="mt-8 text-xl leading-relaxed sm:text-2xl">
          Tell us about your group and we&apos;ll get back to you to set a date.
          We come to you or meet you at our training center in Trenton.
        </p>
      </div>
      <ContactForm />
    </section>
  );
}
