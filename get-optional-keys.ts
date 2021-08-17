/**
 * 获取可选值
 */

type OptionalBaseModule = {
  key: number;
  title: string;
  event?: () => void;
};

/**
 * 原理是 ：
 * ts 判断是否继承是根据结构来判断的 且 必选 是 可选 的子类型
 * 即 { a: number, c: number } extends {  a?: number, c?: number } = true
 *
 * 所以这里将 单个字段提取出来作为可选字段 其他字段作为必选字段 保证结构相同 再
 * 将 可选字段 去判断是否继承
 *
 */
type IsOptions<T, K extends keyof T> = { [I in Exclude<keyof T, K>]: T[I] } & {
  K?: T[K];
} extends T
  ? K
  : never;

type OptionsKeys<T> = { [K in keyof T]: IsOptions<T, K> }[keyof T];

type OptionalResult = OptionsKeys<OptionalBaseModule>;
// OptionalResult = "event"
