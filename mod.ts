const plugin: Deno.lint.Plugin = {
  name: "my-plugin",
  rules: {
    "no-array-shorthand": {
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
                return fixer.replaceText(
                  node,
                  `ReadonlyArray<${
                    context.sourceCode.getText(arrayType.elementType)
                  }>`,
                );
              },
            });
          },
          TSArrayType(node) {
            const parent = node.parent;
            if (
              parent.type === "TSTypeOperator" &&
              parent.operator === "readonly"
            ) {
              return;
            }

            context.report({
              node,
              message: "Use Array<T> instead of T[]",
              fix(fixer) {
                return fixer.replaceText(
                  node,
                  `Array<${context.sourceCode.getText(node.elementType)}>`,
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
