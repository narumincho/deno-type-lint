const array: readonly string[] = [
  "a",
  "b",
  "c",
] satisfies readonly string[] as readonly string[];

function removeEmptyStringInArray(array: readonly string[]): readonly string[] {
  return array.filter((item) => item !== "");
}

const tuple: readonly [string, number] = ["a", 1];

const tuple2: [string, number] = ["a", 2];

const array2: number[] = [1, 2, 3];

console.log(removeEmptyStringInArray(array), tuple, tuple2, array2);
