import { describe, expect, test } from '@jest/globals';

describe('enum', () => {
  test('enum', () => {
    enum Test {
      One = 1,
      Two = 2,
      Three = 3,
    };

    expect(Test[1]).toEqual({
      One: 1,
      Two: 2,
      Three: 3,
    });
  });
});