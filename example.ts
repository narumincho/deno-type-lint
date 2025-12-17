const array: readonly string[] = [
  "a",
  "b",
  "c",
] satisfies readonly string[] as readonly string[];

function removeEmptyStringInArray(array: readonly string[]): readonly string[] {
  return array.filter((item) => item !== "");
}

removeEmptyStringInArray(array);
