import type { Metadata } from "next";
import Link from "next/link";
import { posts, formatDate } from "../data/posts";

export const metadata: Metadata = {
  title: "Blog | Helping Hands Solutions",
  description: "Safety tips, class updates, and stories from Helping Hands Solutions.",
};

export default function BlogPage() {
  return (
    <section className="mx-auto w-full max-w-[1800px] px-4 pb-24 pt-12 sm:px-8 lg:px-12 lg:pt-32">
      <p className="text-lg tracking-wide">BLOG</p>
      <h1 className="mt-6 font-serif text-5xl font-bold leading-[1.1] sm:text-7xl lg:text-8xl">
        News &amp; safety tips
      </h1>

      {posts.length === 0 ? (
        <p className="mt-12 text-2xl">No posts yet. Check back soon!</p>
      ) : (
        <ul className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block h-full rounded-lg bg-white p-8 shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md"
              >
                <time dateTime={post.date} className="text-black/60">
                  {formatDate(post.date)}
                </time>
                <h2 className="mt-3 font-serif text-3xl font-bold">{post.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-black/75">{post.excerpt}</p>
                <span className="mt-6 inline-block text-lg underline">Read more</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
