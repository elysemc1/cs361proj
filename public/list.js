document.addEventListener("DOMContentLoaded", function() {

    // first thing we do is fetch tasks from the database
    // so we can display any existing tasks
    fetchTasks()

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
        // order the tasks before displaying them using Mason's microservice
        orderedTasks = await orderTasks(tasks)
        displayTasks(JSON.parse(orderedTasks))
    } catch (error) {
        console.error('Error fetching tasks:', error)
    }
}

async function orderTasks(tasks){
    // we can only write to files on the server side using fs
    // so we need to send our tasks to the server
    try {
        const response = await fetch('/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tasks)
        })

        if (response.ok) {
            // fetch and display updated tasks after adding
            res = await response.json()
            return res
        } 
    } catch (error) {
        console.error('Error ordering tasks:', error)
    }
}

function displayTasks(tasks) {
    const todoList = document.getElementById('todo-list')
    todoList.innerHTML = ''

    tasks.forEach(task => {
        const listItem = document.createElement('li')
        listItem.innerHTML = `<div class="check-parent"><input type="checkbox" onchange="toggleTask(${task.id})"><span id=${task.id}>${task.name} | ${task.due} | ${task.do}</span></div>`
        todoList.appendChild(listItem)
        if (task.done === true){
            // set the box to be checked
            var checkbox = listItem.querySelectorAll('input[type="checkbox"]')[0]
            checkbox.checked = true
            // and strikethrough the text
            var text = document.getElementById(task.id)
            text.classList.add('strikethrough')
        }
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
        do: doText,
        done: false
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

async function toggleTask(id){
    try {
        // get information about the task to be toggled from the database
        fetch(`/tasks/${id}`, {
            method: 'GET'
        }).then(response => {
            if (!response.ok){
                console.error("Response not OK")
            }
            return response.json()
        }).then(data => {
            // delete the old database entry
            removeTask(data.id)
            const newTask = {
                id: data.id,
                name: data.name,
                due: data.due,
                do: data.do,
                done: !data.done
            }
            
            // and post this new entry to the database
            fetch('/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTask)
            })
            // show updated tasks
            fetchTasks()
        })
    } catch (error) {
        console.error('Error toggling task:', error)
    }
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

function toFiles(){
    window.location.href = '/files'
}