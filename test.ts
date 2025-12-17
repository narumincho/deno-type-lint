import { assertEquals } from "@std/assert";
import plugin from "./mod.ts";
import example from "./example.ts" with { type: "text" };

Deno.test("no-array-shorthand", () => {
  const diagnostics = Deno.lint.runPlugin(
    plugin,
    "main.ts",
    example,
  );
});
