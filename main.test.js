import {expect, test} from 'vitest';

import {sum2} from './func_sum_array.js';

test('cumulative sum of an array', () => {
  expect(sum2([1, 3, 5, 7])).toBe(16);
  expect(sum2([-2, -4, -6])).toBe(-12);
});