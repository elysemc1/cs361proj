document.addEventListener("DOMContentLoaded", function() {

    // first thing we do is fetch classes from the database
    // so we can display any existing classes
    fetchClasses()
})

async function fetchClasses() {
    try {
        const response = await fetch('/classes')
        const classes = await response.json()
        displayClasses(classes)
    } catch (error) {
        console.error('Error fetching classes:', error)
    }
}

function displayClasses(classes) {
    const schedule = document.getElementsByClassName("schedule-container")
    const mon = document.getElementById("mon-classes")
    const tue = document.getElementById("tue-classes")
    const wed = document.getElementById("wed-classes")
    const thu = document.getElementById("thu-classes")
    const fri = document.getElementById("fri-classes")

    classes.forEach(clazz => {
        const listItem = document.createElement('li')
        listItem.innerHTML = `<span>${clazz.name} | ${clazz.days} | ${clazz.time} | ${clazz.location}</span>`
        // figure out which days to put the classes in
        if (clazz.days.includes("Monday")){
            // we have to clone the list item to add it multiple times
            monClass = listItem.cloneNode(true)
            mon.appendChild(monClass)
        }
        if (clazz.days.includes("Tuesday")){
            tueClass = listItem.cloneNode(true)
            tue.appendChild(tueClass)
        }
        if (clazz.days.includes("Wednesday")){
            wedClass = listItem.cloneNode(true)
            wed.appendChild(wedClass)
        }
        if (clazz.days.includes("Thursday")){
            thuClass = listItem.cloneNode(true)
            thu.appendChild(thuClass)
        }
        if (clazz.days.includes("Friday")){
            friClass = listItem.cloneNode(true)
            fri.appendChild(friClass)
        }
    })
}

async function addClass() {
    const className = document.getElementById('className').value;
    const classDays = document.getElementById('classDays').value;
    const classTime = document.getElementById('classTime').value;
    const classLocation = document.getElementById('classLocation').value;

    // validate that we've received all the inputs
    if (!className || !classDays || !classTime || !classLocation) {
        alert('Please fill in all the fields.');
        return;
    }

    // Create a class object
    const newClass = {
        id: Date.now(),
        name: className,
        days: classDays,
        time: classTime,
        location: classLocation
    };

    // add the class to the database
    try {
        const response = await fetch('/classes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newClass)
        })

        if (response.ok) {
            // fetch and display updated tasks after adding
            fetchClasses()
        } 
    } catch (error) {
        console.error('Error adding class:', error)
    }

    // clear the input fields
    document.getElementById('className').value = '';
    document.getElementById('classDays').value = '';
    document.getElementById('classTime').value = '';
    document.getElementById('classLocation').value = '';
}

async function removeClass(id) {
    try {
        const response = await fetch(`/classes/${id}`, {
            method: 'DELETE'
        })

        if (response.ok) {
            // fetch and display updated classes after deleting
            fetchClasses()
        } 
    } catch (error) {
        console.error('Error deleting class:', error)
    }
}

function toList(){
    window.location.href = '/list'
}

function toSchedule(){
    window.location.href = '/schedule'
}

