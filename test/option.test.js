import { expect } from '@esm-bundle/chai';
import { some, none } from "../dist/index"

describe("create option", () => {
    it('', () => {
        const one = some("foo")
        const two = none()

        const three = one.map(x => x.concat("bar"))
        const four = two.map(x => x.concat("bar"))

        expect(three.val).to.equal("foobar")
        expect(four.val).to.equal(undefined)
    })
});

describe("getWithDefault", () => {
    it('', () => {
        const one = some("foo")
        const two = none()

        const three = one.unwrapOr("bar")
        const four = two.unwrapOr("bar")

        expect(three).to.equal("foo")
        expect(four).to.equal("bar")
    })
});