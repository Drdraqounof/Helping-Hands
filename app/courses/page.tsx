import type { Metadata } from "next";
import Link from "next/link";
import Button from "../components/Button";
import CourseIcon from "../components/CourseIcon";
import CtaPanel from "../components/CtaPanel";
import { courses } from "../data/courses";

export const metadata: Metadata = {
  title: "Courses | Helping Hands Solutions",
  description: "CPR, AED, First Aid, and BLS courses for individuals, groups, and healthcare providers.",
};

export default function CoursesPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-[1800px] px-4 pb-16 pt-12 sm:px-8 lg:px-12 lg:pt-32">
        <p className="text-lg tracking-wide">OUR COURSES</p>
        <h1 className="mt-6 max-w-5xl font-serif text-5xl font-bold leading-[1.1] sm:text-7xl lg:text-8xl">
          Hands-on classes for real emergencies
        </h1>
        <p className="mt-10 max-w-4xl text-2xl leading-snug sm:text-3xl">
          Every class is calm, hands-on, and taught with real healthcare
          experience. Choose a single course or combine them.
        </p>
      </section>

      <section className="mx-auto w-full max-w-[1800px] divide-y divide-black/10 px-4 pb-24 sm:px-8 lg:px-12">
        {courses.map((course) => (
          <article key={course.id} id={course.id} className="grid scroll-mt-8 gap-8 py-12 lg:grid-cols-[1fr_2fr]">
            <div className="flex items-start gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                <CourseIcon icon={course.icon} />
              </div>
              <h2 className="font-serif text-4xl font-bold leading-tight">{course.name}</h2>
            </div>
            <div>
              <p className="text-xl leading-relaxed sm:text-2xl">{course.description}</p>
              <ul className="mt-6 grid gap-2 text-lg sm:grid-cols-2">
                {course.includes.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
              {course.duration && <p className="mt-4 text-lg text-black/60">Class length: {course.duration}</p>}
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Button href="/contact">Book this class</Button>
                <Link href={`/pricing#${course.id}`} className="text-lg underline hover:text-brand-red">
                  See pricing
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      <CtaPanel />
    </>
  );
}
