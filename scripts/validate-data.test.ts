import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { validateData } from "./validate-data";

/** Writes a tiny public/ tree; each override replaces one file's contents. */
function fixture(overrides: Record<string, unknown> = {}) {
  const root = mkdtempSync(join(tmpdir(), "gta6-data-"));
  mkdirSync(join(root, "data"));
  mkdirSync(join(root, "icons/pins"), { recursive: true });
  mkdirSync(join(root, "screenshots"));
  writeFileSync(join(root, "screenshots/bank-001.webp"), "");
  writeFileSync(join(root, "icons/pins/bank.webp"), "");
  const files: Record<string, unknown> = {
    "data/categories.json": { kinds: [{ key: "bank" }, { key: "food" }] },
    "data/locations.json": [{ id: "bank-001", kind: "bank", screenshot: "screenshots/bank-001.webp" }],
    "data/places.json": [{ id: "L1", kind: "food" }],
    "icons/pins/index.json": ["bank"],
    ...overrides,
  };
  for (const [path, value] of Object.entries(files)) writeFileSync(join(root, path), JSON.stringify(value));
  return root;
}

describe("validateData", () => {
  it("passes on the real data", () => {
    expect(validateData("public")).toEqual([]);
  });

  it("passes on a valid fixture", () => {
    expect(validateData(fixture())).toEqual([]);
  });

  it("reports a missing screenshot", () => {
    const root = fixture({
      "data/locations.json": [{ id: "bank-001", kind: "bank", screenshot: "screenshots/nope.webp" }],
    });
    expect(validateData(root).join()).toContain("screenshots/nope.webp");
  });

  it("reports a kind that isn't in categories.json", () => {
    const root = fixture({ "data/places.json": [{ id: "L1", kind: "spaceport" }] });
    expect(validateData(root).join()).toContain("spaceport");
  });

  it("reports an id used twice across locations and places", () => {
    const root = fixture({ "data/places.json": [{ id: "bank-001", kind: "food" }] });
    expect(validateData(root).join()).toContain("Duplicate ids");
  });

  it("reports a pin listed without a file", () => {
    const root = fixture({ "icons/pins/index.json": ["bank", "ghost"] });
    expect(validateData(root).join()).toContain("ghost");
  });
});
