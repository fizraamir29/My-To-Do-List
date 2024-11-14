let inputBx = document.querySelector('#inputBx');
let list = document.querySelector('#List');

// Tasks array to hold to-do items
let tasks = [];

// Add item on Enter key press
inputBx.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        let inputText = this.value.trim();
        if (inputText !== "") {
            addItem(inputText);
            this.value = ""; // Clear input box
        }
    }
});

// Function to add a new item
function addItem(inputText) {
    tasks.push({ text: inputText, completed: false });
    displayTasks(); // Update the displayed list
}

// Function to display tasks
function displayTasks() {
    list.innerHTML = ''; // Clear the list
    tasks.forEach((task, index) => {
        let listItem = document.createElement('li');
        listItem.textContent = task.text;
        
        // Add done class if task is completed
        listItem.classList.toggle('done', task.completed);
        
        // Toggle task status on click
        listItem.addEventListener('click', () => toggleTask(index));

        // Delete icon
        let deleteIcon = document.createElement("i");
        deleteIcon.innerText = "✖";
        deleteIcon.addEventListener("click", function(event) {
            event.stopPropagation(); // Prevent toggling task status
            removeTask(index);
        });
        
        listItem.appendChild(deleteIcon);
        list.appendChild(listItem);
    });
}

// Toggle task completion status
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks(); // Update displayed tasks
}

// Remove task
function removeTask(index) {
    tasks.splice(index, 1); // Remove task at the specified index
    displayTasks(); // Update displayed tasks
}

// Show tasks based on completion status
function showTasksOnPage(type) {
    const tasksList = document.getElementById(type === 'completed' ? 'completedTasksList' : 'pendingTasksList');
    tasksList.innerHTML = '';
    tasks.filter(task => task.completed === (type === 'completed')).forEach(task => {
        const listItem = document.createElement('li');
        listItem.textContent = task.text;
        tasksList.appendChild(listItem);
    });
}

// Call to show tasks on respective pages (Dashboard)
if (document.getElementById('completedTasksList')) {
    showTasksOnPage('completed');
} else if (document.getElementById('pendingTasksList')) {
    showTasksOnPage('pending');
}

// Login and Session Functions

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("username", username);
        window.location.href = "dashboard.html"; // Redirect to dashboard after login
    } else {
        alert("Please enter valid credentials");
    }
}

// Check login status on dashboard
function checkLoginStatus() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
        window.location.href = "login.html"; // Redirect to login if not logged in
    } else {
        displayTasks(); // Display tasks for logged-in user
    }
}

// Logout function
function logout() {
    sessionStorage.clear(); // Clear session storage
    window.location.href = "login.html"; // Redirect to login page
}

// Toggle mobile menu visibility
document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");
    const menuToggle = document.querySelector(".menu-toggle"); // Menu toggle button
    
    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            navbar.classList.toggle("show-menu");
        });
    }
});

// Account creation and login logic
function createAccount() {
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
    } else {
        // Store account info in sessionStorage (simulating account creation)
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("isLoggedIn", "true");  // Mark user as logged in

        alert("Account created successfully!");

        // Automatically log the user in and redirect to the dashboard
        window.location.href = "dashboard.html"; // Redirect to the dashboard
    }
}

// Login function (for regular login after account creation)
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simulate checking credentials (here, it's using sessionStorage)
    if (username && password) {
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("username", username);
        window.location.href = "dashboard.html"; // Redirect to dashboard after login
    } else {
        alert("Please enter valid credentials");
    }
}

// Check login status and show dashboard content
function checkLoginStatus() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
        window.location.href = "login.html"; // Redirect to login if not logged in
    } else {
        // Display tasks or other content on dashboard
        // For example, display the username
        const username = sessionStorage.getItem("username");
        document.getElementById("welcomeMessage").textContent = "Welcome, " + username;
    }
}

// Call this function when the page loads
window.onload = checkLoginStatus;


// Function to log in the user
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check if the entered credentials match stored credentials (stored in sessionStorage)
    if (username && password) {
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("username", username);
        window.location.href = "dashboard.html"; // Redirect to dashboard after login
    } else {
        alert("Please enter valid credentials");
    }
}

// Check login status when dashboard loads
function checkLoginStatus() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
        window.location.href = "login.html"; // Redirect to login if not logged in
    } else {
        // If logged in, display username
        const username = sessionStorage.getItem("username");
        document.getElementById("welcomeMessage").textContent = "Welcome, " + username;
    }
}

// Logout function to clear sessionStorage
function logout() {
    sessionStorage.clear(); // Clear session storage
    window.location.href = "login.html"; // Redirect to login page
}

// Call this function when the page loads (for dashboard)
window.onload = checkLoginStatus;


// Function to check login status on the home page
function checkLoginStatusHome() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
        window.location.href = "login.html"; // Redirect to login if not logged in
    } else {
        const username = sessionStorage.getItem("username");
        document.getElementById("welcomeMessage").textContent = "Welcome, " + username;
    }
}

// Logout function to clear sessionStorage and redirect to login
function logout() {
    sessionStorage.clear();
    window.location.href = "login.html"; // Redirect to login page after logout
}

// Call checkLoginStatusHome when the home page loads
window.onload = checkLoginStatusHome;


// Function to add tasks to the list
function addTask(task) {
    const li = document.createElement("li");
    li.textContent = task;
    document.getElementById("List").appendChild(li);

    // Add click event to toggle 'done' class
    li.addEventListener("click", () => {
        li.classList.toggle("done");
    });
}

// Example: Adding tasks
addTask("Complete homework");
addTask("Go for a walk");



document.addEventListener("DOMContentLoaded", function () {
    const loginLink = document.getElementById('loginLink');
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');

    // Function to toggle the login/logout state
    function updateLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Check if user is logged in

        if (isLoggedIn) {
            loginLink.innerHTML = '<span class="login-icon">🔓</span> Logout'; // Change to Logout
            loginLink.href = 'logout.html'; // Link to logout page
        } else {
            loginLink.innerHTML = '<span class="login-icon">🔒</span> Login'; // Change back to Login
            loginLink.href = 'login.html'; // Link to login page
        }
    }

    // Call updateLoginStatus on page load
    updateLoginStatus();

    // Toggle the menu visibility when the hamburger icon is clicked
    menuToggle.addEventListener('click', function () {
        navbar.classList.toggle('open'); // Toggle the 'open' class on navbar
    });
});

document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.navbar').classList.toggle('active');
});


document.getElementById('inputBx').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskInput = document.getElementById('inputBx');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;
        document.getElementById('List').appendChild(taskItem);

        // Clear the input field
        taskInput.value = '';
        
        // Add functionality to remove task when clicked
        taskItem.addEventListener('click', () => taskItem.remove());
    }
}
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.navbar ul').classList.toggle('active');
});


// Toggle navbar menu on mobile
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.navbar ul').classList.toggle('active');
});

// Function to add a task
function addTask() {
    const inputBox = document.getElementById("inputBx");
    const taskText = inputBox.value.trim();
    
    if (taskText !== "") {
        const ul = document.getElementById("List");
        const li = document.createElement("li");

        li.textContent = taskText;
        li.addEventListener("click", toggleCompletion); // Add event listener to toggle completion

        ul.appendChild(li);
        inputBox.value = ""; // Clear the input box
    }
}

// Function to toggle task completion
function toggleCompletion(event) {
    const task = event.target;
    task.classList.toggle("done"); // Toggle the 'done' class to mark as completed

    if (task.classList.contains("done")) {
        task.style.textDecoration = "line-through";
    } else {
        task.style.textDecoration = "none";
    }
}

// Event listener for adding a task when pressing Enter
document.getElementById("inputBx").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.navbar').classList.toggle('active');
});



