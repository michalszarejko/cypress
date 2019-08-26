Cypress.Commands.add("createTodos", () => {
    cy.get(".new-todo").type("First todo{enter}")
    cy.get(".new-todo").type("Second todo{enter}")
    cy.get(".new-todo").type("Third todo{enter}")
})

Cypress.Commands.add("editTodo", (oldText, newText) => {
    cy.contains(oldText).dblclick()
    cy.get("li.editing>input.edit").clear().type(`${newText}{enter}`)
})