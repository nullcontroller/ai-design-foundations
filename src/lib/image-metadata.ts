import fs from "node:fs";
import path from "node:path";
import { base } from "./site";

export type ImageDimensions = { width: number; height: number };

function pngDimensions(data: Buffer): ImageDimensions | undefined {
  if (data.length < 24 || data.toString("ascii", 1, 4) !== "PNG") return;
  return { width: data.readUInt32BE(16), height: data.readUInt32BE(20) };
}

function jpegDimensions(data: Buffer): ImageDimensions | undefined {
  if (data.length < 4 || data[0] !== 0xff || data[1] !== 0xd8) return;
  let offset = 2;
  while (offset + 9 < data.length) {
    if (data[offset] !== 0xff) {
      offset++;
      continue;
    }
    const marker = data[offset + 1];
    const length = data.readUInt16BE(offset + 2);
    if (
      [
        0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce,
        0xcf,
      ].includes(marker)
    )
      return {
        width: data.readUInt16BE(offset + 7),
        height: data.readUInt16BE(offset + 5),
      };
    if (length < 2) break;
    offset += length + 2;
  }
}

export function imageDimensions(source?: string): ImageDimensions | undefined {
  if (!source || source.startsWith("http") || source.endsWith(".svg")) return;
  const relative = decodeURIComponent(source)
    .replace(new RegExp(`^${base}/?`), "")
    .replace(/^\/+/, "");
  const file = path.join(process.cwd(), "public", relative);
  if (!fs.existsSync(file)) return;
  const data = fs.readFileSync(file);
  return pngDimensions(data) ?? jpegDimensions(data);
}
