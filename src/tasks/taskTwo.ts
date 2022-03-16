//task2.1
export function myPowFunc(num: number, degree: number) {
    let result = 1;
    for (let i = 0; i < degree; i++) {
        result = result * num;
    }
    return result;
}


//task2.2
type Primitive = Object | number | string;
type NestedArray = Array<NestedArray | Primitive>;

export function myFlatFunc(array: NestedArray): Primitive[] {
    let result: Primitive[] = [];

    for (const value of array) {
        if (Array.isArray(value)) {
            result.push(...myFlatFunc(value));
            continue;
        }
        result.push(value);
    }
    return result;
}