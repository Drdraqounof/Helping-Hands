import type { Metadata } from "next";
import StockPhoto from "../components/StockPhoto";
import Button from "../components/Button";
import CtaPanel from "../components/CtaPanel";
import CourseIcon from "../components/CourseIcon";
import { courses } from "../data/courses";

export const metadata: Metadata = {
  title: "Pricing | Helping Hands Solutions",
  description:
    "CPR, AED, First Aid, and BLS class pricing for individuals and groups. On-site training available.",
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function PricingPage() {
  return (
    <>
      {/* Intro */}
      <section className="mx-auto grid w-full max-w-[1800px] items-center gap-12 px-4 pb-20 pt-12 sm:px-8 lg:grid-cols-2 lg:px-12 lg:pt-32">
        <div>
          <p className="text-lg tracking-wide">CLASSES &amp; PRICING</p>
          <h1 className="mt-6 font-serif text-5xl font-bold leading-[1.1] sm:text-7xl lg:text-8xl">
            Simple pricing. Real skills.
          </h1>
          <p className="mt-10 text-2xl leading-snug sm:text-3xl">
            Pick the class that fits you or your group. We come to you or meet
            you at our training center in Trenton.
          </p>
        </div>
        <StockPhoto
          query="cpr training class"
          eager
          sizes="(min-width: 1024px) 50vw, 100vw"
          fallback={{
            src: "/images/hero-instructor.png",
            alt: "Instructor demonstrating chest compressions on a CPR manikin for two students",
            width: 1080,
            height: 802,
          }}
        />
      </section>

      {/* Course cards */}
      <section className="mx-auto w-full max-w-[1800px] px-4 pb-24 sm:px-8 lg:px-12">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {courses.map((course) => (
            <article
              key={course.id}
              id={course.id}
              className={`relative flex scroll-mt-8 flex-col rounded-lg bg-white p-8 shadow-sm ring-1 ${
                course.featured ? "ring-2 ring-accent" : "ring-black/5"
              }`}
            >
              {course.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 text-sm font-semibold">
                  Most popular
                </span>
              )}
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                <CourseIcon icon={course.icon} />
              </div>
              <h2 className="mt-6 font-serif text-3xl font-bold">{course.name}</h2>
              <p className="mt-3 text-lg leading-relaxed text-black/70">
                {course.description}
              </p>

              <div className="mt-6">
                {course.price !== null ? (
                  <p>
                    <span className="font-serif text-5xl font-bold">
                      {formatPrice(course.price)}
                    </span>
                    {course.priceNote && (
                      <span className="ml-2 text-lg text-black/60">{course.priceNote}</span>
                    )}
                  </p>
                ) : (
                  <p className="font-serif text-2xl font-bold">Contact for pricing</p>
                )}
                {course.duration && (
                  <p className="mt-1 text-black/60">{course.duration} class</p>
                )}
              </div>

              <ul className="mt-6 flex-1 space-y-3 text-lg">
                {course.includes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <svg
                      viewBox="0 0 24 24"
                      className="mt-1 h-5 w-5 shrink-0 text-brand-red"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      aria-hidden
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <Button href="/contact" className="mt-8 text-center text-lg">
                Book this class
              </Button>
            </article>
          ))}
        </div>
      </section>

      {/* Group / on-site */}
      <section className="mx-auto grid w-full max-w-[1800px] items-center gap-12 px-4 pb-24 sm:px-8 lg:grid-cols-2 lg:px-12">
        <StockPhoto
          query="first aid training group"
          sizes="(min-width: 1024px) 50vw, 100vw"
          fallback={{
            src: "/images/about-family.png",
            alt: "Family members wearing gloves practicing CPR on manikins in a living room",
            width: 1080,
            height: 1108,
          }}
        />
        <div>
          <h2 className="font-serif text-4xl font-bold leading-[1.1] sm:text-6xl">
            Training a group? We&apos;ll bring the class to you.
          </h2>
          <p className="mt-8 text-xl leading-relaxed sm:text-2xl">
            Schools, churches, businesses, community groups, and families can
            book a private class at their own location. Tell us how many people
            and which course, and we&apos;ll put together a group quote.
          </p>
          <ul className="mt-8 space-y-3 text-xl">
            <li>• Schools &amp; daycares</li>
            <li>• Churches &amp; ministries</li>
            <li>• Businesses &amp; offices</li>
            <li>• Community groups &amp; families</li>
          </ul>
          <Button href="/contact" className="mt-10">
            Get a group quote
          </Button>
        </div>
      </section>

      <CtaPanel />
    </>
  );
}
