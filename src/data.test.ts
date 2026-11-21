import { describe, expect, it } from "vitest";
import { pinFor } from "./data";

const pins = new Set(["bank", "collectible-card", "magazine", "street-food", "bar"]);

describe("pinFor", () => {
  it("uses the pin named after the location's type", () => {
    expect(pinFor({ id: "bank-001", kind: "bank" }, pins)).toBe("bank");
  });

  it("maps every card series to the collectible card pin", () => {
    expect(pinFor({ id: "card-vice-city-narcos-006", kind: "card" }, pins)).toBe("collectible-card");
  });

  it("uses an alias for types without their own pin", () => {
    expect(pinFor({ id: "comics-001", kind: "magazine" }, pins)).toBe("magazine");
    expect(pinFor({ id: "cafe-takeout-012", kind: "food" }, pins)).toBe("street-food");
  });

  it("falls back to the category's pin, e.g. for places with L-numbered ids", () => {
    expect(pinFor({ id: "L42", kind: "food" }, pins)).toBe("bar");
  });

  it("returns null when nothing fits, so the map draws the category badge", () => {
    expect(pinFor({ id: "meteorite-001", kind: "meteorite" }, pins)).toBeNull();
  });
});
