import { describe, expect, test } from 'vitest';

import { isNotEmpty } from './is-not-empty';

describe('isNotEmpty(💬)', () => {
  test.each([
    ['number', 0],
    ['number', 1],
    ['boolean', false],
    ['boolean', true],
    ['string', 'hola'],
    ['plain object', { a: 1 }],
  ])('it returns true  for %s: %j', (_type, value) => {
    expect(isNotEmpty(value)).toBe(true);
  });

  test.each([
    ['RegExp instance', new RegExp('^Hola')],
    ['plain regular expression', /Mundo$/],
  ])('it returns true  for %s: %s', (_desc, value) => {
    expect(isNotEmpty(value)).toBe(true);
  });

  test('it returns true  for array: [1, "dos", 3]', () => {
    expect(isNotEmpty([1, 'dos', 3])).toBe(true);
  });

  test.each([
    ['null', null],
    ['undefined', undefined],
    ['empty string', ''],
    ['whitespace-only string', '  '],
    ['empty plain object', {}],
  ])('it returns false for %s: %j', (_type, value) => {
    expect(isNotEmpty(value)).toBe(false);
  });

  test('it returns false for [] (empty array)', () => {
    expect(isNotEmpty([])).toBe(false);
  });
});
