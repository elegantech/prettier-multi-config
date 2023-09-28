/**
 * Data provider (for test.each(💬)<DataProvider<💬>>).
 *
 * @example
 * FunctionDataProvider<Parameters<MyType['myFunction']>, string>
 */
export interface IDataProvider<
  TParameters extends Array<unknown> = unknown[],
  TExpected = never,
  TMetadata = Record<string, unknown>,
> {
  /**
   * Positional arguments.
   */
  params: TParameters;

  /**
   *
   * The expected result of the function/method.
   * */
  expected?: TExpected;

  valueDescription?: string;

  /**
   * Other custom metadata
   */
  meta?: TMetadata;
}
