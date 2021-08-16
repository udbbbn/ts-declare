/**
 * SymmetricDifference<T, U> 获取没有同时存在于 T 和 U 内的类型
 */

type _Exclude<T, U> = T extends U ? never : T;

type SymmetricDifference<T, U> = _Exclude<T | U, T & U>;

type test = SymmetricDifference<1 | 2 | 3, 3 | 4 | 5>;
// test = 1 | 2 | 4 | 5
