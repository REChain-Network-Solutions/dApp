export interface kvFunction {
    [key: string]: {
        resolve: (...args: any[]) => any,
        reject: (...args: any[]) => any,
        method: string,
    }
}
