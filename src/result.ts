import { match } from 'ts-pattern';
import { Variant, pattern } from './variant';

type Ok<T> = BaseResult<"ok", T>;

type Err<E> = BaseResult<"err", E>;

export type Result<T, E> = Ok<T> | Err<E>

class BaseResult<S, T> extends Variant<S, T> {
    flatMap<V, E>(op: (a: T) => Result<V, E>): Result<V, E> {
        return match(this as Result<T, E>)
            .with(pattern("ok"), (res) => op(res.value))
            .with(pattern("err"), (res) => res)
            .exhaustive()
    }
    map<V, E>(op: (a: T) => V): Result<V, E> {
        return match(this as Result<T, E>)
            .with(pattern("ok"), (res) => ok<V, E>(op(res.value)))
            .with(pattern("err"), (res) => res)
            .exhaustive()
    }
    async asyncMap<V, E>(op: (a: T) => Promise<V>): Promise<Result<V, E>> {
        return await match(this as Result<T, E>)
            .with(pattern("ok"), async (res) => ok<V, E>(await op(res.value)))
            .with(pattern("err"), async (res) => res)
            .exhaustive()
    }
    forEach<T, E>(op: (a: T) => void): void {
        match(this as unknown as Result<T, E>)
            .with(pattern("ok"), (res) => op(res.value))
            .with(pattern("err"), (_) => _)
            .exhaustive()
    }
    async toPromise<T, E>(): Promise<T> {
        return await match(this as unknown as Result<T, E>)
            .with(pattern("ok"), x => Promise.resolve(x.value))
            .with(pattern("err"), x => Promise.reject(x.value))
            .exhaustive()
    }
    getWithDefault<E>(def: T): T {
        return match(this as Result<T, E>)
            .with(pattern("ok"), (res) => res.value)
            .with(pattern("err"), (_) => def)
            .exhaustive()
    }
}

export function ok<T, E>(arg: T): Result<T, E> {
    return new BaseResult("ok", arg)
}

export function err<T, E>(arg: E): Result<T, E> {
    return new BaseResult("err", arg)
}

