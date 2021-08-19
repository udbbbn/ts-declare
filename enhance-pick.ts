/**
 * 增强 pick 可指定获取的类型
 * 
 * 比较简单 原理就是 传入 Pick 之前判断一下值的类型是否继承指定类型
 */

type EnhancePick<T, I> = Pick<
  T,
  { [K in keyof T]: T[K] extends I ? K : never }[keyof T]
>;

type EnhancePickRes = EnhancePick<
  { key1: number; key2: string; key3: number },
  number
>;
// type EnhancePickRes = {
//     key1: number;
//     key3: number;
// }
