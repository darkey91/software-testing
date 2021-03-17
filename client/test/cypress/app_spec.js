const url = 'http://localhost:3000';

const login = 'Legolas';
const testName = 'Tester';

describe('Home page test', () => {
    it('visits home page without user', () => {
        cy.visit(url);
        cy.get('#login-link').should('be.visible');
        cy.get('#register-link').should('be.visible');
        cy.get('#add-task-link').should('not.be.exist');
        cy.get('#tasks-link').should('not.be.exist');
        cy.get('#logout-link').should('not.be.exist');
        cy.get('#main-phrase').should('contain', 'Hello, Stranger!');
    })

    it('Register user', async () => {
        cy.visit(url + '/register');

        cy.get('#login').type(login);
        cy.get('#register-submit').click();

        cy.url().should('contain', url + '/');
        cy.get('#main-phrase').should('contain', 'Hello, Stranger!');
    });

    it('Incorrect registration', async () => {
        cy.visit(url + '/register');

        cy.get('#login').type(login);
        cy.get('#register-submit').click();

        cy.url().should('contain', url + '/register');
    });

    it('Login', async () => {
        cy.visit(url + '/login');

        cy.get('#login').type(login);
        cy.get('#login-submit').click();

        cy.url().should('contain', url + '/');

        cy.get('#add-task-link').should('be.exist');
        cy.get('#tasks-link').should('be.exist');
        cy.get('#logout-link').should('be.exist');

        cy.get('#login-link').should('not.be.visible');
        cy.get('#register-link').should('not.be.visible');
        cy.get('#main-phrase').should('contain', `Hello, ${login}!`);
    });

    it('Logout', async () => {
        cy.visit(url + '/');

        cy.get('#logout-link').click();

        cy.url().should('contain', url + '/');

        cy.get('#add-task-link').should('not.be.exist');
        cy.get('#tasks-link').should('not.be.exist');
        cy.get('#logout-link').should('not.be.exist');
        cy.get('#login-link').should('be.visible');
        cy.get('#register-link').should('be.visible');
        cy.get('#main-phrase').should('contain', 'Hello, Stranger!');
    });
})