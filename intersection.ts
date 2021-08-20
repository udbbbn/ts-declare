/**
 * 类似 Pick<T, U> 只不过 U 是对象
 */

type Intersection<T extends object, U extends object> = Pick<
  T,
  //   Extract<keyof T, keyof U>
  { [K in keyof U]: K extends keyof T ? K : never }[keyof U]
>;

type IntersectionResult = Intersection<{ a: string }, { a: number | string }>;
