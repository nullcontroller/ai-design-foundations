import { feedAuthor, publicationFeedEntries } from "./feed";
import { absoluteUrl } from "./site";

const escapeXml = (value: string) =>
  value.replace(
    /[<>&'\"]/g,
    (character) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '\"': "&quot;",
      })[character]!,
  );

export async function createRssResponse(site: URL) {
  const entries = await publicationFeedEntries();
  const channelUrl = absoluteUrl(site, "articles");
  const feedUrl = absoluteUrl(site, "feed.xml");
  const items = entries
    .map((entry) => {
      const link = absoluteUrl(site, entry.id);
      const date = entry.activityAt
        ? new Date(entry.activityAt).toUTCString()
        : undefined;
      const description = `${entry.updateLabel}: ${entry.updateNote ?? entry.summary}`;
      const guid = entry.activityAt
        ? `${link}#growth-${entry.activityAt}`
        : link;
      return [
        "    <item>",
        `      <title>${escapeXml(entry.title)}</title>`,
        `      <description>${escapeXml(description)}</description>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid isPermaLink="false">${escapeXml(guid)}</guid>`,
        `      <dc:creator>${escapeXml(feedAuthor.name)}</dc:creator>`,
        ...entry.topics.map(
          (topic) => `      <category>${escapeXml(topic)}</category>`,
        ),
        date && date !== "Invalid Date"
          ? `      <pubDate>${date}</pubDate>`
          : "",
        entry.updatedAt
          ? `      <atom:updated>${escapeXml(entry.updatedAt)}</atom:updated>`
          : "",
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/"><channel>\n    <title>Rosarium | Articles</title>\n    <description>Applied AI、システム設計、実務事例と論考</description>\n    <link>${escapeXml(channelUrl)}</link>\n    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />\n    <language>ja</language>\n${items}\n  </channel></rss>\n`,
    { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } },
  );
}
