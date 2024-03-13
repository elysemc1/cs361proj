document.addEventListener("DOMContentLoaded", function() {
    // display all uploaded files on DOM load AND when we add a file
    showFiles()
    const form = document.getElementById('upload-form')
    form.addEventListener('submit', function(event){
        showFiles()
    })
})

function showFiles(){
    const fileList = document.getElementById('file-list')
    // fetch the files from the endpoint and create a list element for each
    fetch('/getFiles')
    .then(response => response.json())
    .then(files => {
      files.forEach(file => {
        const listItem = document.createElement('li');
        listItem.textContent = file;
        listItem.innerHTML = `<span>${file} </span> <a href="/download/${file}" download>[download]</a> <button id="delete-button" onclick=del('${file}')>Delete</button> `
        fileList.appendChild(listItem);
      });
    })
    .catch(error => console.error('Error fetching file list:', error));
}

async function del(file){
    // first confirm that we really want to delete
    var userConfirmed = window.confirm("Are you sure you want to delete the file?");
    if (userConfirmed) {
        try {
            // if confirmed, really delete
            fetch(`/delete/${file}`)
            window.location.href = '/files' // refresh the page to show changes
        } catch (error) {
            console.error('Error deleting file:', error)
        }
    }
}