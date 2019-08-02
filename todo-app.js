'use strict'

let todos = []


const filters = {
    searchText : '',
    hideCompleted : false
}

getSavedTodos()

renderTodos(todos, filters)

document.querySelector('#input-search').addEventListener("input", (e) => {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector('#add-todo').addEventListener('submit', (e) => {
    e.preventDefault()
    const submittedTodo = e.target.elements.todo.value
    const submittedTodoObj = {
        id: uuidv4(),
        text : submittedTodo,
        completed : false
    }
    todos.push(submittedTodoObj)
    saveTodos(todos)
    renderTodos(todos, filters)
    e.target.elements.todo.value = ''
})


document.querySelector('#hide-completed').addEventListener('change', (e) => {
    if (e.target.checked) {
        filters.hideCompleted = true
        renderTodos(todos, filters)
    } else {
        filters.hideCompleted = false
        renderTodos(todos, filters)
    }
})


