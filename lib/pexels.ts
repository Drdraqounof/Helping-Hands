import "server-only";
import { cacheLife } from "next/cache";

// Free stock photos from Pexels (https://www.pexels.com/api/).
// Get a free key at https://www.pexels.com/api/ and set PEXELS_API_KEY.
// Pexels asks you to credit the photographer and Pexels — StockPhoto renders that.

export type StockPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
  photographer: string;
  photographerUrl: string;
  pageUrl: string;
};

type PexelsResponse = {
  photos?: {
    width: number;
    height: number;
    url: string;
    alt: string;
    photographer: string;
    photographer_url: string;
    src: { original: string };
  }[];
};

export async function getPexelsPhoto(
  query: string,
  index = 0,
): Promise<StockPhoto | null> {
  "use cache";
  cacheLife("days");

  const key = process.env.PEXELS_API_KEY;
  if (!key) return null;

  try {
    const url = new URL("https://api.pexels.com/v1/search");
    url.searchParams.set("query", query);
    url.searchParams.set("orientation", "landscape");
    url.searchParams.set("per_page", String(index + 1));

    const res = await fetch(url, { headers: { Authorization: key } });
    if (!res.ok) {
      console.error("[pexels]", res.status, await res.text());
      return null;
    }

    const photo = ((await res.json()) as PexelsResponse).photos?.[index];
    if (!photo) return null;

    return {
      // Original keeps the true aspect ratio; Pexels resizes via query params.
      src: `${photo.src.original}?auto=compress&cs=tinysrgb&w=1600`,
      width: photo.width,
      height: photo.height,
      alt: photo.alt || query,
      photographer: photo.photographer,
      photographerUrl: photo.photographer_url,
      pageUrl: photo.url,
    };
  } catch (err) {
    console.error("[pexels]", err);
    return null;
  }
}
