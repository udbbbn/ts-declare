/**
 * Overwrite = 将 U 中的同名属性覆盖到 T 中
 *
 * 原理 利用 J 辅助完成
 * J
 * 先将 T 中与 U 相同的字段排除
 * 再将 U 中与 T 相同的字段提取出来
 * 最后合并
 *
 * 这个真的有点难 0.0
 */

// 将 T 中与 U 相同的字段排除
type Diff<T extends object, U extends object> = Pick<
  T,
  Exclude<keyof T, keyof U>
>;

type Overwrite<
  T extends object,
  U extends object,
  J = Diff<T, U> & Intersection<U, T>
> = Pick<J, keyof J>;

type OverwriteRes = Overwrite<
  { key1: string },
  { key1: number; other: boolean }
>;
// type OverwriteRes = {
//     key1: number;
// }
