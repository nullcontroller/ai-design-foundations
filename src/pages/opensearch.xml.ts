import type { APIRoute } from "astro";
import { absoluteUrl } from "../lib/site";

const xml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll('"', "&quot;");

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error("Astro.site is required for OpenSearch");
  const template = `${absoluteUrl(site, "search")}?q={searchTerms}`;
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">\n  <ShortName>Rosarium</ShortName>\n  <Description>Rosariumの技術知識・記事を検索</Description>\n  <InputEncoding>UTF-8</InputEncoding>\n  <Url type="text/html" method="get" template="${xml(template)}" />\n</OpenSearchDescription>\n`,
    {
      headers: {
        "Content-Type": "application/opensearchdescription+xml; charset=utf-8",
      },
    },
  );
};
