import type { MetadataRoute } from "next";
import { BUSINESSES } from "@/lib/businesses";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...BUSINESSES.map((b) => `/${b.slug}`), "/privacy", "/terms"];
  return paths.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path.startsWith("/privacy") || path.startsWith("/terms") ? 0.3 : 0.8,
  }));
}
