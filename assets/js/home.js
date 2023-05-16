// Adding new task input tag to the form on click
let addNewTask = document.getElementById('addNewTask');
let count = 1;
addNewTask.addEventListener('click', ()=>{
    let taskInput = document.getElementById('taskInput');
    count++;
    // name = task should be given so that an array of task[] is created
    taskInput.innerHTML += '<input style="margin-bottom: 7px;" type="text" name="task" placeholder="Task ' + count + '"><br>';  
});
