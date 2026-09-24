import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import assert from "node:assert/strict";
import YAML from "yaml";
const read = (p) =>
  fs
    .readFileSync(p, "utf8")
    .replace(/^\uFEFF/, "")
    .replace(/\r\n/g, "\n");
const hash = (s) => crypto.createHash("sha256").update(s).digest("hex");
const parse = (s) => {
  const m = s.match(/^---\n([\s\S]*?)\n---\n/);
  assert(m);
  return { data: YAML.parse(m[1]), body: s.slice(m[0].length) };
};
const z = YAML.parse(read("migration/zenn-migration-manifest.yaml")),
  w = YAML.parse(read("migration/wiki-migration-manifest.yaml"));
for (const [type, count] of Object.entries(z.expected))
  assert.equal(z.entries.filter((e) => e.source_type === type).length, count);
const paths = new Set();
for (const e of [...z.entries, ...w.entries]) {
  assert(!paths.has(e.destination_file));
  paths.add(e.destination_file);
  assert.match(e.destination_slug, /^[a-z0-9-]+(?:\/[a-z0-9-]+)*$/);
  assert.equal(e.migrated, true);
  const { data } = parse(read(e.destination_file));
  assert.equal(data.section, e.category);
  assert.ok(e.destination_body_sha256, `Missing import checksum: ${e.destination_file}`);
  assert.equal(data.source?.type, e.source_type === "wiki" ? "wiki" : "zenn");
  assert.equal(data.source?.url, e.original_url);
  if (e.source_type !== "wiki") {
    assert.equal(data.canonical, e.original_url);
    assert.deepEqual(data.source.metadata, e.original_frontmatter);
  }
}
for (const book of z.entries.filter((e) => e.source_type === "book")) {
  const chapters = z.entries.filter(
    (e) =>
      e.source_type === "chapter" &&
      e.source_file.startsWith(`books/${book.original_slug}/`),
  );
  assert.deepEqual(
    chapters.map((e) => e.original_slug),
    book.original_frontmatter.chapters,
  );
  chapters.forEach((e, i) =>
    assert.equal(parse(read(e.destination_file)).data.order, i + 1),
  );
}
for (const a of z.assets.filter((a) => a.downloaded)) {
  assert.equal(hash(fs.readFileSync("public" + a.destination)), a.sha256);
}
const completeness = read("migration/content-completeness-audit.md");
const bookCoverage = read("migration/book-knowledge-coverage.md");
const readingAudit = read("migration/reading-classification-audit.md");
assert.match(completeness, /\| MISSING \| 0 \|/);
assert.match(completeness, /公開孤児 \| 0/);
assert.match(bookCoverage, /PARTIAL: 0/);
assert.match(bookCoverage, /ABSENT: 0/);
assert.match(bookCoverage, /Chapter 4: 9 \/ 9/);
assert.match(bookCoverage, /Chapter 5: 11 \/ 11/);
assert.match(readingAudit, /\| AI設計 \| 23 \| 23 \|/);
assert.match(readingAudit, /\| 実践知 \| 4 \| 4 \|/);
const source = process.env.ZENN_SOURCE;
if (source) {
  for (const e of z.entries)
    assert.equal(
      hash(read(path.join(source, e.source_file))),
      e.source_sha256,
      "Source changed " + e.source_file,
    );
}
const supplementalSource = process.env.ZENN_SUPPLEMENTAL_SOURCE;
if (supplementalSource) {
  for (const sourceFile of z.supplemental_files) {
    const entry = z.entries.find((candidate) => candidate.source_file === sourceFile);
    assert.ok(entry, `Supplemental source missing from manifest: ${sourceFile}`);
    assert.equal(
      hash(read(path.join(supplementalSource, sourceFile))),
      entry.source_sha256,
      `Supplemental source changed ${sourceFile}`,
    );
    if (entry.source_type === "chapter") {
      assert.equal(
        hash(parse(read(entry.destination_file)).body),
        entry.destination_body_sha256,
        `Supplemental chapter body changed ${entry.destination_file}`,
      );
    }
  }
}
const wikiSource = process.env.WIKI_SOURCE;
if (wikiSource) {
  for (const entry of w.entries)
    assert.equal(
      hash(read(path.join(wikiSource, entry.source_file))),
      entry.source_sha256,
      `Wiki source changed ${entry.source_file}`,
    );
}
console.log(
  `Verified: ${z.expected.article} articles, ${z.expected.book} books, ${z.expected.chapter} chapters, ${w.entries.length} Wiki pages, ${z.assets.length} assets; provenance metadata, coverage audits, order and slugs.`,
);

// Career source is copied read-only; verify approved mechanical conversion.
const career = JSON.parse(read("migration/career-integration-manifest.json"));
for (const entry of career.entries) {
 const { body, data } = parse(read(entry.destination_file));
 assert.equal(hash(body), entry.destination_body_sha256, entry.destination_file);
 assert.equal(data.source.commit, career.source_commit);
}
console.log("Verified 2 integrated Career pages and source commit.");
