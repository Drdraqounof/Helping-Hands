import Link from "next/link";
import Logo from "./Logo";
import CoursesMenu from "./CoursesMenu";
import Button from "./Button";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
];

export default function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-[1800px] items-center gap-6 px-4 py-6 sm:px-8 lg:px-12">
      <Link href="/" className="shrink-0" aria-label="Helping Hands Solutions home">
        <Logo className="h-16 w-auto sm:h-20" />
      </Link>

      <span aria-hidden className="hidden h-8 w-px bg-foreground lg:block" />

      <nav className="hidden flex-1 items-center gap-8 text-xl lg:flex">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-brand-red">
            {link.label}
          </Link>
        ))}
        <CoursesMenu />
      </nav>

      <div className="ml-auto flex items-center gap-6">
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="hover:text-brand-red"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
            <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z" />
          </svg>
        </a>
        <Button href="/contact">Save a Life</Button>
      </div>
    </header>
  );
}
