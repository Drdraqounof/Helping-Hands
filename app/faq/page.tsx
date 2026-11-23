import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaPanel from "../components/CtaPanel";

export const metadata: Metadata = {
  title: "FAQ | Helping Hands Solutions",
  description:
    "Answers to common questions about CPR, AED, First Aid, and BLS classes with Helping Hands Solutions.",
};

// Answers marked REVIEW are general guidance — confirm they match how you run your classes.
const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "What classes do you offer?",
    a: "We teach CPR, AED, First Aid, and BLS (Basic Life Support) for healthcare providers. You can take a single course or combine CPR, AED, and First Aid into one class.",
  },
  {
    q: "Do you come to us, or do we come to you?",
    a: "Either one. We can bring the training to your school, church, business, or home, or you can meet us at our training center in Trenton.",
  },
  {
    q: "Who are your classes for?",
    a: "Anyone who wants to be ready to help in an emergency: individuals, families, schools, churches, businesses, community groups, and healthcare workers who need BLS.",
  },
  {
    q: "Who teaches the classes?",
    a: "Helping Hands Solutions was founded by a Licensed Practical Nurse and CPR Instructor, so every class is taught with real healthcare experience behind it.",
  },
  {
    q: "I've never done CPR before. Will I be nervous?",
    a: "That's completely normal, and it's exactly who we're here for. Our classes are calm, hands-on, and built around your real questions. Certification with no pressure, just practice. You'll leave ready, not just certified.",
  },
  {
    // REVIEW: confirm certification body and validity period.
    q: "How long is my certification good for?",
    a: "Most CPR, AED, First Aid, and BLS certifications are valid for two years. We'll let you know the details for your specific course when you book.",
  },
  {
    q: "How much does a class cost?",
    a: (
      <>
        Pricing depends on the course and the size of your group. See our{" "}
        <Link href="/pricing" className="underline hover:text-brand-red">
          pricing page
        </Link>{" "}
        or contact us for a group quote.
      </>
    ),
  },
  {
    q: "How do I schedule a class?",
    a: (
      <>
        Just{" "}
        <Link href="/contact" className="underline hover:text-brand-red">
          reach out
        </Link>{" "}
        with the course you&apos;re interested in, how many people will attend,
        and whether you&apos;d like us to come to you. We&apos;ll find a time
        that works for your group.
      </>
    ),
  },
];

export default function FaqPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-[1800px] px-4 pb-12 pt-12 sm:px-8 lg:px-12 lg:pt-32">
        <p className="text-lg tracking-wide">FREQUENTLY ASKED QUESTIONS</p>
        <h1 className="mt-6 max-w-5xl font-serif text-5xl font-bold leading-[1.1] sm:text-7xl lg:text-8xl">
          Questions? We&apos;ve got answers.
        </h1>
      </section>

      <section className="mx-auto grid w-full max-w-[1800px] items-start gap-12 px-4 pb-24 sm:px-8 lg:grid-cols-[3fr_2fr] lg:px-12">
        <div className="divide-y divide-black/10 border-y border-black/10">
          {faqs.map((item) => (
            <details key={item.q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-2xl font-semibold sm:text-3xl [&::-webkit-details-marker]:hidden">
                {item.q}
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 shrink-0 transition-transform group-open:rotate-45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <p className="mt-4 max-w-3xl text-xl leading-relaxed text-black/75">
                {item.a}
              </p>
            </details>
          ))}
        </div>

        <div className="grid gap-6 lg:sticky lg:top-8">
          <Image
            src="/images/hero-instructor.png"
            alt="Instructor demonstrating chest compressions on a CPR manikin for two students"
            width={1080}
            height={802}
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="h-auto w-full rounded-md"
          />
          <Image
            src="/images/about-family.png"
            alt="Family members wearing gloves practicing CPR on manikins in a living room"
            width={1080}
            height={1108}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="hidden h-auto w-full rounded-md lg:block"
          />
        </div>
      </section>

      <CtaPanel />
    </>
  );
}
