'use strict'

// reading previous data
const getSavedTodos = () => {
    const todoJSON = localStorage.getItem('todos')
    try{
        todos = todoJSON ? JSON.parse(todoJSON) : []
    } catch (e) {
        todos = []
    }
    
}


// Sets todo to completed
const completeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => id === todo.id)

    if (todoIndex > -1){
        todos[todoIndex].completed = true
    }
}

// Sets todo to incomplete 
const uncompletedTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => id === todo.id)

    if (todoIndex > -1){
        todos[todoIndex].completed = false
    }
}

// Removes selected Todo
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => id === todo.id)
    
    if (todoIndex > -1){
        todos.splice(todoIndex, 1)
    }
}


// Saving the todos list
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}


//Gets the DOM elements for an an individual note
const generateTodoDOM = (filteredTodos) => {
    filteredTodos.forEach( (todo) => {
        const todoEl = document.createElement('div')
        const todoText = document.createElement('span')
        const checkBox = document.createElement('input')
        const button = document.createElement('button')

        // Sets up the checkbox
        checkBox.setAttribute('type', 'checkbox')
        todoEl.appendChild(checkBox)
        checkBox.checked = todo.completed
        checkBox.addEventListener('change', () => {
            if (checkBox.checked){
                completeTodo(todo.id)
            } else{
                uncompletedTodo(todo.id)
            }
            saveTodos(todos)
            renderTodos(todos, filters)
        })

        // Sets up the todo text
        todoText.textContent = todo.text
        todoEl.appendChild(todoText)


        // Sets up the x button
        button.textContent = 'x'
        todoEl.appendChild(button)
        button.addEventListener('click', () => {
            removeTodo(todo.id)
            saveTodos(todos)
            renderTodos(todos, filters)
        })
       
        document.querySelector('#todos').appendChild(todoEl)
    })
}


// Gets the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left.`
    document.querySelector('#todos').appendChild(summary)
}


// Rendering the application todos based on filters
const renderTodos = (todos,filters) => {
    const filteredTodos = todos.filter((todo) => {
        if (filters.hideCompleted){
            return (todo.text.toLowerCase().includes(filters.searchText.toLowerCase())) && (!todo.completed)
        } else{
            return (todo.text.toLowerCase().includes(filters.searchText.toLowerCase())) 
        }
        
    })
    

    let incompleteTodos = filteredTodos.filter((todo) => !todo.completed)

    document.querySelector('#todos').innerHTML = ''
    generateSummaryDOM(incompleteTodos)
    generateTodoDOM(filteredTodos)
    


}



