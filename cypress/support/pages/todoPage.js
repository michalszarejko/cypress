class TodoPage {
  url() {
    return "localhost:8888"
  }

  logo() {
    return cy.contains("todos")
  }

  newTodoInput() {
    return cy.get(".new-todo")
  }

  todos() {
    return cy.get("div.view")
  }

  toggleCompleted() {
    return cy.get(".toggle").click()
  }

  removeTodoButton() {
    return cy.get(".destroy")
  }

  clearCompletedButton() {
    return cy.contains("Clear completed")
  }
}

export default TodoPage
