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
    assert(node.find(".meta").text().length > 15, p);
    links++;
  });
}
for (const [id, d] of entries) {
  if (d.status === "draft") continue;
  const $ = load(fs.readFileSync("dist/" + id + "/index.html", "utf8"));
  assert.equal(
    $('[data-pagefind-meta="summary"]').text().trim(),
    d.summary,
    id,
  );
  for (const key of ["title", "category", "layer", "status", "source"])
    assert(
      $('[data-pagefind-meta="' + key + '"]')
        .text()
        .trim(),
      id + " " + key,
    );
}
const career = load(fs.readFileSync("dist/career/index.html", "utf8"));
assert.equal(career("h1").text(), "立林 裕太朗 | Career / Author");
assert(
  career('a[href="https://nullcontroller.github.io/career-profile/"]').length,
);
console.log(
  `Verified ${entries.size} summaries/search metadata, ${links} content links and Career profile.`,
);

// Phase 3 information architecture invariants.
const page = (id) =>
  load(fs.readFileSync("dist/" + id + "/index.html", "utf8"));
const top = page("");
assert.deepEqual(
  top(".sidebar nav a span")
    .map((_, e) => top(e).text())
    .get(),
  [
    "AI Design",
    "AI数学論",
    "Practices",
    "Case Studies",
    "記事一覧",
    "Project",
    "Tools",
    "Career",
    "Reference",
  ],
);
assert(!top(".sidebar summary").text().includes("設計体系"));
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
const publicationIds = pubs("[data-publication] [data-content-id]")
  .map((_, e) => pubs(e).attr("data-content-id"))
  .get();
for (const [id, d] of entries)
  if (["article", "book"].includes(d.source?.original_type))
    assert(publicationIds.includes(id), "Missing publication " + id);
assert.equal(new Set(publicationIds).size, publicationIds.length);
for (const id of publicationIds) {
  const node = pubs('[data-content-id="' + id + '"]');
  assert(node.find(".publication-date").text().trim());
  assert(node.find(".publication-topics").text().trim());
  assert(
    node
      .find(".meta")
      .text()
      .match(/Article|Book|Essay/),
  );
}
assert.equal(page("cases")(".case-study-index").length, 2);
for (const id of [
  "project",
  "project/journal",
  "tools",
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
  "authoring",
])
  assert(page(id)("h1").length, id);
console.log(
  "Verified Phase 3 navigation, layer separation, related publications, complete Publication Hub and existing URLs.",
);
