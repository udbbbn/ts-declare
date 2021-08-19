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
  { key1: number; key2: string | number; key3: number },
  number
>;
// type EnhancePickRes = {
//     key1: number;
//     key3: number;
// }

// 考虑欠缺了 上面的方法没办法判断 联合类型 例如
// { key2: number | null | undefined } 按一般写法来判断 key2 应该被提取出来
// (非严格模式下)
// 因为可以传入 number 类型
// 因此需要再写一个方法
// 原理是 使用 元组 避免 extends 分发

type EnhancePickExact<T, I> = Pick<
  T,
  {
    [K in keyof T]: [T[K]] extends [I]
      ? [I] extends [T[K]]
        ? K
        : never
      : never;
  }[keyof T]
>;
type EnhancePickRes2 = EnhancePickExact<
  { key1: number; key2: number | null | undefined; key3: number },
  number
>;
// type EnhancePickRes2 = {
//     key1: number;
//     key2: number | null | undefined;
//     key3: number;
// }
