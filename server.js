const express = require('express');
const path = require('path');

// use express to serve the webpages
const app = express();
const port = 8080;

app.use(express.static('public'))

app.get('/', (req, res) => {
    // the homepage, for now, will be /list
    res.redirect('/list')
});

app.get('/list', (req, res) => {
    // serve the HTML file that shows the user's to-do list
    res.sendFile(path.join(__dirname, 'public', 'list.html'));
})

app.post('/list', (req, res) => {
    // this will happen when we submit the form to add a task
    // we don't actually want anything to happen, so simply continue
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});