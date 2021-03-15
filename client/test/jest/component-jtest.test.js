import React from "react";
import Home from "../../src/components/Home";
import {localStorageMock} from "../localStorageMock";
import App from "../../src/App";
import {NavLink} from "react-router-dom";
const TestRenderer = require('react-test-renderer');

Object.defineProperty(window, 'sessionStorage', {
    value: localStorageMock
});

describe('Component test for Home component', () => {
    beforeEach(() => {
        window.sessionStorage.clear();
        jest.restoreAllMocks();
    });
    it('Render with user', () => {
        const user = {login: "Aragorn"};
        window.sessionStorage.setItem("userLogin", user.login);

        const testRender = TestRenderer.create(<Home/>);
        const testInstance = testRender.root;

        expect(testInstance.findByProps({id:"main-phrase"}).props.children).toEqual(`Hello, ${user.login}!`)
    });

    it('Render without user', () => {
        const testRender = TestRenderer.create(<Home/>);
        const testInstance = testRender.root;

        expect(testInstance.findByProps({id:"main-phrase"}).props.children).toEqual(`Hello, Stranger!`)
    });

    it('Render menu page content without user', () => {
        const testRender = TestRenderer.create(<App/>);
        const testInstance = testRender.root;
        const elements = testInstance.findAllByType(NavLink).map((element) =>
            element.props.children
        );
        expect(elements).toContain('Home');
        expect(elements).toContain('Register');
        expect(elements).toContain('Login');

        expect(elements).not.toContain('Logout');
        expect(elements).not.toContain('Tasks');
        expect(elements).not.toContain('Add task');
    });

    it('Render menu page content with user', () => {
        const user = { login: "Aragorn" };
        window.sessionStorage.setItem("userLogin", user.login)
        const testRender = TestRenderer.create(<App/>);
        const testInstance = testRender.root;
        const elements = testInstance.findAllByType(NavLink).map((element) =>
            element.props.children
        );
        expect(elements).toContain('Home');

        expect(elements).toContain('Logout');
        expect(elements).toContain('Tasks');
        expect(elements).toContain('Add task');

        expect(elements).not.toContain('Login');
        expect(elements).not.toContain('Register');
    });
});