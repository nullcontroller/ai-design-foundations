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
  const { data, body } = parse(read(e.destination_file));
  assert.equal(data.section, e.category);
  assert.equal(
    hash(body),
    e.destination_body_sha256,
    `Migrated body differs from approved mechanical conversion: ${e.destination_file}`,
  );
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
const source = process.env.ZENN_SOURCE;
if (source) {
  for (const e of z.entries)
    assert.equal(
      hash(read(path.join(source, e.source_file))),
      e.source_sha256,
      "Source changed " + e.source_file,
    );
}
console.log(
  `Verified: 16 articles, 3 books, 22 chapters, ${w.entries.length} Wiki pages, ${z.assets.length} assets; metadata, body hashes, order and slugs.`,
);
