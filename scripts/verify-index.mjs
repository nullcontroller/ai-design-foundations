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
assert.equal(career("h1").text(), "キャリア — 立林 裕太朗");
assert(career('a[href="/ai-design-foundations/career/profile/"]').length);
console.log(
  `Verified ${entries.size} summaries/search metadata, ${links} content links and Career profile.`,
);

// Phase 3 information architecture invariants.
const page = (id) =>
  load(fs.readFileSync("dist/" + id + "/index.html", "utf8"));
const top = page("");
assert.equal(top("main h1").first().text(), "Rosarium");
for (const html of walk("dist").filter((file) => file.endsWith(".html"))) {
  const $ = load(fs.readFileSync(html, "utf8"));
  const brand = $("header.masthead > a.brand");
  assert.equal(brand.length, 1, `${html}: shared header brand`);
  assert.equal(brand.text().trim(), "Rosarium", `${html}: brand text`);
  assert.equal(
    brand.attr("href"),
    "/ai-design-foundations/",
    `${html}: base-aware brand link`,
  );
  assert.equal(
    brand.find(".brand-author,.brand-domain,.icon").length,
    0,
    `${html}: brand must not contain profile or decorative content`,
  );
}
assert.equal(
  top(".home-introduction .lead").text(),
  "学習と実務を通じて育て続ける「庭」",
);
assert(!top("main").text().includes("Applied AI / System Architecture"));
assert(!top("main").text().includes("立林 裕太朗"));
assert.deepEqual(
  top(".sidebar nav a .nav-copy > span")
    .map((_, e) => top(e).text())
    .get(),
  ["庭", "読み物", "AI設計", "AI理論", "実践知", "実践事例", "Reference"],
);
assert.deepEqual(
  top(".header-primary a")
    .map((_, e) => top(e).text().trim())
    .get(),
  ["庭", "読み物", "キャリア"],
);
assert.equal(top(".header-actions a").length, 0);
assert.equal(top("#global-search-input").length, 1);
assert.equal(top(".global-search-toggle").length, 1);
assert(!top(".sidebar summary").text().includes("設計体系"));
for (const secondary of ["詳細職務経歴", "Books", "連載", "Essays"])
  assert(
    !top(".sidebar nav a .nav-copy > span").text().includes(secondary),
    secondary,
  );
assert.equal(top(".sidebar .icon").length, 7);
assert.equal(
  new Set(
    top(".sidebar .icon")
      .map((_, e) => top(e).attr("class"))
      .get(),
  ).size,
  7,
);
assert.equal(
  top('.sidebar a[href="/ai-design-foundations/career/"]').length,
  0,
);
assert.equal(
  top('.sidebar a[href="/ai-design-foundations/updates/"]').length,
  0,
);
assert.deepEqual(
  top(".sidebar .nav-children a .nav-copy > span")
    .map((_, e) => top(e).text())
    .get(),
  ["AI設計", "AI理論", "実践知", "実践事例"],
);
assert.equal(top(".sidebar").length, 1);
assert.equal(career(".sidebar,.toc,.global-search").length, 0);
assert.equal(career(".career-header-links").length, 1);
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
for (const [route, layer] of [["reference", "reference"]]) {
  const $ = page(route);
  assert(primaryIds($).length);
  for (const id of primaryIds($)) assert.equal(entries.get(id).layer, layer);
}
for (const [route, layer, crossListed] of [
  [
    "ai-mathematics",
    "ai-mathematics",
    ["foundations/guardrail-models", "foundations/layered-hallucination-controls"],
  ],
  [
    "practices",
    "practice",
    ["knowledge-context/prompt-structure", "cases/understanding-systems-as-capability"],
  ],
]) {
  const $ = page(route);
  const ids = primaryIds($);
  const canonical = [...entries]
    .filter(([, data]) => data.layer === layer && data.public !== false)
    .map(([id]) => id);
  for (const id of canonical) assert(ids.includes(id), `${route} misses canonical ${id}`);
  for (const id of crossListed) assert(ids.includes(id), `${route} misses discovery path ${id}`);
  assert.equal(new Set(ids).size, ids.length, `${route} has duplicate discovery entries`);
}
const pubs = page("articles");
assert.equal(top("#use-case-heading,#current-growth-heading").length, 0);
assert.equal(pubs("h1").text(), "読み物");
assert.equal(
  pubs(".page-heading .lead").text(),
  "Rosariumで育てている知識を、テーマごとにまとめています。",
);
assert.equal(pubs("#current-topics-heading").length, 0);
assert.equal(pubs("[data-publication]").length, 0);
assert.equal(pubs("[data-use-case-shortcut]").length, 0);
assert.equal(pubs("[data-content-id]").length, 0);
assert.deepEqual(
  pubs(".reading-area .reading-category")
    .map((_, e) => pubs(e).text().trim())
    .get(),
  ["AI設計", "AI理論", "実践知", "実践事例"],
);
assert.deepEqual(
  pubs(".reading-area .reading-question")
    .map((_, e) => pubs(e).text().replace("→", "").trim())
    .get(),
  [
    "AIを仕事やシステムにどう組み込む？",
    "生成AIはなぜそう振る舞う？",
    "AIを仕事や開発でどう使う？",
    "実際の課題にどう適用した？",
  ],
);
for (const [section, href] of [
  ["ai-design", "/ai-design-foundations/ai-design/"],
  ["ai-mathematics", "/ai-design-foundations/ai-mathematics/"],
  ["practices", "/ai-design-foundations/practices/"],
  ["cases", "/ai-design-foundations/cases/"],
]) {
  const area = pubs(`#${section}`);
  assert(area.find(`a[href="${href}"]`).length, section);
}
for (const [id, expected] of [
  ["foundations/ai-business-design", ["公開：2026年2月"]],
  ["cases/three-ai-maintenance", ["公開：2026年7月"]],
  ["cases/system-understanding", ["状態：公開", "公開：2026年2月"]],
]) {
  for (const route of [id.startsWith("cases/") ? "cases" : "series"]) {
    const $ = page(route);
    const metadata = $('[data-content-id="' + id + '"] .publication-date')
      .text()
      .replace(/\s+/g, " ")
      .trim();
    for (const value of expected)
      assert(metadata.includes(value), `${route}: ${id} must display ${value}`);
  }
}
const cases = page("cases");
assert.equal(cases(".case-study-index").length, 2);
assert.equal(cases("main img").length, 0);
assert.equal(cases(".book-list-entry-text").length, 2);
for (const id of ["cases/system-understanding", "cases/three-ai-maintenance"]) {
  const study = cases(`[data-series-index="${id}"]`);
  const descendants = study.find("*").toArray();
  assert(
    descendants.indexOf(study.find(".publication-entry").get(0)) <
      descendants.indexOf(study.find(".case-outcome").get(0)),
    `${id}: outcome must follow title, summary and metadata`,
  );
  assert.deepEqual(
    study
      .find(".case-outcome dt")
      .map((_, e) => cases(e).text())
      .get(),
    ["課題", "設計", "結果"],
  );
}
assert.equal(
  cases('[data-content-id="cases/system-understanding"] .publication-topics')
    .text()
    .trim(),
  "自然言語サービス・RAG・Knowledge / AI × Software Engineering / Case・実務",
);
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
  "Verified reading gateway, layer separation, related publications and existing URLs.",
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
assert.equal(reference(".site-implementation").length, 0);
assert(!reference("main").text().includes("Knowledge / Publishing as Code"));
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
const overview = page("overview");
assert.match(overview("meta[name=robots]").attr("content") || "", /noindex/);
assert.equal(
  overview("meta[http-equiv=refresh]").attr("content"),
  "0;url=/ai-design-foundations/articles/",
);
assert(overview('a[href="/ai-design-foundations/articles/"]').length);
console.log(
  "Verified overview compatibility redirect, two case books, independent series and simplified navigation.",
);

assert(top("#recent-growth-heading").length);
assert.equal(top("main > section").length, 2);
assert.equal(top(".growth-list [data-growth-entry]").length, 1);
assert.equal(
  top(".growth-list [data-growth-entry] .content-title").text(),
  "Rosarium 公開",
);
assert.equal(top('a[href="/ai-design-foundations/updates/"]').length, 0);
const updates = page("updates");
assert.match(updates("meta[name=robots]").attr("content") || "", /noindex/);
assert.equal(
  updates("meta[http-equiv=refresh]").attr("content"),
  "0;url=/ai-design-foundations/",
);
assert(updates('a[href="/ai-design-foundations/"]').length);
assert.equal(updates(".growth-list [data-content-id]").length, 0);
assert(
  !fs.readFileSync("dist/feed.xml", "utf8").includes("Rosarium 公開"),
  "Curated Recent Growth must remain separate from the content RSS feed",
);
for (const route of [
  "career",
  "articles",
  "cases",
  "ai-design",
  "ai-mathematics",
  "practices",
  "reference",
])
  assert(
    page(route)("main .icon").length,
    route + " must use the icon language",
  );
for (const route of ["about", "search"]) {
  const $ = page(route);
  assert.match($("meta[name=robots]").attr("content") || "", /noindex/);
  assert.equal($("meta[http-equiv=refresh]").length, 1);
}
assert.equal(page("practices")("[data-related-publications]").length, 1);
for (const html of walk("dist").filter((file) => file.endsWith(".html")))
  assert(
    !load(fs.readFileSync(html, "utf8"))("main")
      .text()
      .includes("Related Publications"),
    html,
  );
for (const [id, expected] of [
  ["foundations/ai-business-design", ["公開：2026年2月"]],
  ["cases/three-ai-maintenance", ["公開：2026年7月"]],
  ["cases/system-understanding", ["状態：公開", "公開：2026年2月"]],
]) {
  const $ = page(id);
  const text = $.root().text().replace(/\s+/g, " ");
  for (const value of expected) assert(text.includes(value), `${id}: ${value}`);
}
assert(
  page("cases/system-understanding")("main")
    .text()
    .includes(
      "この実践で使用した生成AIはGPTであり、当時の作業ではGitHub Copilotを利用していない。",
    ),
);
assert(
  page("cases/system-understanding")("main")
    .text()
    .includes(
      "GPTにGitHub Copilotを組み合わせることで、より高い生産性を期待できる。",
    ),
);
assert(
  page("cases/three-ai-maintenance")("main")
    .text()
    .includes(
      "GPT、GitHub Copilot、Microsoft 365 Copilotを工程ごとに役割分担して利用した。",
    ),
);
console.log("Verified recent growth and exact Book publication presentation.");

for (const route of ["ai-design", "ai-mathematics", "practices", "cases"]) {
  const $ = page(route);
  const desktop = $(".theme-toc a")
    .map((_, e) => $(e).attr("href"))
    .get();
  const mobile = $(".theme-toc-mobile a")
    .map((_, e) => $(e).attr("href"))
    .get();
  assert(desktop.length, `${route}: desktop article index`);
  assert.deepEqual(mobile, desktop, `${route}: mobile article index`);
  assert.equal($(".theme-toc > p").text(), "このテーマの記事");
  assert.match(
    $(".theme-toc-mobile > summary").text(),
    /^このテーマの記事（\d+）$/,
  );
  assert($(".theme-toc .theme-nav-groups > details").length, `${route}: grouped desktop index`);
  assert($(".theme-toc-mobile .theme-nav-groups > details").length, `${route}: grouped mobile index`);
}
console.log(
  "Verified category article indexes, Garden navigation and updates compatibility.",
);
