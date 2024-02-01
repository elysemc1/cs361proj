function showTaskForm() {
    // show the form
    document.getElementById('taskForm').hidden = false
}

function addTask() {
    var nameInput = document.getElementById("taskName");
    var nameText = taskInput.value.trim();

    var dueInput = document.getElementById("dueDate");
    var dueText = dueInput.value.trim();

    var doInput = document.getElementById("doDate");
    var doInput = doInput.value.trim();

    var todoList = document.getElementById("todo-list");

    var li = document.createElement("li");
    // take care that inner HTML cannot be set by a user !! how to fix?
    li.innerHTML = '<input type="checkbox"><span>' + nameText + '</span>';    
    todoList.appendChild(li);
    // clear fields for next time
    nameInput.value = "";
    dueInput.value = "";
    doInput.value = "";
}

