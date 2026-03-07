const form = document.getElementById('loginForm');
const toggle = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

// Show / Hide password logic
toggle.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.src = (type === 'password') ? 'images/hidden.png' : 'images/view.png';
});

// Login system
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('username').value;
    const pass = passwordInput.value;

    // Admin login
    if (email === "admin@gmail.com" && pass === "admin") {
        sessionStorage.setItem('loggedInUser', email); // Store session
        window.location.href = "order.html";
        return;
    }

    const storedUser = localStorage.getItem('user_' + email);

    if (storedUser) {
        const user = JSON.parse(storedUser);

        if (user.password === pass) {
            sessionStorage.setItem('loggedInUser', email); // Store session
            window.location.href = "order.html";
        } else {
            alert("Wrong password!");
        }
    } else {
        alert("User not found. Please register.");
    }
});