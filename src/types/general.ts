export type KeyValueMap<
    TKey extends keyof TObj, 
    TObj extends object
> = {
    [K in TKey]: TObj[K]
};

export type ValidChild = string | JSX.Element | ValidChild[];

export type FlattenOneLvl<T> = T extends Array<infer NT> ? NT : T;

type _TillNumInclusive<
    TNum extends number,
    TResult extends number = 0,
    TTup extends unknown[] = []
> = TTup["length"] extends TNum 
    ? TResult | TTup["length"]
    : _TillNumInclusive<TNum, TResult | TTup["length"], [...TTup, unknown]>;

export type TillNumInclusive<TNum extends number> = _TillNumInclusive<TNum>;

