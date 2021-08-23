/**
 * DeepRequired<T>将T的属性转换成必须属性。
 * 如果T为对象，则将递归对象将所有key转换成required，类型转换为NonUndefined;
 * 如果T为数组则递归遍历数组将每一项设置为NonUndefined。
 */

type NonUndefined<T> = T extends undefined ? never : T;

type DeepRequired<T> = T extends (...arg: any) => any
  ? T
  : T extends object
  ? DeepRequiredObject<T>
  : T extends Array<any>
  ? // 这里对数组使用 number 索引进行访问
    // 得到的是所有子项类型组成的联合类型
    DeepRequiredArray<T[number]>
  : T;

interface DeepRequiredArray<T> extends Array<DeepRequired<NonUndefined<T>>> {}

type DeepRequiredObject<T extends object> = {
  [K in keyof T]-?: DeepRequired<NonUndefined<T[K]>>;
};
