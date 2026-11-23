import Button from "./Button";

export default function CtaPanel() {
  return (
    <section className="mx-auto w-full max-w-[1800px] px-4 pb-16 sm:px-8 lg:px-12">
      <div className="rounded-lg bg-panel px-6 py-24 text-center sm:py-36">
        <h2 className="mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
          Ready to know exactly what to do in an emergency?
        </h2>
        <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed sm:text-2xl">
          We make getting certified simple — we come to you or meet you at our
          training center in Trenton. Just pick the option that works for your
          group.
        </p>
        <Button href="/contact" className="mt-12 sm:text-2xl">
          Schedule your training &amp; Save a life
        </Button>
      </div>
    </section>
  );
}
