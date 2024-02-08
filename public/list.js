document.addEventListener("DOMContentLoaded", function() {

    // first thing we do is fetch tasks from the database
    // so we can display any existing tasks
    fetchTasks()

    // get all elements with type=checkbox
    var checkboxes = document.querySelectorAll('input[type="checkbox"]')
    // listen for the user clicking on any of the checkboxes
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('click', function() {
            var listItem = this.parentNode
            // remove the list item
            listItem.parentNode.removeChild(listItem)
        })
    })

    // get the submit button on the form
    var submit = document.querySelectorAll('input[type="submit"]')
    // listen for the user clicking the submit button
    submit[0].addEventListener('click', function(event){
        event.preventDefault()
        addTask()
    })
})

async function fetchTasks() {
    try {
        const response = await fetch('/tasks')
        const tasks = await response.json()
        displayTasks(tasks)
    } catch (error) {
        console.error('Error fetching tasks:', error)
    }
}

function displayTasks(tasks) {
    const todoList = document.getElementById('todo-list')
    todoList.innerHTML = ''

    tasks.forEach(task => {
        const listItem = document.createElement('li')
        listItem.innerHTML = `<input type="checkbox" onclick="removeTask(${task.id})"><span>${task.name} | ${task.due} | ${task.do}</span>`
        todoList.appendChild(listItem)
    })
}

function showTaskForm() {
    // show the form
    document.getElementById('taskForm').hidden = false
}

async function addTask() {
    // get the input for all three elements
    var nameInput = document.getElementById("taskName")
    var nameText = nameInput.value.trim()

    var dueInput = document.getElementById("dueDate")
    var dueText = dueInput.value.trim()

    var doInput = document.getElementById("doDate")
    var doText = doInput.value.trim()

    // create a new task to add to the database
    const newTask = {
        id: Date.now(),
        name: nameText,
        due: dueText,
        do: doText
    }
    
    // add the task to the database
    try {
        const response = await fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })

        if (response.ok) {
            // fetch and display updated tasks after adding
            fetchTasks()
        } 
    } catch (error) {
        console.error('Error adding task:', error)
    }

    // clear fields for next time
    nameInput.value = ""
    dueInput.value = ""
    doInput.value = ""
    // hide the menu again, until the user presses "add task"
    document.getElementById('taskForm').hidden = true
}

async function removeTask(id) {
    try {
        const response = await fetch(`/tasks/${id}`, {
            method: 'DELETE'
        })

        if (response.ok) {
            // fetch and display updated tasks after deleting
            fetchTasks()
        } 
    } catch (error) {
        console.error('Error deleting task:', error)
    }
}

function toList(){
    window.location.href = '/list'
}

function toSchedule(){
    window.location.href = '/schedule'
}
