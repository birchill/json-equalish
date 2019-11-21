import { jsonEqualish } from './index';

describe('jsonEqualish', () => {
  it('should compare various things as the same', () => {
    const pairs = [
      [undefined, undefined],
      [null, null],
      ['', ''],
      ['a', 'a'],
      [0, 0],
      [-0, +0],
      [NaN, NaN],
      [Infinity, Infinity],
      [-Infinity, -Infinity],
      [7, 7],
      [{}, {}],
      [{}, { a: undefined }], // <-- This is an important test!
      [{ a: 'abc', b: undefined }, { a: 'abc' }],
      [{ a: 1 }, { a: 1 }],
      [[1], [1]],
      [[1, 2], [1, 2]],
      [[], []],
      [{ a: [7, 8] }, { a: [7, 8] }],
      [{ a: { b: 2 } }, { a: { b: 2 } }],
    ];

    for (const [a, b] of pairs) {
      // Sanity check our understanding of JSON
      expect(JSON.stringify(a)).toEqual(JSON.stringify(b));
      expect(jsonEqualish(a, b)).toBe(true);
    }
  });

  it('should compare objects as the same even when their object key order differs', () => {
    const pairs = [[{ a: 1, b: 2 }, { b: 2, a: 1 }]];

    for (const [a, b] of pairs) {
      // Sanity check our understanding of JSON
      expect(JSON.stringify(a)).not.toEqual(JSON.stringify(b));
      expect(jsonEqualish(a, b)).toBe(true);
    }
  });

  it('should compare various things as different', () => {
    const pairs = [
      [{ a: null }, { a: undefined }],
      [{ a: 1 }, { a: 2 }],
      [{ a: 1, b: 2 }, { b: 1, a: 2 }],
      [{ a: 1, b: 2 }, { a: 2, b: 1 }],
      [[1], [2]],
      [[1], [1, 2]],
      [[1, 2], [1]],
      [['a'], [1]],
      [[1, 2], [2, 1]],
      [{ a: { b: 2 } }, { a: { b: 3 } }],
    ];

    for (const [a, b] of pairs) {
      // Sanity check our understanding of JSON
      expect(JSON.stringify(a)).not.toEqual(JSON.stringify(b));
      expect(jsonEqualish(a, b)).toBe(false);
    }
  });

  it('should compare objects with a null prototype', () => {
    const objA = Object.create(null);
    objA.a = 123;

    const objB = Object.create(null);
    objB.a = 123;

    expect(JSON.stringify(objA)).toEqual(JSON.stringify(objB));
    expect(jsonEqualish(objA, objB)).toBe(true);
  });
});
