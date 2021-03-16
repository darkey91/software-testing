/* eslint-disable @typescript-eslint/no-explicit-any */
const request = require('supertest');
const app = require("./app").app;

const dbMock = {users: [], tasks: []};
jest.mock('./db', () => (
    {db: dbMock}
));

const login = "Aragorn";
const incorrectLogin = "Legolas";
const taskName = "Return and be the King";

describe('API', () => {
    beforeEach(() => {
        dbMock.users = [];
        dbMock.tasks = [];
        jest.restoreAllMocks();
    });

    it('Successful register', async (done) => {
        const user = {login: login};
        const res = await request(app).post('/register').send({
            login: user.login
        });

        const expectedResponse = {msg: "user successfully created", user: user}

        expect(res.status).toBe(200);
        expect(res.body).toMatchObject(expectedResponse);

        done();
    });

    it('Failed registration', async (done) => {
        const user = {login: login};
        dbMock.users.push(user);
        const res = await request(app).post('/register').send({
            login: user.login
        });

        const expectedResponse = {
            errors: ["the user with this login already exists"]
        };
        expect(res.status).toBe(422);
        expect(res.body).toMatchObject(expectedResponse);

        done();
    });

    it('Failed login', async (done) => {
        const res = await request(app).post('/login').send({
            login: incorrectLogin
        });

        const expectedResponse = {
            errors: ["wrong login"], login: incorrectLogin
        };
        expect(res.status).toBe(422);
        expect(res.body).toMatchObject(expectedResponse);

        done();
    });

    it('Successful login', async (done) => {
        dbMock.users.push({login: login});

        const res = await request(app).post('/login').send({
            login: login
        });

        const expectedResponse = {
            msg: "user successfully logged in"
        };

        expect(res.status).toBe(200);
        expect(res.body).toMatchObject(expectedResponse);

        done();
    });

    it('Failed login, but users not empty', async (done) => {
        dbMock.users.push({login: login});

        const res = await request(app).post('/login').send({
            login: incorrectLogin
        });

        const expectedResponse = {
            errors: ["wrong login"], login: incorrectLogin
        };

        expect(res.status).toBe(422);
        expect(res.body).toMatchObject(expectedResponse);

        done();
    });

    it('Task was successfully added', async (done) => {
        const task = {name: taskName, userLogin: login};

        const res = await request(app).post('/add-task').send(task);

        const expectedResponse = {msg: "task was added"};

        expect(res.status).toBe(200);
        expect(res.body).toMatchObject(expectedResponse);

        done();
    });

    it('Failed to add task, name should be unique', async (done) => {
        const task = {name: taskName, userLogin: login};
        dbMock.tasks.push(task);

        const res = await request(app).post('/add-task').send(task);

        const expectedResponse = {errors: ["task with such name already exists"]};

        expect(res.status).toBe(422);
        expect(res.body).toMatchObject(expectedResponse);

        done();
    });

    it('Tasks returned', async (done) => {
        const task1 = {name: taskName, userLogin: login, completed: false};
        const task2 = {name: "Raise an army of the dead to battle", userLogin: login, completed: false};
        const task3 = {name: "See something with your eagle eye", userLogin: incorrectLogin, completed: false};

        dbMock.tasks.push(task1);
        dbMock.tasks.push(task2);
        dbMock.tasks.push(task3);

        const res = await request(app).get(`/tasks?login=${login}`);

        const expectedResponse = {tasks: [task1, task2]};

        expect(res.status).toBe(200);
        expect(res.body).toMatchObject(expectedResponse);

        done();
    });

    it('Complete task', async (done) => {
        const task1 = {name: "Return and be the King", userLogin: login, completed: false};
        const task2 = {name: "Raise an army of the dead to battle", userLogin: login, completed: false};
        const task3 = {name: "See something with your eagle eye", userLogin: incorrectLogin, completed: false};

        dbMock.tasks.push(task1);
        dbMock.tasks.push(task2);
        dbMock.tasks.push(task3);

        expect(dbMock.tasks[0].completed).toBe(false);

        const res = await request(app).post(`/complete-task`).send(
            {userLogin: task1.userLogin, taskName: task1.name}
        );

        expect(res.status).toBe(200);
        expect(dbMock.tasks[0].completed).toBe(true);

        done();
    });
});
