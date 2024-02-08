const express = require('express');
const path = require('path');
const fs = require('fs')

// use express to serve the webpages
const app = express();
const port = 8080;

// serve files from the public directory, also parse json
app.use(express.static('public'), express.json())

app.get('/', (req, res) => {
    // direct new users to the welcome screen
    res.redirect('/welcome')
})

app.get('/welcome', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'welcome.html'));
})

app.get('/list', (req, res) => {
    // serve the HTML file that shows the user's to-do list
    res.sendFile(path.join(__dirname, 'public', 'list.html'));
})

app.get('/schedule', (req, res) => {
    // serve the HTML file that shows the user's to-do list
    res.sendFile(path.join(__dirname, 'public', 'schedule.html'));
})

app.get('/tasks', (req, res) => {
    // serve the contents of tasks.json 
    const data = fs.readFileSync('tasks.json', 'utf-8')
    const tasks = data ? JSON.parse(data) : []
    res.json(tasks)
})

app.get('/classes', (req, res) => {
    // serve the contents of tasks.json 
    const data = fs.readFileSync('classes.json', 'utf-8')
    const classes = data ? JSON.parse(data) : []
    res.json(classes)
})

app.get('/instructions.txt', (req, res) => {
    // serve the user the README
    res.sendFile(path.join(__dirname, 'instructions.txt'))
})

// when we make a POST request to /tasks, we want to append the given task to the list
app.post('/tasks', (req, res) => {
    // read existing contents of tasks.json
    const data = fs.readFileSync('tasks.json', 'utf-8')
    const tasks = data ? JSON.parse(data) : []
    // create a new task based on the body of the request
    const newTask = {
        id: req.body.id,
        name: req.body.name,
        due: req.body.due,
        do: req.body.do
    }
    // add new task to the list
    tasks.push(newTask)
    fs.writeFileSync('tasks.json', JSON.stringify(tasks, null), 'utf-8')
    // send OK
    res.sendStatus(200)
})

// when we make a DELETE request to /tasks/:id, we want to delete that task
app.delete('/tasks/:id', (req, res) => {
    // read existing contents of tasks.json
    const data = fs.readFileSync('tasks.json', 'utf-8')
    let tasks = data ? JSON.parse(data) : []

    // eliminate tasks with ID matching the one we want to delete
    tasks = tasks.filter(task => task.id != req.params.id)

    // write updated task list to file
    fs.writeFileSync('tasks.json', JSON.stringify(tasks, null), 'utf-8')
    // send OK
    res.sendStatus(200)
})

// when we make a POST request to /classes, we want to append the given class to the list
app.post('/classes', (req, res) => {
    // read existing contents of tasks.json
    const data = fs.readFileSync('classes.json', 'utf-8')
    const classes = data ? JSON.parse(data) : []
    // create a new task based on the body of the request
    const newClass = {
        id: req.body.id,
        name: req.body.name,
        days: req.body.days,
        time: req.body.time, 
        location: req.body.location
    }
    // add new task to the list
    classes.push(newClass)
    fs.writeFileSync('classes.json', JSON.stringify(classes, null), 'utf-8')
    // send OK
    res.sendStatus(200)
})

// when we make a DELETE request to /classes/:id, we want to delete that task
app.delete('/classes/:id', (req, res) => {
    // read existing contents of tasks.json
    const data = fs.readFileSync('classes.json', 'utf-8')
    let classes = data ? JSON.parse(data) : []

    // eliminate classes with ID matching the one we want to delete
    classes = classes.filter(clazz => clazz.id != req.params.id)

    // write updated class list to file
    fs.writeFileSync('classes.json', JSON.stringify(classes, null), 'utf-S8')
    // send OK
    res.sendStatus(200)
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});