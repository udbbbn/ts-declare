/**
 * FunctionKeys
 *
 * 获取 T 中所有类型为函数的 key 组成的联合类型。
 */

type FunctionBaseModule = {
  numberProps: number;
  stringProps: string;
  funcProps: () => void;
  funcProps2: (arg: string) => number;
  funcProps3: Function;
};

type FunctionKeys<T extends object> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type FunctionResult = FunctionKeys<FunctionBaseModule>;
