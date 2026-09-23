import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import YAML from "yaml";
import { load } from "cheerio";
const walk = (d) =>
  fs
    .readdirSync(d, { withFileTypes: true })
    .flatMap((e) =>
      e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)],
    );
const entries = new Map(
  walk("src/content")
    .filter((p) => p.endsWith(".md"))
    .map((p) => {
      const source = fs.readFileSync(p, "utf8");
      const data = YAML.parse(source.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1]);
      return [
        path
          .relative("src/content", p)
          .replaceAll("\\", "/")
          .replace(/\.md$/, ""),
        data,
      ];
    }),
);
let links = 0;
for (const p of walk("dist").filter((p) => p.endsWith(".html"))) {
  const $ = load(fs.readFileSync(p, "utf8"));
  $("[data-content-id]").each((_, el) => {
    const node = $(el),
      d = entries.get(node.attr("data-content-id"));
    assert(d, p);
    assert.equal(node.find(".content-summary").text(), d.summary, p);
    assert.equal(node.find(".content-title").text(), d.title, p);
    assert(node.find(".meta").text().trim(), p);
    links++;
  });
}
for (const [id, d] of entries) {
  if (d.status === "draft" || d.public === false) continue;
  const route = id === "career/overview" ? "career" : id;
  const $ = load(fs.readFileSync("dist/" + route + "/index.html", "utf8"));
  assert.equal(
    $('[data-pagefind-meta="summary"]').text().trim(),
    d.summary,
    id,
  );
  for (const key of ["title", "category", "status"])
    assert(
      $('[data-pagefind-meta="' + key + '"]')
        .text()
        .trim(),
      id + " " + key,
    );
}
const career = load(fs.readFileSync("dist/career/index.html", "utf8"));
assert.equal(career("h1").text(), "Career — 立林 裕太朗");
assert(career('a[href="/ai-design-foundations/career/profile/"]').length);
console.log(
  `Verified ${entries.size} summaries/search metadata, ${links} content links and Career profile.`,
);

// Phase 3 information architecture invariants.
const page = (id) =>
  load(fs.readFileSync("dist/" + id + "/index.html", "utf8"));
const top = page("");
assert.deepEqual(
  top(".sidebar nav a .nav-copy > span")
    .map((_, e) => top(e).text())
    .get(),
  [
    "Home",
    "About",
    "Career",
    "全体目次",
    "読む",
    "Case Studies",
    "AI Design",
    "AI数学論",
    "Practices",
    "Reference",
  ],
);
assert.deepEqual(
  top(".header-primary a")
    .map((_, e) => top(e).text().trim())
    .get(),
  ["読む", "事例", "Career", "About"],
);
assert.deepEqual(
  top(".header-actions a")
    .map((_, e) => top(e).text().trim())
    .get(),
  ["検索"],
);
assert(!top(".sidebar summary").text().includes("設計体系"));
for (const secondary of ["詳細職務経歴", "Books", "連載", "Essays"])
  assert(!top(".sidebar nav a .nav-copy > span").text().includes(secondary), secondary);
assert.equal(top('.sidebar [class^="nav-icon-"]').length, 10);
assert.equal(
  new Set(
    top('.sidebar [class^="nav-icon-"]')
      .map((_, e) => top(e).attr("class"))
      .get(),
  ).size,
  10,
);
assert(career('a[href="/ai-design-foundations/career/profile/"]').length);
const primaryIds = ($) =>
  $("[data-primary-index] [data-content-id]")
    .map((_, e) => $(e).attr("data-content-id"))
    .get();
const design = page("ai-design");
assert.deepEqual(
  new Set(primaryIds(design)),
  new Set(
    [...entries].filter(([, d]) => d.layer === "ai-design").map(([id]) => id),
  ),
);
for (const id of primaryIds(design))
  assert.notEqual(entries.get(id).source?.type, "zenn");
for (const topic of [
  "applicability",
  "responsibility-control",
  "architecture",
  "knowledge-context",
  "evaluation-hitl",
  "software-engineering",
  "lifecycle-operations",
]) {
  const $ = page("ai-design/" + topic);
  assert(primaryIds($).length);
  for (const id of primaryIds($)) {
    assert.equal(entries.get(id).layer, "ai-design");
    assert.equal(entries.get(id).design_topic, topic);
  }
  assert($("[data-related-publications] .publication-entry").length);
}
for (const [id, d] of entries) {
  if (d.layer === "ai-design")
    assert(
      page(id)("[data-related-publications] .publication-entry").length,
      id,
    );
}
for (const [route, layer] of [
  ["ai-mathematics", "ai-mathematics"],
  ["practices", "practice"],
  ["reference", "reference"],
]) {
  const $ = page(route);
  assert(primaryIds($).length);
  for (const id of primaryIds($)) assert.equal(entries.get(id).layer, layer);
}
const pubs = page("articles");
assert.deepEqual(
  top(".use-case-index [data-use-case]")
    .map((_, e) => top(e).attr("data-use-case"))
    .get(),
  [
    "ai-adoption",
    "natural-language-services",
    "software-engineering",
    "understand-ai",
    "case-studies",
  ],
);
assert.deepEqual(
  pubs("[data-use-case-section]")
    .map((_, e) => pubs(e).attr("data-use-case-section"))
    .get(),
  [
    "ai-adoption",
    "natural-language-services",
    "software-engineering",
    "understand-ai",
    "case-studies",
    "career-work",
  ],
);
for (const route of ["books", "series", "essays"])
  assert(pubs(`a[href="/ai-design-foundations/${route}/"]`).length, route);
const publicationIds = pubs("[data-publication] [data-content-id]")
  .map((_, e) => pubs(e).attr("data-content-id"))
  .get();
for (const [id, d] of entries)
  if (
    d.public !== false &&
    d.status !== "draft" &&
    ["article", "book"].includes(d.source?.original_type)
  )
    assert(publicationIds.includes(id), "Missing publication " + id);
assert.equal(new Set(publicationIds).size, publicationIds.length);
for (const id of publicationIds) {
  const node = pubs('[data-content-id="' + id + '"]');
  const item = node.closest("[data-publication]");
  assert(JSON.parse(item.attr("data-use-case")).length, id + " use case");
  assert(node.find(".publication-date").text().trim());
  assert(node.find(".publication-topics").text().trim());
  assert(
    node
      .find(".meta")
      .text()
      .match(/Article|Book|Essay|連載/),
  );
}
for (const [id, expected] of [
  ["foundations/ai-business-design", "公開：2026年2月"],
  ["cases/three-ai-maintenance", "公開：2026年7月"],
  ["cases/system-understanding", "状態：連載中"],
]) {
  for (const route of ["articles", id.startsWith("cases/") ? "cases" : "series"]) {
    const $ = page(route);
    assert(
      $('[data-content-id="' + id + '"] .publication-date')
        .text()
        .replace(/\s+/g, " ")
        .trim()
        .includes(expected),
      `${route}: ${id} must display ${expected}`,
    );
  }
}
assert.equal(page("cases")(".case-study-index").length, 2);
for (const id of [
  "career",
  "reference",
  "foundations",
  "architecture",
  "knowledge-context",
  "evaluation-hitl",
  "software-engineering",
  "practices",
  "cases",
  "essays",
  "books",
  "articles",
  "search",
  "about",
  "career/profile",
  "updates",
])
  assert(page(id)("h1").length, id);
console.log(
  "Verified use-case-first navigation, layer separation, related publications, complete Publication Hub and existing URLs.",
);

// Phase 4: journal order, preserved summaries, reading route and secondary archives.
assert.equal(design("[data-related-publications]").length, 0);
const mathematics = page("ai-mathematics");
assert.deepEqual(
  mathematics("[data-mathematics-reading] [data-content-id]")
    .map((_, e) => mathematics(e).attr("data-content-id"))
    .get(),
  [
    "foundations/conditional-probability",
    "foundations/temperature-design",
    "foundations/hallucination-mechanisms",
    "software-engineering/code-generation-models",
  ],
);
const reference = page("reference");
assert.equal(reference("[data-reference-archive]").length, 0);
assert.equal(
  reference('[data-content-id="foundations/wiki-overview"]').length,
  0,
);
const expectedBooks = [
  "cases/system-understanding",
  "cases/three-ai-maintenance",
];
for (const route of ["cases", "books"]) {
  const $ = page(route);
  assert.deepEqual(
    $("[data-series-index]")
      .map((_, e) => $(e).attr("data-series-index"))
      .get(),
    expectedBooks,
  );
  assert.equal($("[data-series-index] details").length, 2);
}
assert.equal(
  page("series")('[data-series-index="foundations/ai-business-design"]').length,
  1,
);
assert.equal(
  pubs('[data-type="連載"] [data-content-id="foundations/ai-business-design"]')
    .length,
  1,
);
const overview = page("overview");
for (const [id, d] of entries) {
  if (
    d.layer === "career" ||
    d.public === false ||
    d.status === "draft" ||
    id === "foundations/wiki-overview"
  )
    continue;
  assert(
    overview('[data-content-id="' + id + '"]').length,
    "Overview missing " + id,
  );
}
console.log(
  "Verified full overview, two case books, independent series and simplified navigation.",
);

assert(top("#recent-growth-heading").length);
assert(top("#current-growth-heading").length);
assert(top('.growth-list [data-content-id]').length >= 3);
assert(page("updates")('.growth-list [data-content-id]').length >= 3);
for (const [id, expected] of [
  ["foundations/ai-business-design", "公開：2026年2月"],
  ["cases/three-ai-maintenance", "公開：2026年7月"],
  ["cases/system-understanding", "状態：連載中"],
]) {
  const $ = page(id);
  assert($.root().text().replace(/\s+/g, " ").includes(expected), id);
}
console.log("Verified recent growth and exact Book publication presentation.");
