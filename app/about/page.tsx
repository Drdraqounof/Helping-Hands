import type { Metadata } from "next";
import Image from "next/image";
import CtaPanel from "../components/CtaPanel";

export const metadata: Metadata = {
  title: "About | Helping Hands Solutions",
};

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto grid w-full max-w-[1800px] items-start gap-12 px-4 pb-24 pt-12 sm:px-8 lg:grid-cols-2 lg:px-12 lg:pt-32">
        <div>
          <h1 className="font-serif text-5xl font-bold leading-[1.1] sm:text-7xl lg:text-8xl">
            Training You Can Trust. Skills That Can Save a Life.
          </h1>
          <p className="mt-12 text-2xl leading-snug sm:text-4xl">
            Helping Hands Solutions LLC provides professional CPR, AED, First
            Aid, and BLS training to prepare individuals, businesses, schools,
            churches, and organizations for life&apos;s unexpected moments.
            Founded by a Licensed Practical Nurse and CPR Instructor, we bring
            real healthcare experience into every class, providing hands-on
            training that builds confidence.
          </p>
        </div>
        <Image
          src="/images/about-family.png"
          alt="Family members wearing gloves practicing CPR on manikins in a living room"
          width={1080}
          height={1108}
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-auto w-full rounded-md"
        />
      </section>

      <CtaPanel />
    </>
  );
}
