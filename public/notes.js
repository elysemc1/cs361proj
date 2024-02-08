document.addEventListener("DOMContentLoaded", function() {
    // display all uploaded files
    showFiles()
    // and display them when we press submit
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
        listItem.innerHTML = `<span>${file} <a href="/delete/${file}">Delete</a> <a href="/download/${file}" download>Download</a></span>`
        fileList.appendChild(listItem);
      });
    })
    .catch(error => console.error('Error fetching file list:', error));
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
