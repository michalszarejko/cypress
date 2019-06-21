Cypress.Commands.add("createTodos", () => {
  cy.get(".new-todo").type("Walk the dog{enter}")
  cy.get(".new-todo").type("Clean the kitchen{enter}")
  cy.get(".new-todo").type("Learn Cypress{enter}")
})

Cypress.Commands.add("editTodo", () => {
  cy.get("label").first().dblclick()
  cy.get("input.edit").first().clear().type("I've been edited{enter}")
})

Cypress.Commands.add("editTodo", (oldText, newText) => {
  cy.contains(oldText).dblclick()
  cy.get("li.editing>input.edit").clear().type(`${newText}{enter}`)
})
