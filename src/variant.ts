export class Variant<T, V> {
    tag: T;
    value: V;
    constructor(tag: T, value: V) {
        this.tag = tag;
        this.value = value
    }
}

export function variant<U>(tag: any, value: any): U {
    return new Variant(tag, value) as U
}

type Pattern<T> = {
    tag: T
}

export function pattern<T>(tag: T): Pattern<T> {
    return { tag }
}