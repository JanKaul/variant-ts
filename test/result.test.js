import { expect } from '@esm-bundle/chai';
import { ok, err } from "../dist/index"

describe("create result", () => {
    it('', () => {
        const one = ok("foo")
        const two = err("error")

        const three = one.map(x => x.concat("bar"))
        const four = two.map(x => x.concat("bar"))

        expect(three.val).to.equal("foobar")
        expect(four.val).to.equal("error")
    })
});