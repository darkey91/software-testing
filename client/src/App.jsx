import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import TasksPage from "./components/TasksPage";
import AddTaskPage from "./components/AddTaskPage";

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path='/' component={() => <HomePage/>}/>
                    <Route exact path='/register' component={() => <RegisterPage/>}/>
                    <Route exact path='/login' component={() => <LoginPage/>}/>
                    <Route exact path='/tasks' component={() => <TasksPage/>}/>
                    <Route exact path='/add-task' component={() => <AddTaskPage />}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
