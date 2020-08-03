it('checks if the home page works', () => {
  cy.visit(Cypress.env('HOST'))
  cy.contains('todos', { matchCase: false })
})

it('checks if initial tasks are loaded', () => {
  cy.get('ul.todo-list').children().should('have.length', 2)
})

it('successfully adds an element', () => {
  cy.get('input.new-todo').type('Perform E2E tests{enter}')
  cy.get('ul.todo-list').children().should('have.length', 3)
})

it('successfully deletes a task', () => {
  cy.get('button.destroy').eq(2).invoke('show').click()
  cy.get('ul.todo-list').children().should('have.length', 2)
})
