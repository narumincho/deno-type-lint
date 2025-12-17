import { assertEquals } from "@std/assert";
import myPlugin from "./mod.ts";

Deno.test("no-readonly-array-shorthand", () => {
  const diagnostics = Deno.lint.runPlugin(
    myPlugin,
    "main.ts",
    "const a: readonly string[] = [];",
  );

  assertEquals(diagnostics.length, 1);
  const d = diagnostics[0];
  assertEquals(d.id, "my-plugin/no-readonly-array-shorthand");
  assertEquals(d.message, "Use ReadonlyArray<T> instead of readonly T[]");
  assertEquals(d.fix, [{ range: [9, 26], text: "ReadonlyArray<string>" }]);
});
