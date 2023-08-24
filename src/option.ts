import { ok, Result, err } from './result';
import { Variant } from "./variant";

type Some<T> = BaseOption<"some", T>;

type None = BaseOption<"none", never>;

export type Option<T> = Some<T> | None

class BaseOption<V, T> extends Variant<V, T> {
    andThen<S>(op: (a: T) => Option<S>): Option<S> {
        switch ((this as Option<T>).tag) {
            case "some":
                return op(this.val);
            case "none":
                return none();
        }
    }
    map<S>(op: (a: T) => S): Option<S> {
        switch ((this as Option<T>).tag) {
            case "some":
                return some(op(this.val));
            case "none":
                return none();
        }
    }
    async asyncMap<S>(op: (a: T) => Promise<S>): Promise<Option<S>> {
        switch ((this as Option<T>).tag) {
            case "some":
                return some(await op(this.val));
            case "none":
                return none();
        }
    }
    forEach(op: (a: T) => void): void {
        switch ((this as Option<T>).tag) {
            case "some":
                op(this.val);
        }
    }
    unwrapOr(def: unknown): T {
        switch ((this as Option<T>).tag) {
            case "some":
                return this.val;
            case "none":
                return def as T;
        }
    }
    toUndefined(): T | undefined {
        switch ((this as Option<T>).tag) {
            case "some":
                return this.val;
            case "none":
                return undefined;
        }
    }
    okOr<E>(e: E): Result<T, E> {
        switch ((this as Option<T>).tag) {
            case "some":
                return ok(this.val);
            case "none":
                return err(e);
        }
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