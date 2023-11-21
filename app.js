// Stores a list of todo
let todos = [];

// Get the todo list from local storage if available
if (localStorage.getItem('todos')) {
    todos = JSON.parse(localStorage.getItem('todos'));
    renderTodos();
}

// Todo : show list
function renderTodos() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const todoItem = document.createElement('li');
        todoItem.className = 'todo-item';
        todoItem.innerHTML = `
      <span>${todo}</span>
      <div>
       <button class="btn btn-primary" onclick="editTodo(${index})">Edit</button>
        <button class="btn btn-danger" onclick="deleteTodo(${index})">Delete</button>
      </div>
    `;
        todoList.appendChild(todoItem);
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

//  Todo : Add
function saveTodo() {
    const todoText = document.getElementById('todo-text').value;
    if (todoText.trim() !== '') {
        todos.push(todoText);
        renderTodos();
        closePopup();
        playSuccessSound();
        showToast(`Todo added ${todos} successfully`, `success`);
    } else {
        playErrorSound();
        showToast('Todo text cannot be empty', 'error');
    }
}

// Todo : Edit
function editTodo(index) {
    const todoText = todos[index];
    const editTodoText = document.getElementById("edit-todo-text");
    const editPopupTitle = document.getElementById("edit-popup-title");
    const editPopup = document.getElementById("editPopup");
    editPopup.style.display = "block";
    editTodoText.value = todoText;
    editPopupTitle.textContent = "Edit Todo";

    editTodoText.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          saveEditedTodo();
        }
      });
    saveEditedTodo = function () {
      const newTodoText = editTodoText.value.trim();
      if (newTodoText !== '') {
        todos[index] = newTodoText;
        renderTodos();
        closeEditPopup();
        playSuccessSound();
        showToast(`Todo updated successfully`, `success`);
      } else {
        playErrorSound();
        showToast('Todo text cannot be empty', 'error');
      }
    };
  }
  function closeEditPopup() {
    const editPopup = document.getElementById("editPopup");
    editPopup.style.display = "none";
  }
  

// Todo : delete
function deleteTodo(index) {
    if (confirm('Are you sure you want to delete this todo?')) {
        todos.splice(index, 1);
        renderTodos();
        playSuccessSound();
        showToast(`Todo deleted ${todos} successfully`, `success`);
    }
}

// show toast message
function showToast(message, type) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add(type);
    toast.style.display = 'block';

    setTimeout(function () {
        toast.style.display = 'none';
        toast.classList.remove(type);
    }, 2000);
}
// Open popup
function openPopup(title) {
    document.getElementById('popup-title').textContent = title + ' Todo';
    document.getElementById('todo-text').value = '';
    document.getElementById('popup').style.display = 'block';
}

// Close popup
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Sound Success
function playSuccessSound() {
    const audio = document.getElementById('toastSoundSuccess');
    audio.play();
}

// Sound Error
function playErrorSound() {
    const audio = document.getElementById('toastSoundError');
    audio.play();
}