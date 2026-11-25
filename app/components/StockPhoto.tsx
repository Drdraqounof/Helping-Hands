import Image from "next/image";
import { getPexelsPhoto } from "@/lib/pexels";

type Fallback = { src: string; width: number; height: number; alt: string };

// Shows a Pexels photo for `query` (with the required credit line).
// Falls back to a local photo when PEXELS_API_KEY is unset or the API fails.
export default async function StockPhoto({
  query,
  index = 0,
  fallback,
  sizes,
  eager = false,
  className = "",
}: {
  query: string;
  index?: number;
  fallback: Fallback;
  sizes: string;
  eager?: boolean;
  className?: string;
}) {
  const photo = await getPexelsPhoto(query, index);
  const img = photo ?? fallback;

  return (
    <figure className={className}>
      <Image
        src={img.src}
        alt={img.alt}
        width={img.width}
        height={img.height}
        sizes={sizes}
        {...(eager ? { loading: "eager" as const, fetchPriority: "high" as const } : {})}
        className="h-auto w-full rounded-md"
      />
      {photo && (
        <figcaption className="mt-2 text-sm text-black/60">
          Photo by{" "}
          <a href={photo.photographerUrl} target="_blank" rel="noopener noreferrer" className="underline">
            {photo.photographer}
          </a>{" "}
          on{" "}
          <a href={photo.pageUrl} target="_blank" rel="noopener noreferrer" className="underline">
            Pexels
          </a>
        </figcaption>
      )}
    </figure>
  );
}
