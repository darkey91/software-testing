import React from "react";
const { hello } = require('../../src/components/Home');

const chai = require('chai')
    , should = chai.should();

describe('Unit tests', () => {
    it('User not authorized yet', () => {
        let label = hello(null);
        label.should.be.equal("Hello, Stranger!")
    });

    it('User undefied', () => {
        let label = hello(undefined);
        label.should.be.equal("Hello, Stranger!")
    });

    it('User was authorized', () => {
        const user = {
            login: "Aragorn"
        }
        let label = hello(user.login);
        label.should.be.equal(`Hello, ${user.login}!`)
    });
});
