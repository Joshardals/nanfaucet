export default async function sitemap() {
  const baseUrl = "https://nanfaucet.com";
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/home`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/claim-faucet`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/discover-nano`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
    },
  ];
}
