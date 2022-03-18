import { expect } from 'chai'

describe('MATH FUNCTIONS', () => {
    const a = 4;
    const b = 5;
    const c = 9;
    const d = -1;

    it.skip('A + B = C', () => { //skip
        expect(a + b).to.eq(c);
    })

    it.only('A - B = D', () => { //only
        expect(a - b).to.eq(d);
    })
})