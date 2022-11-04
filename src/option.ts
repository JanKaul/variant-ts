import { match } from 'ts-pattern';
import { pattern, Variant } from "./variant";

type Some<T> = BaseOption<"some", T>;

type None = BaseOption<"none", undefined>;

export type Option<T> = Some<T> | None

class BaseOption<V extends string, T> extends Variant<V, T> {
    flatMap<S>(op: (a: T) => Option<S>): Option<S> {
        return match(this as unknown as Option<T>)
            .with(pattern("some"), (res) => op(res.value))
            .with(pattern("none"), (_) => none<S>())
            .exhaustive()
    }
    map<S>(op: (a: T) => S): Option<S> {
        return match(this as unknown as Option<T>)
            .with(pattern("some"), (res) => some(op(res.value)))
            .with(pattern("none"), (_) => none<S>())
            .exhaustive()
    }
    async asyncMap<S>(op: (a: T) => Promise<S>): Promise<Option<S>> {
        return await match(this as unknown as Option<T>)
            .with(pattern("some"), async (res) => some(await op(res.value)))
            .with(pattern("none"), async (_) => none<S>())
            .exhaustive()
    }
    forEach<T>(op: (a: T) => void): void {
        match(this as unknown as Option<T>)
            .with(pattern("some"), (res) => op(res.value))
            .with(pattern("none"), (_) => _)
            .exhaustive()
    }
    getWithDefault(def: T): T {
        return match(this as unknown as Option<T>)
            .with(pattern("some"), (res) => res.value)
            .with(pattern("none"), (_) => def)
            .exhaustive()
    }
    fromNullable(val: T | undefined | null): Option<T> {
        return (val == null ? none<T>() : some(val))
    }
}

export function some<T>(arg: T): Option<T> {
    return new BaseOption("some", arg)
}

export function none<T>(): Option<T> {
    return new BaseOption("none", undefined)
}

