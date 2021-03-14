import { hello } from "../../src/components/Home";

describe('Unit tests', () => {
    it('User not authorized yet', () => {
        expect(hello(null)).toBe("Hello, Stranger!")
    });

    it('User was authorized', () => {
        const user = {
            login: "Aragorn"
        }
        expect(hello(user.login)).toBe(`Hello, ${user.login}!`)
    });
});
