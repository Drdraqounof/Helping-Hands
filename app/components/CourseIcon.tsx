import type { Course } from "../data/courses";

export default function CourseIcon({ icon }: { icon: Course["icon"] }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "h-8 w-8",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (icon) {
    case "heart":
      return (
        <svg {...common}>
          <path d="M12 21C6 16.5 2.5 13 2.5 8.6 2.5 5.7 4.8 3.5 7.6 3.5c1.8 0 3.4.9 4.4 2.4 1-1.5 2.6-2.4 4.4-2.4 2.8 0 5.1 2.2 5.1 5.1C21.5 13 18 16.5 12 21z" />
        </svg>
      );
    case "cross":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      );
    case "aed":
      return (
        <svg {...common}>
          <path d="M12 21C6 16.5 2.5 13 2.5 8.6 2.5 5.7 4.8 3.5 7.6 3.5c1.8 0 3.4.9 4.4 2.4 1-1.5 2.6-2.4 4.4-2.4 2.8 0 5.1 2.2 5.1 5.1C21.5 13 18 16.5 12 21z" />
          <path d="M13 7l-3 5h4l-3 5" />
        </svg>
      );
    case "pulse":
      return (
        <svg {...common}>
          <path d="M2 12h4l2-5 4 10 2-5h8" />
        </svg>
      );
  }
}
