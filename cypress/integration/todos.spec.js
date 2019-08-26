import TodoPage from "../support/pages/todo_page"

const todoPage = new TodoPage


describe("Todos spec", () => {
    beforeEach(() => {
        cy.visit("/")
    })

specify("", () => {

})

    specify("test", () => {
    cy.contains("todos")
    cy.get(".new-todo").type("Pierwsze todo{enter}")
    cy.get(".new-todo").type("Pierwsze2 todo{enter}")
    cy.get(".new-todo").type("Pierwsze3 todo{enter}")

    cy.get("input.toggle").eq(1).click()
  })

  specify("assertions", () => {
      cy.get("h1").should("exist")
      cy.get("footer").should("contain", "Double-click to edit a todo").and("contain" , "Created by petehunt")
      cy.contains("footer", "Double-click to edit a todo")
      
  })

    specify("page renders correctly", () => {
        cy.get("h1").should("contain", "todos").and("be.visible")
        
    })

    
    specify("user can add todos", () => {
        cy.get(".new-todo").type("hello{enter}")
        cy.get(".new-todo").type("my name is{enter}")
        cy.get(".new-todo").type("michal{enter}")
        cy.get(".main").should("contain", "hello").and("be.visible")
        cy.get(".").should("contain", "hello").and("be.visible")
        
    })

    specify("user can mark todos as done", () => {
        cy.get(".new-todo").type("Pierwsze todo{enter}")
        cy.get(".new-todo").type("Pierwsze2 todo{enter}")
        cy.get(".new-todo").type("Pierwsze3 todo{enter}")
        cy.get("input.toggle").eq(1).click()
        cy.get("li").eq(1).should("have.class", "completed")
        
    })

    specify("user can remove todos as done", () => {
        cy.get(".new-todo").type("Pierwsze todo{enter}")
        todoPage.newTodoInput.type("Pierwsze2 todo{enter}")
        todoPage.newTodoInput.type("Pierwsze3 todo{enter}")
        cy.get("input.toggle").eq(1).click()
        cy.get("li").eq(1).should("have.class", "completed")
        cy.get(".destroy").eq(1).invoke("show").click()
        cy.get("ul.todo-list>li").should("have.length", 2)
        .and("contain", "Pierwsze todo")
        .and("contain", "Pierwsze3 todo")
        
    })

    specify("user can clear todos as done", () => {
        cy.get(".new-todo").type("Pierwsze todo{enter}")
        cy.get(".new-todo").type("Pierwsze2 todo{enter}")
        cy.get(".new-todo").type("Pierwsze3 todo{enter}")
        cy.get("input.toggle").eq(0).click()
        cy.get("input.toggle").eq(1).click()
        cy.get("input.toggle").eq(2).click()
        cy.get(".clear-completed").click()
        cy.get("ul.todo-list>li").should("have.length", 0)
        
    })

    specify("user can edit todos", () => {
        cy.createTodos()
        cy.get("div.view>label").first().dblclick()


        
    })
})