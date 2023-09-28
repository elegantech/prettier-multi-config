/// Helper types

export type PossibleEmptyValue =
  | number
  | boolean
  | string
  | Array<unknown>
  | Record<string, unknown>
  | object
  | RegExp
  | undefined
  | null;

export type NonEmptyValue = boolean | number | string | Array<unknown> | Record<string, unknown> | RegExp;

export type Prettify<T> = {
  [K in keyof T]: T[K];
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
} & unknown;
