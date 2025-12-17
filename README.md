# deno-type-lint

Deno lint plugin for TypeScript types.

[![jsr:@narumincho/type-lint](https://jsr.io/badges/@narumincho/type-lint)](https://jsr.io/@narumincho/type-lint)

日本語の記事: https://zenn.dev/narumincho/articles/deno-lint-plugin

## Description

This plugin enforces stricter TypeScript type annotations by replacing shorthand array types with their explicit forms. This helps improve type safety and consistency in your codebase.

## Usage

Add the plugin to your `deno.json`:

```json
{
  "lint": {
    "plugins": ["jsr:@narumincho/type-lint"]
  }
}
```

## Rules

### type-lint/no-array-shorthand

This rule replaces shorthand array type annotations with explicit `Array<T>` and `ReadonlyArray<T>` types.

#### Examples

**Before:**

```ts
function removeEmptyStringInArray(array: readonly string[]): string[] {
  return array.filter((item) => item !== "");
}
```

**After:**

```ts
function removeEmptyStringInArray(array: ReadonlyArray<string>): Array<string> {
  return array.filter((item) => item !== "");
}
```

This rule applies to:

- `T[]` → `Array<T>`
- `readonly T[]` → `ReadonlyArray<T>`
