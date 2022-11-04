export class Variant<T extends string, V> {
    tag: T;
    value: V;
    constructor(tag: T, value: V) {
        this.tag = tag;
        this.value = value
    }
}

function construct<T extends string, V, U>(tag: T, value: V): U {
    return new Variant(tag, value) as U
}

export function variant<U>() {
    return construct as <T extends string, V>(tag: T, value: V) => U
}

export function pattern<T extends string>(tag: T) {
    return { tag }
}