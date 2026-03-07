document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    // Hardcoded admin check
    if (email === "admin" && pass === "admin") {
        window.location.href = "order.html";
        return;
    }

    // Check LocalStorage for registered users
    const storedUser = localStorage.getItem('user_' + email);
    if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.password === pass) {
            window.location.href = "order.html";
        } else {
            alert("Wrong password!");
        }
    } else {
        alert("User not found. Please register.");
    }
});