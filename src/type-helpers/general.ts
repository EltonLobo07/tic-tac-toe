export type KeyValueMap<
    TKey extends keyof TObj, 
    TObj extends object
> = {
    [K in TKey]: TObj[K]
};

export type ValidChild = string | JSX.Element;
