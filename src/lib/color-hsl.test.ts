import { describe, expect, it } from "vitest";
import { hexToHsl, hslToHex } from "./color-hsl";

describe("hexToHsl", () => {
  it("leest basis-kleuren", () => {
    expect(hexToHsl("#ff0000")).toEqual({ h: 0, s: 100, l: 50 });
    expect(hexToHsl("#00ff00")).toEqual({ h: 120, s: 100, l: 50 });
    expect(hexToHsl("#0000ff")).toEqual({ h: 240, s: 100, l: 50 });
  });
  it("leest grijstinten als verzadiging 0", () => {
    expect(hexToHsl("#000000")).toEqual({ h: 0, s: 0, l: 0 });
    expect(hexToHsl("#ffffff")).toEqual({ h: 0, s: 0, l: 100 });
    expect(hexToHsl("#808080")).toEqual({ h: 0, s: 0, l: 50 });
  });
  it("accepteert korte hex", () => {
    expect(hexToHsl("#f00")).toEqual({ h: 0, s: 100, l: 50 });
  });
  it("weigert ongeldige invoer", () => {
    expect(hexToHsl("rood")).toBeNull();
    expect(hexToHsl("#12345")).toBeNull();
    expect(hexToHsl("")).toBeNull();
  });
});

describe("hslToHex", () => {
  it("schrijft basis-kleuren", () => {
    expect(hslToHex({ h: 0, s: 100, l: 50 })).toBe("#ff0000");
    expect(hslToHex({ h: 120, s: 100, l: 50 })).toBe("#00ff00");
    expect(hslToHex({ h: 240, s: 100, l: 50 })).toBe("#0000ff");
  });
  it("kemt waarden in hun bereik", () => {
    expect(hslToHex({ h: 400, s: 100, l: 50 })).toBe(hslToHex({ h: 40, s: 100, l: 50 }));
    expect(hslToHex({ h: 0, s: -10, l: 50 })).toBe("#808080");
    expect(hslToHex({ h: 0, s: 0, l: 200 })).toBe("#ffffff");
  });
  it("rondt een rondgang hex → hsl → hex correct af", () => {
    for (const hex of ["#0d0d0d", "#3b82f6", "#f97316", "#ecfccb", "#78553a"]) {
      expect(hslToHex(hexToHsl(hex)!)).toBe(hex);
    }
  });
});
