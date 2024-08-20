// Selecting DOM elements
let input = document.querySelector('.entered-list'); // The input field where the user types the task
let addBtn = document.querySelector('.add-list'); // The "Add" button to add a new task
let tasks = document.querySelector('.tasks'); // The container where tasks will be displayed
let filterSelect = document.querySelector(".filter-todo"); // The dropdown menu for filtering tasks (All, Completed, Incomplete)
let deleteAll = document.querySelector(".deleteAll"); // The "Clear All" button to remove all tasks
let dueDateInput = document.querySelector('#due-date'); // The input field for the due date of the task

// Enable the add button when there is input text
input.addEventListener('keyup', () => {
  if (input.value.trim() !== "") {
    addBtn.classList.add('active'); // Activates the "Add" button when there is text in the input field
  } else {
    addBtn.classList.remove('active'); // Deactivates the "Add" button when the input field is empty
  }
});

// Add a new task when the add button is clicked
addBtn.addEventListener('click', () => {
  if (input.value.trim() !== "") {
    let newItem = document.createElement('div'); // Creates a new div element for the task
    newItem.classList.add('item'); // Adds the "item" class to the new task div

    // Get the due date from the due date input field, format it, or set it to 'No due date' if not provided
    let dueDate = dueDateInput.value ? new Date(dueDateInput.value).toLocaleDateString() : 'No due date';

    // Add the task text, due date, and action buttons (complete, edit, delete) to the new task item
    newItem.innerHTML = `
      <p>${input.value}</p>
      <div class="item-details">
        <span class="due-date">Due: ${dueDate}</span>
        <div class="item-btn">
          <i class="fa-regular fa-square-check"></i> <!-- Button to mark the task as completed -->
          <i class="fa-solid fa-pencil-alt"></i>    <!-- Button to edit the task -->
          <i class="fa-solid fa-trash"></i>         <!-- Button to delete the task -->
        </div>
      </div>`;
    
    tasks.appendChild(newItem); // Appends the new task item to the task container

    // Clear the input fields
    input.value = ''; 
    dueDateInput.value = ''; // Clears the due date input field
    addBtn.classList.remove('active'); // Deactivates the "Add" button
  } else {
    alert('Please enter a task'); // Alerts the user if the task input field is empty when trying to add a task
  }
});

// Update the event listeners for dynamically created task items
tasks.addEventListener('click', (e) => { 
  if (e.target.classList.contains('fa-trash')) {
    e.target.closest('.item').remove(); // Removes the entire task item when the delete button is clicked
  } else if (e.target.classList.contains('fa-square-check')) {
    e.target.closest('.item').classList.toggle('completed'); // Toggles the completion state of the task when the complete button is clicked
  } else if (e.target.classList.contains('fa-pencil-alt')) {
    let taskItem = e.target.closest('.item'); // Selects the closest task item
    let taskText = taskItem.querySelector('p'); // Selects the text of the task
    let newTaskText = prompt("Edit your task:", taskText.textContent); // Prompts the user to enter new text for the task
    if (newTaskText !== null && newTaskText.trim() !== "") {
      taskText.textContent = newTaskText.trim(); // Updates the task text if the user entered something
    }
  }
});

// Filter tasks based on completion status
filterSelect.addEventListener('change', () => {
  let selectedValue = filterSelect.value; // Gets the selected filter option (All, Completed, Incomplete)
  let taskItems = tasks.children; // Gets all the task items

  for (let i = 0; i < taskItems.length; i++) {
    let taskItem = taskItems[i];
    let isCompleted = taskItem.classList.contains('completed'); // Checks if the task is completed
    
    if (selectedValue === 'All') {
      taskItem.style.display = 'block'; // Shows all tasks
    } else if (selectedValue === 'Completed' && isCompleted) {
      taskItem.style.display = 'block'; // Shows only completed tasks
    } else if (selectedValue === 'Incomplete' && !isCompleted) {
      taskItem.style.display = 'block'; // Shows only incomplete tasks
    } else {
      taskItem.style.display = 'none'; // Hides tasks that don't match the filter
    }
  }
});

// Clear all tasks when the "Clear All" button is clicked
deleteAll.addEventListener('click', () => {
  tasks.innerHTML = ''; // Clears all task items from the task container
});

// Function to display the current date
function displayDate() {
  let date = new Date(); // Gets the current date
  date = date.toString().split(" "); // Converts the date to a string and splits it into an array
  date = date[1] + " " + date[2] + " " + date[3]; // Formats the date to display only the month, day, and year
  document.querySelector("#date").innerHTML = date; // Displays the formatted date in the element with the ID "date"
}

// Call displayDate on page load
window.addEventListener('load', displayDate); // Calls the displayDate function when the page loads