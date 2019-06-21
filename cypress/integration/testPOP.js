import TodoPage from "../support/pages/todoPage"

const todoPage = new TodoPage

describe("TODO App Test", () => {
  context("When page loads", () => {
    beforeEach(() => {
      cy.visit("localhost:8888")
    })
    specify("the user can see correctly rendered elements", () => {
      // get the logo and check if it's visible
      todoPage.logo().should("be.visible")

      // check if the input is visible
      todoPage.newTodoInput().should("be.visible")

      // or, if you want to be super efficient
      todoPage.newTodoInput()
    })

    specify("the user can add new todos", () => {
      // add new todos using createTodos command
      cy.createTodos()

      // check if all the todos have been added in the correct order
      todoPage.todos().eq(0).should("contain", "Walk the dog")
      todoPage.todos().eq(1).should("contain", "Clean the kitchen")
      todoPage.todos().eq(2).should("contain", "Learn Cypress")
    })

    specify("the user can mark todos as completed", () => {
      // first, we need to create some todos again
      cy.createTodos()

      // then, let's mark one of them as completed and leave the other alone
      todoPage.todos().first().within(() => {
        todoPage.toggleCompleted()
      })

      // finally, let's see if the correct one has been marked
      // if you check your devtools, you'll see that <li> element gets "completed" class when marked
      todoPage.todos().parent().eq(0).should("have.class", "completed")
      todoPage.todos().parent().eq(1).should("not.have.class", "completed")
      todoPage.todos().parent().eq(2).should("not.have.class", "completed")
    })

    specify("the user can remove todos", () => {
      // first, create new todos again
      cy.createTodos()

      // then, let's show the "X" button and click it to remove a todo
      todoPage.removeTodoButton().eq(0).invoke("show").click()

      // finally, let's see if we have a correct number of todos
      // and if the correct one has been removed
      todoPage.todos().should("have.length", 2)
      todoPage.todos().contains("Clean the kitchen")
      todoPage.todos().contains("Learn Cypress")
    })

    specify("the user can clear completed todos", () => {
      // first, create new todos again
      cy.createTodos()

      // then, let's mark some of them as completed
      todoPage.todos().first().within(() => {
        todoPage.toggleCompleted()
      })
      todoPage.todos().eq(1).within(() => {
        todoPage.toggleCompleted()
      })

      // finally, let's clear completed todos
      // and check if it worked properly
      todoPage.clearCompletedButton().click()
      todoPage.todos()
        .should("have.length", 1)
        .and("contain", "Learn Cypress")
        .and("not.contain", "Walk the dog")
        .and("not.contain", "Clean the kitchen")
    })

    specify("the user can edit todos", () => {
      // first, create todos
      cy.createTodos()

      // then, edit one of them
      cy.editTodo("Walk the dog", "I've been edited")

      // and check if the correct one's been edited
      todoPage.todos().first().should("contain", "I've been edited")
      todoPage.todos().eq(1).should("contain", "Clean the kitchen")
      todoPage.todos().eq(2).should("contain", "Learn Cypress")
    })
  })
})
