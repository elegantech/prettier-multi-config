import { isRegExp } from 'node:util/types';

import { NonEmptyValue, PossibleEmptyValue } from '~/contracts/types';

/**
 * Checks if a value is not null, undefined, an empty/whitespace string, nor an empty array/object.
 *
 * @param value Value to be checked.
 */
export const isNotEmpty = (value: PossibleEmptyValue): value is NonEmptyValue => {
  if (value === null || value === undefined) {
    return false;
  }

  if (typeof value === 'boolean') {
    // Booleans are not considered empty.
    return true;
  }

  if (typeof value === 'number') {
    // Numbers are not considered empty.
    return !Number.isNaN(value);
  }

  if (typeof value === 'string') {
    return value.trim().length > 0;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (isRegExp(value)) {
    return value.source.length > 0;
  }

  return Object.keys(value).length > 0;
};
