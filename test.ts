import { assertEquals } from "@std/assert";
import myPlugin from "./mod.ts";
import example from "./example.ts" with { type: "text" };

Deno.test("my-plugin", () => {
  const diagnostics = Deno.lint.runPlugin(
    myPlugin,
    "main.ts",
    example,
  );

  assertEquals(diagnostics.length, 1);
  const d = diagnostics[0];
  assertEquals(d.id, "my-plugin/my-rule");
  assertEquals(d.message, "should be _b");
  assertEquals(d.fix, [{ range: [6, 8], text: "_b" }]);
});
