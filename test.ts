import { assertEquals } from "@std/assert";
import plugin from "./mod.ts";
import example from "./example.ts" with { type: "text" };

Deno.test("no-array-shorthand", () => {
  const diagnostics = Deno.lint.runPlugin(
    plugin,
    "example.ts",
    example,
  );

  assertEquals(diagnostics, [
    {
      id: "type-lint/no-array-shorthand",
      message: "Use ReadonlyArray<string> instead of readonly string[]",
      hint: undefined,
      range: [13, 30],
      fix: [{ range: [13, 30], text: "ReadonlyArray<string>" }],
    },
    {
      id: "type-lint/no-array-shorthand",
      message: "Use ReadonlyArray<string> instead of readonly string[]",
      hint: undefined,
      range: [68, 85],
      fix: [{ range: [68, 85], text: "ReadonlyArray<string>" }],
    },
    {
      id: "type-lint/no-array-shorthand",
      message: "Use ReadonlyArray<string> instead of readonly string[]",
      hint: undefined,
      range: [89, 106],
      fix: [{ range: [89, 106], text: "ReadonlyArray<string>" }],
    },
    {
      id: "type-lint/no-array-shorthand",
      message: "Use ReadonlyArray<string> instead of readonly string[]",
      hint: undefined,
      range: [170, 187],
      fix: [{ range: [170, 187], text: "ReadonlyArray<string>" }],
    },
    {
      id: "type-lint/no-array-shorthand",
      message: "Use ReadonlyArray<string> instead of readonly string[]",
      hint: undefined,
      range: [150, 167],
      fix: [{ range: [150, 167], text: "ReadonlyArray<string>" }],
    },
    {
      id: "type-lint/no-array-shorthand",
      message: "Use Array<number> instead of number[]",
      hint: undefined,
      range: [349, 357],
      fix: [{ range: [349, 357], text: "Array<number>" }],
    },
  ]);
});
