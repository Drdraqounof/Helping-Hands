import Button from "./Button";

export default function ComingSoon({ title }: { title: string }) {
  return (
    <section className="mx-auto w-full max-w-[1800px] px-4 py-24 sm:px-8 lg:px-12 lg:py-40">
      <h1 className="font-serif text-5xl font-bold sm:text-7xl">{title}</h1>
      <p className="mt-8 max-w-3xl text-xl sm:text-2xl">
        This page is coming soon. In the meantime, reach out and we&apos;ll help
        you find the right training for your group.
      </p>
      <Button href="/contact" className="mt-10">
        Save a Life
      </Button>
    </section>
  );
}
