const taskList = document.getElementById('tasklist');
const taskForm = document.querySelector('.task-form');
const formInput = document.getElementById('forminput');
const clear = document.querySelector('#clear');
const overlay = document.querySelector('.overlay');
const updateModal = document.querySelector('.update-modal');
const updateForm = document.querySelector('.update-form');
const updateModalCloseButton = updateModal.querySelector('.cross');

let editedTask =''

function openUpdateModal(taskText) {
  overlay.classList.add('active');
  updateModal.classList.add('open');
  updateForm.task.value = taskText;
}
function closeUpdateModal() {
  overlay.classList.remove('active');
  updateModal.classList.remove('open');
}

taskForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const taskText = formInput.value.trim();
  if (taskText !== "") {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');

    const taskli = document.createElement('li');
    taskli.classList.add('task-description');
    taskli.textContent = taskText;
    taskItem.appendChild(taskli);
    const completeBtn = document.createElement('button');
    completeBtn.classList.add('task-btn', 'complete-btn');
    completeBtn.innerHTML = '<i class="far fa-check-square"></i>';
    taskItem.appendChild(completeBtn);

    const updateBtn = document.createElement('button');
    updateBtn.classList.add('task-btn', 'update-btn');
    updateBtn.innerHTML = '<i class="fas fa-pen-square"></i>';
    taskItem.appendChild(updateBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('task-btn', 'task-btn-delete');
    deleteBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
    taskItem.appendChild(deleteBtn);

    taskList.appendChild(taskItem);
    formInput.value = '';

    updateBtn.addEventListener('click', function () {
      openUpdateModal(taskText);
      editedTask = taskItem;
    });
  } else {
    alert('Task Daxil edin');
  }
});

clear.addEventListener('click', function () {
  taskList.innerHTML = '';
});

updateForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const updatedTaskText = updateForm.task.value.trim();
  if (updatedTaskText !== "") {
    const taskDescription = editedTask.querySelector('.task-description');
    taskDescription.textContent = updatedTaskText;
    closeUpdateModal();
  } else {
    alert('Task Daxil edin');
  }
});

updateModalCloseButton.addEventListener('click', function () {
  updateModalCloseButton.style.cursor= 'pointer';
  closeUpdateModal();
});

taskList.addEventListener('click', function (e) {
  if (e.target.classList.contains('task-btn-delete')) {
    const taskItem = e.target.parentElement;
    taskList.removeChild(taskItem);
  }
});
taskList.addEventListener('click', function (e) {
  if (e.target.classList.contains('complete-btn')) {
    const taskItem = e.target.parentElement;
    taskItem.style.textDecoration = 'line-through';
    taskItem.style.transform = 'scale(0.9)';
    taskItem.style.opacity = 0.8;
    taskItem.style.transition = 'all 0.5s ease';
  }
});