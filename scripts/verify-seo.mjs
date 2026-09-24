import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { load } from "cheerio";

const walk = (directory) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
const htmlFiles = walk("dist").filter((name) => name.endsWith(".html"));
const titles = new Map();
const canonicals = new Map();
const descriptions = new Map();
let articleCount = 0;
const indexable = [];

for (const file of htmlFiles) {
  const $ = load(fs.readFileSync(file, "utf8"));
  const title = $("title").text().trim();
  const description = $('meta[name="description"]').attr("content")?.trim();
  const canonical = $('link[rel="canonical"]').attr("href");
  const robots = $('meta[name="robots"]').attr("content");
  assert.ok(title, `Missing title: ${file}`);
  assert.ok(description, `Missing description: ${file}`);
  assert.ok(
    canonical?.startsWith(
      "https://nullcontroller.github.io/ai-design-foundations/",
    ),
    `Invalid canonical: ${file}`,
  );
  assert.ok(robots, `Missing robots metadata: ${file}`);
  assert.equal(
    $('meta[property="og:url"]').attr("content"),
    canonical,
    `OG URL mismatch: ${file}`,
  );
  for (const selector of [
    'meta[property="og:title"]',
    'meta[property="og:description"]',
    'meta[property="og:type"]',
    'meta[property="og:image"]',
    'meta[name="twitter:title"]',
    'meta[name="twitter:description"]',
    'meta[name="twitter:image"]',
  ])
    assert.ok($(selector).attr("content"), `Missing ${selector}: ${file}`);

  assert.ok(
    !titles.has(title),
    `Duplicate title: ${title} (${file}, ${titles.get(title)})`,
  );
  titles.set(title, file);
  descriptions.set(description, [
    ...(descriptions.get(description) || []),
    file,
  ]);
  if (!robots.includes("noindex")) {
    assert.ok(
      !canonicals.has(canonical),
      `Duplicate canonical: ${canonical} (${file}, ${canonicals.get(canonical)})`,
    );
    canonicals.set(canonical, file);
    indexable.push(canonical);
  }

  const scripts = $('script[type="application/ld+json"]');
  assert.equal(scripts.length, 1, `Expected one JSON-LD graph: ${file}`);
  const graph = JSON.parse(scripts.text());
  assert.equal(
    graph["@context"],
    "https://schema.org",
    `Invalid JSON-LD context: ${file}`,
  );
  assert.ok(
    graph["@graph"].some(
      (item) => item["@type"] === "WebSite" && item.name === "Rosarium",
    ),
    `Rosarium WebSite JSON-LD missing: ${file}`,
  );
  const page = graph["@graph"].find((item) => item.url === canonical);
  assert.ok(page, `Page JSON-LD missing: ${file}`);
  if (page["@type"] === "TechArticle") {
    articleCount++;
    assert.ok(page.headline, `TechArticle headline missing: ${file}`);
    assert.ok(
      graph["@graph"].some((item) => item["@type"] === "BreadcrumbList"),
      `Article breadcrumb JSON-LD missing: ${file}`,
    );
  }
}

const sitemap = fs.readFileSync("dist/sitemap.xml", "utf8");
const sitemapUrls = new Set(
  [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]),
);
for (const canonical of indexable)
  assert.ok(
    sitemapUrls.has(canonical),
    `Indexable canonical missing from sitemap: ${canonical}`,
  );
for (const route of ["about/", "search/", "404.html"])
  assert.ok(
    !sitemap.includes(`/ai-design-foundations/${route}`),
    `Sitemap contains noindex route: ${route}`,
  );
assert.ok(sitemap.startsWith('<?xml version="1.0"'), "Invalid sitemap XML");

const search = load(fs.readFileSync("dist/search/index.html", "utf8"));
const about = load(fs.readFileSync("dist/about/index.html", "utf8"));
const notFound = load(fs.readFileSync("dist/404.html", "utf8"));
assert.match(search('meta[name="robots"]').attr("content") || "", /noindex/);
assert.match(about('meta[name="robots"]').attr("content") || "", /noindex/);
assert.match(notFound('meta[name="robots"]').attr("content") || "", /noindex/);

const robotsFile = fs.readFileSync("dist/robots.txt", "utf8");
assert.match(robotsFile, /User-agent: \*/);
assert.match(robotsFile, /Allow: \//);
assert.match(
  robotsFile,
  /Sitemap: https:\/\/nullcontroller\.github\.io\/ai-design-foundations\/sitemap\.xml/,
);

for (const name of ["feed.xml", "rss.xml"]) {
  const rss = fs.readFileSync(`dist/${name}`, "utf8");
  assert.ok(rss.includes('<rss version="2.0"'), `Invalid RSS: ${name}`);
  assert.ok((rss.match(/<item>/g) ?? []).length >= 10, `RSS count: ${name}`);
  assert.ok(
    rss.includes("<dc:creator>立林 裕太朗</dc:creator>"),
    `RSS author: ${name}`,
  );
  assert.ok(rss.includes("<category>"), `RSS categories: ${name}`);
}
const jsonFeed = JSON.parse(fs.readFileSync("dist/feed.json", "utf8"));
assert.equal(jsonFeed.version, "https://jsonfeed.org/version/1.1");
assert.ok(jsonFeed.items.length >= 10, "JSON Feed count");
assert.equal(jsonFeed.authors[0].name, "立林 裕太朗");

assert.match(
  fs.readFileSync("dist/opensearch.xml", "utf8"),
  /\?search=1&amp;q=\{searchTerms\}/,
);
assert.match(fs.readFileSync("dist/llms.txt", "utf8"), /^# Rosarium/m);

const repeatedDescriptions = [...descriptions.values()].filter(
  (files) => files.length > 1,
);
const incoming = new Map(indexable.map((canonical) => [canonical, 0]));
for (const file of htmlFiles) {
  const $ = load(fs.readFileSync(file, "utf8"));
  const source = $('link[rel="canonical"]').attr("href");
  for (const element of $("a[href]").toArray()) {
    const href = $(element).attr("href");
    if (!href || !source) continue;
    const target = new URL(href, source);
    const canonicalTarget = target.origin + target.pathname;
    if (incoming.has(canonicalTarget))
      incoming.set(canonicalTarget, incoming.get(canonicalTarget) + 1);
  }
}
const orphans = [...incoming].filter(([, count]) => count === 0);
assert.deepEqual(
  orphans,
  [],
  `Indexable orphan pages: ${orphans.map(([pageUrl]) => pageUrl).join(", ")}`,
);
console.log(
  `SEO audit: ${htmlFiles.length} HTML pages, ${articleCount} TechArticles, ${sitemapUrls.size} sitemap URLs, no indexable orphans, RSS/JSON Feed/robots/OpenSearch/llms.txt verified. ${repeatedDescriptions.length} shared description group(s) retained where context is equivalent.`,
);
