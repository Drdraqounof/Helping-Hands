import Image from "next/image";
import CtaPanel from "./components/CtaPanel";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid w-full max-w-[1800px] items-start gap-12 px-4 pb-24 pt-12 sm:px-8 lg:grid-cols-2 lg:px-12 lg:pt-40">
        <div>
          <p className="flex flex-wrap items-center gap-x-2 text-lg tracking-wide">
            <span>CPR • FIRST AID • AED TRAINING</span>
            <span aria-hidden className="text-[#e8436b]">❤</span>
            <span>Helping Hands, loving hearts, real skills.</span>
          </p>
          <h1 className="mt-6 font-serif text-6xl font-bold leading-[1.05] sm:text-7xl lg:text-8xl">
            Helping Hands Solutions
          </h1>
          <p className="mt-12 text-2xl leading-snug sm:text-4xl">
            We provide high-quality CPR, BLS, First Aid, and AED training for
            schools, churches, businesses, and community groups. We bring the
            training to you, empowering individuals and organizations with the
            confidence and skills to respond when it matters most.
          </p>
        </div>
        <Image
          src="/images/hero-instructor.png"
          alt="Helping Hands Solutions instructor demonstrating chest compressions on a CPR manikin for two students"
          width={1080}
          height={802}
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-auto w-full rounded-md"
        />
      </section>

      {/* No pressure */}
      <section className="mx-auto w-full max-w-[1800px] px-4 py-24 sm:px-8 lg:px-12">
        <div className="max-w-5xl">
          <h2 className="font-serif text-5xl font-bold leading-[1.1] sm:text-7xl lg:text-8xl">
            Certification with no pressure, just practice
          </h2>
          <p className="mt-12 text-xl leading-relaxed sm:text-3xl sm:leading-snug">
            We don&apos;t believe learning to save a life should feel like a
            test. Our classes are calm, hands-on, and built around real
            questions. You&apos;ll leave ready, not just certified.
          </p>
        </div>
      </section>

      <CtaPanel />
    </>
  );
}
