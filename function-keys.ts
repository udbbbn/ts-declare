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

// 非严格模式下 undefined 跟 null 是所有类型的子类 且两者可互相兼容
// (undefined extends null || null extends undefined) === true
// 所以此处仅用一个判断
type FilterInvalid<T> = T extends undefined ? never : T;

type FunctionKeys<T extends object> = {
  [K in keyof T]: FilterInvalid<T[K]> extends Function ? K : never;
}[keyof T];

type FunctionResult = FunctionKeys<FunctionBaseModule>;
