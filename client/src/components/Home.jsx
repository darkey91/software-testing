import React from 'react';

export const hello = (userLogin) => {
    if (userLogin) {
        return `Hello, ${userLogin}!`
    }
    return "Hello, Stranger!"
}

export const Home = () => {
    const userLogin = sessionStorage.getItem("userLogin");

    return (
        <div id="main-phrase">{hello(userLogin)}</div>
    );
};

export default Home;