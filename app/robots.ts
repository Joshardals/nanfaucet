import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/home",
        "/claim-faucet",
        "/discover-nano",
        "/faqs",
        "/privacy-policy",
        "/terms-of-service",
      ],
      disallow: [],
    },
    sitemap: "https://nanfaucet.com/sitemap.xml",
  };
}
