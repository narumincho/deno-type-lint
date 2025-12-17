const plugin: Deno.lint.Plugin = {
  // The name of your plugin. Will be shown in error output
  name: "my-plugin",
  // Object with rules. The property name is the rule name and
  // will be shown in the error output as well.
  rules: {
    "my-rule": {
      // Inside the `create(context)` method is where you'll put your logic.
      // It's called when a file is being linted.
      create(context) { 
        // Return an AST visitor object
        return {
          // Here in this example we forbid any identifiers being named `_a`
          Identifier(node) {
            if (node.name === "_a") {
              // Report a lint error with a custom message
              context.report({
                node,
                message: "should be _b",
                // Optional: Provide a fix, which can be applied when
                // the user runs `deno lint --fix`
                fix(fixer) {
                  return fixer.replaceText(node, "_b");
                },
              });
            }
          },
        };
      },
    },
  },
};
export default plugin;