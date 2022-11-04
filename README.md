# MatchingVariants

Variant, Option and Result types for Typescript

## Variants

```typescript
import { Variant, variant, pattern } from "variant-ts";
import { match } form "ts-pattern";

type Connection = Variant<"IPV4", string> | Variant<"IPV6", string>;

let connection = variant<Connection>();

let con1 = connection("IPV4", "127.0.0.1");

let con2 = connection("IPV6", "2001:0db8:85a3:08d3:1319:8a2e:0370:7344");

match(con2)
    .with(pattern("IPV4"), res => {connect_ipv4(res.value)})
    .with(pattern("IPV6"), res => {connect_ipv6(res.value)})
    .exhaustive()
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
import { err, ok } from "matchingvariants";

const one = ok("foo");
const two = err("error");

const three = one.map((x) => x.concat("bar"));
const four = two.map((x) => x.concat("bar"));

expect(three.value).to.equal("foobar");
expect(four.value).to.equal("error");
```
