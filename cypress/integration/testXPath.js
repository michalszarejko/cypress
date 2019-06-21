describe("TODO App Test", () => {
  context("When page loads", () => {
    beforeEach(() => {
      cy.visit("localhost:8888")
    })
    specify("the user can see correctly rendered elements", () => {
      // get the logo as <h1> element and check its text content
      cy.xpath("//h1").should("contain", "todos")

      // check if the input is visible
      cy.xpath("//input[contains(@class, 'new-todo')]").should("be.visible")
    })

    specify("the user can add new todos", () => {
      // add new todos by typing something in the input and hitting enter
      // the input is cleared when you hit enter, so we don't have to do it manually
      cy.xpath("//input[contains(@class, 'new-todo')]").type("Walk the dog{enter}")
      cy.xpath("//input[contains(@class, 'new-todo')]").type("Clean the kitchen{enter}")
      cy.xpath("//input[contains(@class, 'new-todo')]").type("Learn Cypress{enter}")

      // check if all the todos have been added in the correct order
      cy.xpath("//div[contains(@class, 'view')]").eq(0).should("contain", "Walk the dog")
      cy.xpath("//div[contains(@class, 'view')]").eq(1).should("contain", "Clean the kitchen")
      cy.xpath("//div[contains(@class, 'view')]").eq(2).should("contain", "Learn Cypress")
    })

    specify("the user can mark todos as completed", () => {
      // first, we need to create some todos again
      cy.xpath("//input[contains(@class, 'new-todo')]").type("Walk the dog{enter}")
      cy.xpath("//input[contains(@class, 'new-todo')]").type("Clean the kitchen{enter}")
      cy.xpath("//input[contains(@class, 'new-todo')]").type("Learn Cypress{enter}")

      // then, let's mark one of them as completed and leave the other alone
      cy.xpath("//section[contains(@class, 'main')]//div[contains(@class, 'view')]").eq(0).within(() => {
        cy.xpath(".//input").check()
      })

      // finally, let's see if the correct one has been marked
      // if you check your devtools, you'll see that <li> element gets "completed" class when marked
      cy.xpath("//ul/li").eq(0).should("have.class", "completed")
      cy.xpath("//ul/li").eq(1).should("not.have.class", "completed")
      cy.xpath("//ul/li").eq(2).should("not.have.class", "completed")
    })

    specify("the user can remove todos", () => {
      // first, create new todos again
      // this is getting tedious, isn't it? we'll try to do something about it later
      cy.xpath("//input[contains(@class, 'new-todo')]").type("Walk the dog{enter}")
      cy.xpath("//input[contains(@class, 'new-todo')]").type("Clean the kitchen{enter}")
      cy.xpath("//input[contains(@class, 'new-todo')]").type("Learn Cypress{enter}")

      // then, let's show the "X" button and click it to remove a todo
      cy.xpath("//button[contains(@class, 'destroy')]").eq(0).invoke("show").click()

      // finally, let's see if we have a correct number of todos
      // and if the correct one has been removed
      cy.xpath("//div[contains(@class, 'view')]")
        .should("have.length", 2)
        .and("contain", "Clean the kitchen")
        .and("contain", "Learn Cypress")
    })

    specify("the user can clear completed todos", () => {
      // first, create new todos again
      cy.xpath("//input[contains(@class, 'new-todo')]").type("Walk the dog{enter}")
      cy.xpath("//input[contains(@class, 'new-todo')]").type("Clean the kitchen{enter}")
      cy.xpath("//input[contains(@class, 'new-todo')]").type("Learn Cypress{enter}")

      // then, let's mark some of them as completed
      cy.xpath("//section[contains(@class, 'main')]//div[contains(@class, 'view')]").eq(0).within(() => {
        cy.xpath(".//input").check()
      })
      cy.xpath("//section[contains(@class, 'main')]//div[contains(@class, 'view')]").eq(1).within(() => {
        cy.xpath(".//input").check()
      })

      // finally, let's clear completed todos
      // and check if it worked properly
      cy.xpath("//button[contains(., 'Clear completed')]").click()
      cy.xpath("//div[contains(@class, 'view')]")
        .should("have.length", 1)
        .and("contain", "Learn Cypress")
        .and("not.contain", "Walk the dog")
        .and("not.contain", "Clean the kitchen")
    })

    specify("the user can edit todos", () => {
      // first, create todos
      cy.xpath("//input[contains(@class, 'new-todo')]").type("Walk the dog{enter}")
      cy.xpath("//input[contains(@class, 'new-todo')]").type("Clean the kitchen{enter}")
      cy.xpath("//input[contains(@class, 'new-todo')]").type("Learn Cypress{enter}")

      // then, edit one of them
      cy.contains("Walk the dog").dblclick()
      cy.xpath("//input[contains(@class, 'edit')]").first().clear().type("I've been edited{enter}")

      // and check if the correct one's been edited
      cy.xpath("//div[contains(@class, 'view')]").first().should("contain", "I've been edited")
      cy.xpath("//div[contains(@class, 'view')]").eq(1).should("contain", "Clean the kitchen")
      cy.xpath("//div[contains(@class, 'view')]").eq(2).should("contain", "Learn Cypress")
    })
  })
})
