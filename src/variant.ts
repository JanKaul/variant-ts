export class Variant<T, V> {
    tag: T;
    value: V;
    constructor(tag: T, value: V) {
        this.tag = tag;
        this.value = value
    }
}

function construct<T, V, U>(tag: T, value: V): U {
    return new Variant(tag, value) as U
}

export function variant<U>() {
    return construct as <T, V>(tag: T, value: V) => U
}

export function pattern<T>(tag: T) {
    return { tag }
}