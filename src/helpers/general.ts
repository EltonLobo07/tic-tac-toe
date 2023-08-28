export function joinClasses(...classes: (string | boolean)[]): string {
    let res: string[] = [];
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
