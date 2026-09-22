import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const limits = {
  html: 250 * 1024,
  javascript: 750 * 1024,
  css: 100 * 1024,
  image: 1100 * 1024,
  total: 16 * 1024 * 1024,
};
const walk = (directory) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
const files = walk("dist").map((file) => ({
  file,
  size: fs.statSync(file).size,
}));
const largest = (extensions) =>
  files
    .filter(({ file }) =>
      extensions.some((extension) => file.endsWith(extension)),
    )
    .sort((a, b) => b.size - a.size)[0];
const measurements = {
  html: largest([".html"]),
  javascript: largest([".js"]),
  css: largest([".css"]),
  image: largest([".png", ".jpg", ".jpeg", ".webp", ".avif"]),
};
for (const [kind, measurement] of Object.entries(measurements)) {
  assert.ok(measurement, `No ${kind} output found`);
  assert.ok(
    measurement.size <= limits[kind],
    `${kind} budget exceeded: ${measurement.file} ${measurement.size} > ${limits[kind]}`,
  );
}
const total = files.reduce((sum, file) => sum + file.size, 0);
assert.ok(
  total <= limits.total,
  `Total budget exceeded: ${total} > ${limits.total}`,
);
const kb = (value) => `${(value / 1024).toFixed(1)} KiB`;
console.log(
  `Performance budget: HTML ${kb(measurements.html.size)}, JS ${kb(measurements.javascript.size)}, CSS ${kb(measurements.css.size)}, image ${kb(measurements.image.size)}, total ${(total / 1024 / 1024).toFixed(2)} MiB.`,
);
