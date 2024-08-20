// Get form and input elements from the DOM
const form = document.getElementById('form');
const email = document.getElementById('email');
const username = document.getElementById('username');
const password1 = document.getElementById('password1');
const password2 = document.getElementById('password2');

// Boolean variable to track if the form is valid
let isValid = true;

// Add an event listener to the form for the 'submit' event
form.addEventListener('submit', e => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (validateInputs()) { // Validate form inputs
        window.location.href = 'index.html'; // Redirect to 'index.html' if inputs are valid
    }
});

// Function to display error messages and apply error styles
const setError = (element, message) => {
    const inputControl = element.parentElement; // Get the parent element of the input
    const errorDisplay = inputControl.querySelector('.error'); // Find the error display element

    errorDisplay.innerText = message; // Set the error message
    inputControl.classList.add('error'); // Add error styling
    inputControl.classList.remove('success'); // Remove success styling
};

// Function to remove error messages and apply success styles
const setSuccess = element => {
    const inputControl = element.parentElement; // Get the parent element of the input
    const errorDisplay = inputControl.querySelector('.error'); // Find the error display element

    errorDisplay.innerText = ''; // Clear the error message
    inputControl.classList.add('success'); // Add success styling
    inputControl.classList.remove('error'); // Remove error styling
};

// Function to validate if the email format is correct
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()); // Return true if email matches the pattern
};

// Function to validate form inputs
const validateInputs = () => {
    isValid = true; // Reset isValid to true for each validation run
    const usernameValue = username.value.trim(); // Get and trim the username input value
    const emailValue = email.value.trim(); // Get and trim the email input value
    const password1Value = password1.value.trim(); // Get and trim the first password input value
    const password2Value = password2.value.trim(); // Get and trim the second password input value

    // Validate username input
    if (usernameValue === '') {
        setError(username, 'Username is required'); // Display error if username is empty
        isValid = false; // Set isValid to false
    } else {
        setSuccess(username); // Display success if username is provided
    }

    // Validate email input
    if (emailValue === '') {
        setError(email, 'Email is required'); // Display error if email is empty
        isValid = false; // Set isValid to false
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address'); // Display error if email is invalid
    } else {
        setSuccess(email); // Display success if email is valid
    }

    // Validate first password input
    if (password1Value === '') {
        setError(password1, 'Password is required'); // Display error if password is empty
        isValid = false; // Set isValid to false
    } else if (password1Value.length < 8) {
        setError(password1, 'Password must be at least 8 characters.'); // Display error if password is too short
        isValid = false; // Set isValid to false
    } else {
        setSuccess(password1); // Display success if password is valid
    }

    // Validate second password input
    if (password2Value === '') {
        setError(password2, 'Please confirm your password'); // Display error if confirmation password is empty
        isValid = false; // Set isValid to false
    } else if (password2Value !== password1Value) {
        setError(password2, "Passwords don't match"); // Display error if passwords do not match
        isValid = false; // Set isValid to false
    } else {
        setSuccess(password2); // Display success if passwords match
    }
    return isValid; // Return the overall validation result
};

// Add an event listener to the signup button for the 'click' event
document.getElementById('signup').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default button click behavior
    if (validateInputs()) { // Validate form inputs
        window.location.href = 'index.html'; // Redirect to 'index.html' if inputs are valid
    } else {
        alert('Please fill out all required fields before proceeding.'); // Alert if validation fails
    }
});
