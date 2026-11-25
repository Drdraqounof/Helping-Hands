// Blog posts. Add a new object to publish a post (newest first).
// Each paragraph in `body` is one string. This moves to the database/admin later (see PLAN.md).

export type Post = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  excerpt: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "welcome",
    title: "Welcome to the Helping Hands blog",
    date: "2026-11-25",
    excerpt:
      "Tips, class updates, and stories about learning the skills that save lives.",
    body: [
      "Welcome to the Helping Hands Solutions blog! This is where we'll share safety tips, class updates, and stories from our trainings with schools, churches, businesses, and families.",
      "Our goal is simple: help more people feel confident stepping in when it matters most. Learning CPR, AED use, and First Aid doesn't have to be stressful. It just takes practice.",
      "Want to bring a class to your group? Reach out on our contact page and we'll help you pick the right course.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
