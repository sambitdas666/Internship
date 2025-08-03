document.getElementById('addBtn').addEventListener('click', addTodo);
document.getElementById('todoInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTodo()
    }
});

function addTodo(){
    const input = document.getElementById('todoInput');
    const todoText = input.value.trim();

    if (todoText == '') return;

    const todoList = document.getElementById('todoList');
    const li = document.createElement('li');
    
    li.innerHTML = `
        <span>${todoText}</span>
        <button class="delete-btn">Delete</button>`
    ;
    todoList.appendChild(li);
    input.value = '';

    li.querySelector('.delete-btn').addEventListener('click', function () {
        li.remove();
    });
}