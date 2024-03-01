const fs = require('fs');
const path = require('path');

//obtain paths to status.txt and pipe.txt
const statusPath = path.join(__dirname, 'status.txt');
const pipePath = path.join(__dirname, 'pipe.txt');

while(true){
    //wait for status.txt to contain "ready"
    let status = fs.readFileSync(statusPath, 'utf8');
    while(status != "ready"){
        status = fs.readFileSync(statusPath, 'utf8');
    }

    //once status.txt contains "ready"
    //pipe.txt should contain array of JSONs
    let pipe = fs.readFileSync(pipePath, 'utf8'); //read in tasks
    let tasks = JSON.parse(pipe); //JSONify tasks
    
    //print tasks received
    console.log("Tasks obtained from pipe.txt:\n", tasks)
    
    //function to sort tasks by "do" field
    function sortByDate(a, b) {
        const dateA = new Date(a.do);
        const dateB = new Date(b.do);
        return dateA - dateB;
    }
    
    //sort tasks
    tasks.sort(sortByDate);

    //print sorted tasks
    console.log("Sorted tasks by \"do\":\n", tasks)
    console.log("Writing sorted tasks to pipe.txt and \"done\" to status.txt...")

    //write sorted tasks to pipe.txt
    fs.writeFileSync(pipePath, JSON.stringify(tasks));

    //write done to status.txt
    fs.writeFileSync(statusPath, 'done');
}