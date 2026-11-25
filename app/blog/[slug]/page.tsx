import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost, formatDate } from "../../data/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post
    ? { title: `${post.title} | Helping Hands Solutions`, description: post.excerpt }
    : {};
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <article className="mx-auto w-full max-w-3xl px-4 pb-24 pt-12 sm:px-8 lg:pt-24">
      <Link href="/blog" className="text-lg underline hover:text-brand-red">
        ← All posts
      </Link>
      <time dateTime={post.date} className="mt-10 block text-black/60">
        {formatDate(post.date)}
      </time>
      <h1 className="mt-3 font-serif text-5xl font-bold leading-[1.1] sm:text-6xl">{post.title}</h1>
      <div className="mt-10 space-y-6 text-xl leading-relaxed">
        {post.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </article>
  );
}
