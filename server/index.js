const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

let users = [];
let tasks = [];

app.post("/register", (req, res) => {
        const newUser = req.body;

        if (users.find(cur => cur.login === newUser.login)) {
            return res.status(422).json({errors: ["the user with this login already exists"]});
        }
        users.push(newUser);
        return res
            .status(200)
            .json({msg: "user successfully created", user: newUser});
    });

app.post("/login", (req, res) => {
    let user = req.body;

    if (users.some(cur => cur.login === user.login)) {
        return res.status(200).json({msg: "user successfully logged in"});
    }
    return res.status(422).json({errors: ["wrong login"], login: user.login});
});

app.post("/add-task", (req, res) => {
    let task = req.body;

    if (tasks.some(cur => cur.name === task.name && cur.userLogin === task.userLogin)) {
        return res.status(422).json({errors: ["task with such name already exists"]});
    }
    tasks.push({
        name: task.name,
        userLogin: task.userLogin,
        completed: false
    })
    return res.status(200).json({msg: "task was added"});
});

app.get("/tasks", (req, res) => {
    let userLogin = req.query.login;

    let userTasks = tasks.filter(cur => cur.userLogin === userLogin);

    return res.status(200).json({tasks: userTasks});
});

app.post("/complete-task", (req, res) => {
    let data = req.body;
    let userLogin = data.userLogin;
    let taskName = data.taskName;

    let task = tasks.find(t => t.name === taskName && t.userLogin === userLogin);
    task.completed = true;
    console.log(task);
    return res.status(200).json({msg: "task was completed"})
});

const port = 8090;

app.listen(port, () => console.log(`Started on port ${port}`));