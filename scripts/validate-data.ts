/**
 * Checks the data contributors edit in public/. Runs in CI and with `pnpm validate`.
 * validateData() returns the problems so tests can call it on fixtures.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

type Entry = { id: string; kind: string; screenshot?: string | null };

export function validateData(root: string): string[] {
  const read = <T>(path: string): T => JSON.parse(readFileSync(join(root, path), "utf8")) as T;
  const problems: string[] = [];
  const report = (title: string, items: string[]) => {
    if (items.length) problems.push(`${title}:\n${items.map((i) => `  ${i}`).join("\n")}`);
  };

  let categories: { kinds: { key: string }[] }, locations: Entry[], places: Entry[], pinIndex: string[];
  try {
    categories = read("data/categories.json");
    locations = read("data/locations.json");
    places = read("data/places.json");
    pinIndex = read("icons/pins/index.json");
    for (const f of readdirSync(join(root, "data"))) if (f.endsWith(".json")) read(`data/${f}`);
  } catch (err) {
    return [`A JSON file doesn't parse: ${String(err)}`];
  }
  const entries = [...locations, ...places];

  report(
    "Screenshots that don't exist",
    locations.flatMap((l) => (l.screenshot && !existsSync(join(root, l.screenshot)) ? [l.screenshot] : [])),
  );

  const kinds = new Set(categories.kinds.map((k) => k.key));
  report(
    "Kinds missing from data/categories.json",
    [...new Set(entries.map((e) => e.kind))].filter((k) => !kinds.has(k)),
  );

  const seen = new Set<string>();
  const dupes = new Set<string>();
  for (const { id } of entries) (seen.has(id) ? dupes : seen).add(id);
  report("Duplicate ids", [...dupes]);

  const pinFiles = new Set(
    readdirSync(join(root, "icons/pins"))
      .filter((f) => f.endsWith(".webp"))
      .map((f) => f.slice(0, -5)),
  );
  report(
    "Listed in icons/pins/index.json but no .webp file",
    pinIndex.filter((p) => !pinFiles.has(p)),
  );
  report(
    "Pin .webp files missing from icons/pins/index.json",
    [...pinFiles].filter((p) => !pinIndex.includes(p)),
  );

  return problems;
}

if (import.meta.main) {
  const problems = validateData("public");
  if (problems.length) {
    console.error(problems.join("\n"));
    process.exit(1);
  }
  console.log("Data OK");
}
