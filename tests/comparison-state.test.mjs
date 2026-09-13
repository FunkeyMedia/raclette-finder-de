import assert from "node:assert/strict";
import test from "node:test";
import { selectComparisonIds } from "../src/lib/comparison-state.ts";
test("only an unfiltered visit receives an example comparison", () => {
  assert.deepEqual(selectComparisonIds(undefined, ["A", "B"], ["A", "B"]), ["A", "B"]);
  assert.deepEqual(selectComparisonIds("missing", ["A", "B"], ["A", "B"]), []);
  assert.deepEqual(selectComparisonIds("A", ["A", "B"], ["A", "B"]), ["A"]);
});
test("duplicate and invalid IDs do not introduce substitute devices", () => {
  assert.deepEqual(selectComparisonIds("A,A,bad,B", ["A", "B"], []), ["A", "B"]);
  assert.deepEqual(selectComparisonIds(["A"], ["A", "B"], []), []);
});
