import React from "react";
import {NavLink} from "react-router-dom";
import './Header.css';

const Header = () => {
    const userLogin = sessionStorage.getItem('userLogin');
    let isLogin = userLogin !== undefined && userLogin != null;

    const onLogout = () => {
        sessionStorage.removeItem('userLogin');
        isLogin = false;
    }

    return (
        <div className='link-container'>
            <NavLink className='link' to="/">Home</NavLink>
            {isLogin ? (<NavLink id="logout-link" className='link' to="/" onClick={onLogout}>Logout</NavLink>) : (<NavLink id="login-link" className='link' to='/login'>Login</NavLink>)}
            {!isLogin && <NavLink id="register-link" className='link' to="/register">Register</NavLink>}
            {isLogin && <NavLink id="tasks-link" className='link' to="/tasks">Tasks</NavLink>}
            {isLogin && <NavLink id="add-task-link" className='link' to="/add-task">Add task</NavLink>}
        </div>
    );
};

export default Header;