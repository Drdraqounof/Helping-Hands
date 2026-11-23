import Link from "next/link";

export default function Button({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-block rounded-lg bg-accent px-9 py-4 text-xl text-foreground transition-colors hover:bg-accent-hover ${className}`}
    >
      {children}
    </Link>
  );
}
