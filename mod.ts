const plugin: Deno.lint.Plugin = {
  // The name of your plugin. Will be shown in error output
  name: "my-plugin",
  // Object with rules. The property name is the rule name and
  // will be shown in the error output as well.
  rules: {
    "no-readonly-array-shorthand": {
      create(context) {
        return {
          TSTypeOperator(node) {
            if (node.operator !== "readonly") return;
            if (node.typeAnnotation.type !== "TSArrayType") return;
            context.report({
              node,
              message: "Use ReadonlyArray<T> instead of readonly T[]",
              fix(fixer) {
                const arrayType = node.typeAnnotation;
                if (arrayType.type !== "TSArrayType") {
                  throw new Error("Unexpected type");
                }
                const elementType = arrayType.elementType;
                return fixer.replaceText(
                  node,
                  `ReadonlyArray<${context.sourceCode.getText(elementType)}>`,
                );
              },
            });
          },
        };
      },
    },
    "no-array-shorthand": {
      create(context) {
        return {
          TSArrayType(node) {
            // deno-lint-ignore no-explicit-any
            const parent = (node as any).parent;
            if (
              parent &&
              parent.type === "TSTypeOperator" &&
              parent.operator === "readonly"
            ) {
              return;
            }

            context.report({
              node,
              message: "Use Array<T> instead of T[]",
              fix(fixer) {
                // deno-lint-ignore no-explicit-any
                const elementType = (node as any).elementType;
                return fixer.replaceText(
                  node,
                  `Array<${context.sourceCode.getText(elementType)}>`,
                );
              },
            });
          },
        };
      },
    },
  },
};
export default plugin;
