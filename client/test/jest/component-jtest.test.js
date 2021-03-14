// import React from "react";
// import IndexPage from "../pages";
// const TestRenderer = require('react-test-renderer');
//
// jest.mock('../lib/userUtils', () => {
//     const original = jest.requireActual('../lib/userUtils');
//     original.default.useUser = jest.fn();
//     return original;
// });
//
// describe('Component test for IndexPage component', () => {
//     it('Render with user', () => {
//         const user = {login: "Aragorn"};
//
//         jest.requireMock('../lib/userUtils').default.useUser
//             .mockReturnValue(
//                  {loading: false, loggedIn: true, user: user, mutate: undefined}
//             );
//
//         const testRender = TestRenderer.create(<IndexPage/>);
//         const testInstance = testRender.root;
//
//         expect(testInstance.children[0].findByProps({id:"main_phrase"}).props.children).toEqual(`Hello, ${user.login}!`)
//     });
//     it('Render without user', () => {
//         const user = null
//
//         jest.requireMock('../lib/userUtils').default.useUser
//             .mockReturnValue(
//                 {loading: false, loggedIn: false, user: user, mutate: undefined}
//             );
//
//         const testRender = TestRenderer.create(<IndexPage/>);
//         const testInstance = testRender.root;
//         expect(testInstance.children[0].findByProps({id:"main_phrase"}).props.children).toEqual(`Hello, Stranger!`)
//     });
// });