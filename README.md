# Variant-ts

Variant, Option and Result types for Typescript

## Variants

```typescript
import { Variant, variant } from "variant-ts";

type Connection =
  | Variant<"IPV4", [number, number, number, number]>
  | Variant<"IPV6", string>;

let ip = variant<Connection>("IPV4", [127, 0, 0, 1]);
```

Variants are very handy when used together with reducers:

```typescript
import { Variant, variant, pattern } from "variant-ts";
import { match } form "ts-pattern";

type State = {
    name: string,
    age: number,
    messages: string[]
}

type Action =
    Variant<"ChangeName", string>
    | Variant<"ChangeAge", number>
    | Variant<"AddMessage", string>

function reducer(state: State, action: Action): State {
    return match(action)
        .with(pattern("ChangeName"), res => { return { name: res.value, ...state } })
        .with(pattern("ChangeAge"), res => { return { age: res.value, ...state } })
        .with(pattern("AddMessage"), res => { return { messages: [...state.messages, res.value], ...state } })
        .exhaustive()
}

let initial_state = {
    name: "John Doe",
    age: 24,
    messages: ["Hey, how are you?", "See you"]
}

let new_state = reducer(initial_state, variant<Action>("AddMessage", "Variants are awesome"))
```

## Options

```typescript
import { none, some } from "variant-ts";

const one = some("foo");
const two = none();

const three = one.map((x) => x.concat("bar"));
const four = two.map((x) => x.concat("bar"));

expect(three.value).to.equal("foobar");
expect(four.value).to.equal(undefined);
```

## Results

```typescript
import { err, ok } from "variant-ts";

const one = ok("foo");
const two = err("error");

const three = one.map((x) => x.concat("bar"));
const four = two.map((x) => x.concat("bar"));

expect(three.value).to.equal("foobar");
expect(four.value).to.equal("error");
```
