describe("TODO App Test", () => {
  context("When page loads", () => {
    beforeEach(() => {
      cy.visit("localhost:8888")
    })
    specify("the user can see correctly rendered elements", () => {
      // get the logo as <h1> element and check its text content
      cy.get("h1").should("contain", "todos")

      // or just check if the text "todos" is on the page
      cy.contains("todos")

      // finally, check if the input is visible
      cy.get(".new-todo").should("be.visible")

      // or, if you want to be super efficient
      cy.get(".new-todo")
    })

    specify("the user can add new todos", () => {
      // add new todos by typing something in the input and hitting enter
      // the input is cleared when you hit enter, so we don't have to do it manually
      cy.get(".new-todo").type("Walk the dog{enter}")
      cy.get(".new-todo").type("Clean the kitchen{enter}")
      cy.get(".new-todo").type("Learn Cypress{enter}")

      // check if all the todos have been added in the correct order
      cy.get("div.view").eq(0).should("contain", "Walk the dog")
      cy.get("div.view").eq(1).should("contain", "Clean the kitchen")
      cy.get("div.view").eq(2).should("contain", "Learn Cypress")
    })

    specify("the user can mark todos as completed", () => {
      // first, we need to create some todos again
      cy.get(".new-todo").type("Walk the dog{enter}")
      cy.get(".new-todo").type("Clean the kitchen{enter}")
      cy.get(".new-todo").type("Learn Cypress{enter}")

      // then, let's mark one of them as completed and leave the other alone
      cy.get(".toggle").eq(0).check()

      // finally, let's see if the correct one has been marked
      // if you check your devtools, you'll see that <li> element gets "completed" class when marked
      cy.get("li").eq(0).should("have.class", "completed")
      cy.get("li").eq(1).should("not.have.class", "completed")
      cy.get("li").eq(2).should("not.have.class", "completed")
    })

    specify("the user can remove todos", () => {
      // first, create new todos again
      // this is getting tedious, isn't it? we'll try to do something about it later
      cy.get(".new-todo").type("Walk the dog{enter}")
      cy.get(".new-todo").type("Clean the kitchen{enter}")
      cy.get(".new-todo").type("Learn Cypress{enter}")

      // then, let's show the "X" button and click it to remove a todo
      cy.get(".destroy").eq(0).invoke("show").click()

      // finally, let's see if we have a correct number of todos
      // and if the correct one has been removed
      cy.get("div.view")
        .should("have.length", 2)
        .and("contain", "Clean the kitchen")
        .and("contain", "Learn Cypress")
    })

    specify("the user can clear completed todos", () => {
      // first, create new todos again
      cy.get(".new-todo").type("Walk the dog{enter}")
      cy.get(".new-todo").type("Clean the kitchen{enter}")
      cy.get(".new-todo").type("Learn Cypress{enter}")

      // then, let's mark some of them as completed
      cy.get(".toggle").eq(0).click()
      cy.get(".toggle").eq(1).click()

      // finally, let's clear completed todos
      // and check if it worked properly
      cy.contains("Clear completed").click()
      cy.get("div.view")
        .should("have.length", 1)
        .and("contain", "Learn Cypress")
        .and("not.contain", "Walk the dog")
        .and("not.contain", "Clean the kitchen")
    })

    specify("the user can edit todos", () => {
      // first, create todos
      cy.get(".new-todo").type("Walk the dog{enter}")
      cy.get(".new-todo").type("Clean the kitchen{enter}")
      cy.get(".new-todo").type("Learn Cypress{enter}")

      // then, edit one of them
      cy.contains("Walk the dog").dblclick()
      cy.get("input.edit").first().clear().type("I've been edited{enter}")

      // and check if the correct one's been edited
      cy.get("div.view").first().should("contain", "I've been edited")
      cy.get("div.view").eq(1).should("contain", "Clean the kitchen")
      cy.get("div.view").eq(2).should("contain", "Learn Cypress")
    })
  })
})
