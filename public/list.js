function showTaskForm() {
    // show the form
    document.getElementById('taskForm').hidden = false
}

function addTask() {
    // get the input for all three elements
    var nameInput = document.getElementById("taskName");
    var nameText = nameInput.value.trim();

    var dueInput = document.getElementById("dueDate");
    var dueText = dueInput.value.trim();

    var doInput = document.getElementById("doDate");
    var doText = doInput.value.trim();

    // create an element in the todo-list list
    var todoList = document.getElementById("todo-list");
    var li = document.createElement("li");
    // take care that inner HTML cannot be set by a user
    // user may only set text within the span 
    li.innerHTML = '<input type="checkbox"><span>' + nameText + " | " + dueText + " | " + doText + '</span>';    
    todoList.appendChild(li);
    // clear fields for next time
    nameInput.value = "";
    dueInput.value = "";
    doInput.value = "";
    // hide the menu again, until the user presses "add task"
    document.getElementById('taskForm').hidden = true
}

