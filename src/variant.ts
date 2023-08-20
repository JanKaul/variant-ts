export class Variant<T, V> {
    tag: T;
    val: V;
    constructor(tag: T, val: V) {
        this.tag = tag;
        this.val = val
    }
}

export function variant<U extends Variant<unknown, unknown>>(tag: U["tag"], val: U["val"]): U {
    return new Variant(tag, val) as U
}

type Pattern<T> = {
    tag: T
}

export function pattern<T>(tag: T): Pattern<T> {
    return { tag }
}