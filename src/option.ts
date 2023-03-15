import { match } from 'ts-pattern';
import { ok, Result, err } from './result';
import { pattern, Variant } from "./variant";

type Some<T> = BaseOption<"some", T>;

type None = BaseOption<"none", never>;

export type Option<T> = Some<T> | None

class BaseOption<V, T> extends Variant<V, T> {
    flatMap<S>(op: (a: T) => Option<S>): Option<S> {
        return match(this as Option<T>)
            .with(pattern("some"), (res) => op(res.val))
            .with(pattern("none"), (_) => none<S>())
            .exhaustive()
    }
    map<S>(op: (a: T) => S): Option<S> {
        return match(this as Option<T>)
            .with(pattern("some"), (res) => some(op(res.val)))
            .with(pattern("none"), (_) => none<S>())
            .exhaustive()
    }
    async asyncMap<S>(op: (a: T) => Promise<S>): Promise<Option<S>> {
        return await match(this as Option<T>)
            .with(pattern("some"), async (res) => some(await op(res.val)))
            .with(pattern("none"), async (_) => none<S>())
            .exhaustive()
    }
    forEach(op: (a: T) => void): void {
        match(this as Option<T>)
            .with(pattern("some"), (res) => op(res.val))
            .with(pattern("none"), (_) => _)
            .exhaustive()
    }
    getWithDefault(def: unknown): T {
        return match(this as Option<T>)
            .with(pattern("some"), (res) => res.val)
            .with(pattern("none"), (_) => def as T)
            .exhaustive()
    }
    toUndefined(): T | undefined {
        return match(this as Option<T>)
            .with(pattern("some"), (res) => res.val)
            .with(pattern("none"), (_) => undefined)
            .exhaustive()
    }
    okOr<E>(e: E): Result<T, E> {
        return match(this as Option<T>)
            .with(pattern("some"), (res) => ok<T, E>(res.val))
            .with(pattern("none"), (_) => err<T, E>(e))
            .exhaustive()
    }
}

export function some<T>(arg: T): Option<T> {
    return new BaseOption("some", arg)
}

export function none<T>(): Option<T> {
    return new BaseOption("none", undefined as never)
}

export function nullable<T>(val: T | undefined | null): Option<T> {
    return (val == null ? none<T>() : some(val))
}