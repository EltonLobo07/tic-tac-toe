export function joinClasses(...classes: (string | boolean)[]): string {
    const res: string[] = [];
    for (let i = 0; i < classes.length; i += 1) {
        const curClass = classes[i];
        if (typeof curClass === "string" && curClass) {
            res.push(curClass);
        }
    }
    return res.join(" ");
}

export function assertNever(_x: never, errorMsg: string) {
    throw new Error(errorMsg);
}

export function removeKeyFromLS(key: string) {
    window.localStorage.removeItem(key);
} 

export function arrShallowEq<TArr extends unknown[]>(arr1: TArr, arr2: TArr): boolean {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i += 1) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

/*
type Fn = (...args: any[]) => any; 
export function fnCompose<
    TFn extends Fn, 
    TFnAlwaysCall extends Fn
>(fn: TFn, fnAlwaysCallAtTheEnd: TFnAlwaysCall, ...fnAlwaysCallArgs: Parameters<TFnAlwaysCall>) {
    return (...args: Parameters<TFn>) => {
        fn(...args);
        fnAlwaysCallAtTheEnd(...fnAlwaysCallArgs);
    };
}
*/
