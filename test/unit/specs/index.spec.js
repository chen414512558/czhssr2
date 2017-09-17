import funcLib from '../../../src/webapp/libs/index';
//
describe("测试", function() {
    it("函数测试", function() {
        expect(funcLib.add(1)).toBe(2);
        // expect(funcLib.add(3)).toBe(4);
    });
});