import fs from "node:fs";
import path from "node:path";

/**
 * Renders public/rik.svg inline so fill="currentColor" follows theme (--fg via parent color).
 */
export function RikWordmark() {
  const filePath = path.join(process.cwd(), "public", "rik.svg");
  let svg = fs.readFileSync(filePath, "utf8");
  svg = svg.replace(/^<\?xml[^?]*\?>\s*/i, "").replace(/<!DOCTYPE[^>]*>/i, "").trim();

  return (
    <span
      className="case-studies-rik-wrap"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
