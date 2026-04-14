document.getElementById('myForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const messageDiv = document.getElementById('message');

    let message = '';
    let isValid = true;

    if (!name) {
        message = 'Name is required.';
        isValid = false;
    } else if (!email) {
        message = 'Email is required.';
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        message = 'Please enter a valid email address.';
        isValid = false;
    } else if (!password) {
        message = 'Password is required.';
        isValid = false;
    } else if (password.length < 6) {
        message = 'Password must be at least 6 characters long.';
        isValid = false;
    } else if (!confirmPassword) {
        message = 'Please confirm your password.';
        isValid = false;
    } else if (password !== confirmPassword) {
        message = 'Passwords do not match.';
        isValid = false;
    }

    if (isValid) {
        message = 'Form submitted successfully!';
        messageDiv.style.color = 'green';
    } else {
        messageDiv.style.color = 'red';
    }

    messageDiv.textContent = message;
});