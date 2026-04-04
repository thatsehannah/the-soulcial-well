import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://thesoulcialwell.org";

  const routes = [
    "/",
    "/about",
    "/contact",
    "/experiences",
    "/offerings",
    "/framework",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));
}
