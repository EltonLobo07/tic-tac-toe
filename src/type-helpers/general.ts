export type KeyValueMap<
    TKey extends keyof TObj, 
    TObj extends object
> = {
    [K in TKey]: TObj[K]
};

export type ValidChild = string | JSX.Element | ValidChild[];

export type FlattenOneLvl<T> = T extends Array<infer NT> ? NT : T;
