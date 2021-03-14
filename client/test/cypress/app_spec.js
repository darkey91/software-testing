const PAGE_URL = 'http://localhost:3000';

const testLogin = 'Aragorn';
const testLoginIncorrect = 'Legolas';
const testName = 'Tester';

describe('Home page test', () => {
    it('visits home page', () => {
        cy.visit(PAGE_URL);
        cy.get('#login-link').should('be.visible');
        cy.get('#register-link').should('be.visible');
        cy.get('#add-task-link').should('not.be.visible');
        cy.get('#tasks-link').should('not.be.visible');
        cy.get('#register-link').should('not.be.visible');
        cy.get('#main-phrase').should('contain', 'Hello, Stranger!')
    })
})