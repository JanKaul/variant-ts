import { none, some, Option } from './option';
import { Variant } from './variant';

type Ok<T> = BaseResult<"ok", T, never>;

type Err<E> = BaseResult<"err", never, E>;

export type Result<T, E> = Ok<T> | Err<E>

class BaseResult<S, T, E> extends Variant<S, T | E> {
    andThen<V, E>(op: (a: T) => Result<V, E>): Result<V, E> {
        switch ((this as Result<T, E>).tag) {
            case "ok":
                return op(this.val as T);
            case "err":
                return this as Result<T, E> as Result<V, E>;
        }
    }
    map<V, E>(op: (a: T) => V): Result<V, E> {
        switch ((this as Result<T, E>).tag) {
            case "ok":
                return ok(op(this.val as T));
            case "err":
                return this as Result<T, E> as Result<V, E>;
        }
    }
    async asyncMap<V, E>(op: (a: T) => Promise<V>): Promise<Result<V, E>> {
        switch ((this as Result<T, E>).tag) {
            case "ok":
                return ok(await op(this.val as T));
            case "err":
                return this as Result<T, E> as Result<V, E>;
        }
    }
    forEach<E>(op: (a: T) => void): void {
        switch ((this as Result<T, E>).tag) {
            case "ok":
                op(this.val as T);
        }
    }
    async toPromise<E>(): Promise<T> {
        switch ((this as Result<T, E>).tag) {
            case "ok":
                return Promise.resolve(this.val as T);
            case "err":
                return Promise.reject(this.val);
        }
    }
    unwrapOr<E>(def: T): T {
        switch ((this as Result<T, E>).tag) {
            case "ok":
                return this.val as T;
            case "err":
                return def;
        }
    }
    ok<E>(): Option<T> {
        switch ((this as Result<T, E>).tag) {
            case "ok":
                return some(this.val as T);
            case "err":
                return none();
        }
    }
    try<V>(): V {
        switch ((this as Result<T, E>).tag) {
            case "ok":
                return this.val as V;
            case "err":
                throw new Error(this.val.toString());
        }
    }
}

export function ok<T, E>(arg: T): Result<T, E> {
    return new BaseResult<"ok", T, never>("ok", arg)
}

export function err<T, E>(arg: E): Result<T, E> {
    return new BaseResult<"err", never, E>("err", arg)
}

