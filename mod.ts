const plugin: Deno.lint.Plugin = {
  name: "type-lint",
  rules: {
    "no-array-shorthand": {
      create(context) {
        return {
          TSTypeOperator(node) {
            if (node.operator !== "readonly") return;
            if (node.typeAnnotation.type !== "TSArrayType") return;
            const elementType = node.typeAnnotation.elementType;
            context.report({
              node,
              message: `Use ReadonlyArray<${
                context.sourceCode.getText(elementType)
              }> instead of readonly ${
                context.sourceCode.getText(elementType)
              }[]`,
              fix(fixer) {
                return fixer.replaceText(
                  node,
                  `ReadonlyArray<${context.sourceCode.getText(elementType)}>`,
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
              message: `Use Array<${
                context.sourceCode.getText(node.elementType)
              }> instead of ${context.sourceCode.getText(node.elementType)}[]`,
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
