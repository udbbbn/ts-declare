interface Action<T> {
  payload?: T;
  type: string;
}

interface Module {
  count: number;
  message: string;
  asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>;
  syncMethod<T, U>(action: Action<T>): Action<U>;
}

`
  在经过 Connect 函数之后，返回值类型为

  type Result = {
    asyncMethod<T, U>(input: T): Action<U>;
    syncMethod<T, U>(action: T): Action<U>;
  }
`;

// 获取函数中值为 函数 的键值
type FuncName<T> = {
  [P in keyof T]: T[P] extends Function ? P : never;
}[keyof T];

// 方案一
type EffectModuleFunc<T> = {
  [P in keyof T]: T[P] extends (arg: Promise<infer J>) => Promise<infer K>
    ? (input: J) => K
    : T[P];
};

type Connect = (
  module: Module
) => { [K in FuncName<Module>]: EffectModuleFunc<Module>[K] };

// 方案二
type EffectModuleFunc2<T> = T extends (
  arg: Promise<infer J>
) => Promise<infer K>
  ? (input: J) => K
  : T;

type Connect2 = (
  module: Module
) => { [K in FuncName<Module>]: EffectModuleFunc2<Module[K]> };

/**
 *
 * 个人理解 理论上 应该写的没有错 但是不知道为什么 类型显示 unknown...
 * 在 ts playground 也是一样
 * 目前能搜索到的其他类似代码 写法也是类似的 也验证过他人代码也显示 unknown
 *
 * type Connect = (module: Module) => {
 *  asyncMethod: (input: unknown) => Action<unknown>;
 *  syncMethod: <T, U>(action: Action<T>) => Action<U>;
 * }
 */
