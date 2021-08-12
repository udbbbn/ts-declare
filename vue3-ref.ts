/**
 * 最终目标支持以下多层嵌套格式
 *
 * ts 不支持递归之前 该 pr 使用 索引签名 完成递归功能
 * https://github.com/vuejs/vue-next/commit/c6b7afcc23faefd8c504c3c5705ecb5b0f4be0fd#diff-2751769c8b46d7bef1f06b254c0257f1
 *
 * const count = ref({
 *  foo: ref('1'),
 *  bar: ref(2)
 * })
 */

type Ref<T = any> = {
  value: T;
};

// ts 4.3.5 支持遍历
// type UnwrapRef<T> = T extends Ref<infer R> ? R : T extends object ? {[K in keyof T]: UnwrapRef<T[K]>} : T;

// 使用 索引签名 完成遍历
type UnwrapRef<T> = {
  ref: T extends Ref<infer R> ? R : T;
  object: { [K in keyof T]: UnwrapRef<T[K]> };
  stop: T;
}[T extends Ref ? "ref" : T extends object ? "object" : "stop"];

function ref<T>(value: T): T extends Ref ? T : Ref<UnwrapRef<T>>;

const count1 = ref(2);
count1.value; // (property) value: number

const count2 = ref(ref("2"));
count2.value; // (property) value: string

const count3 = ref({
  foo: ref("1"),
});
count3.value.foo;
// 没有做对象的处理时结果为： (property) foo: Ref<string>
// 最终结果为： (property) foo: string
