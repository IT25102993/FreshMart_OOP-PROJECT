document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('regEmail').value;
    const pass = document.getElementById('regPassword').value;
    const confirmPass = document.getElementById('confirmPassword').value;

    // Simple validation: Check if passwords match
    if (pass !== confirmPass) {
        alert("Passwords do not match!");
        return;
    }

    // Save user object as a string in LocalStorage
    const userData = { 
        email: email, 
        password: pass,
    };
    
    localStorage.setItem('user_' + email, JSON.stringify(userData));

    alert("Account created successfully!");
    window.location.href = "login.html";
});

// Function to handle password visibility toggle
function setupPasswordToggle(iconId, inputId) {
    const icon = document.getElementById(iconId);
    const input = document.getElementById(inputId);

    if (icon && input) {
        icon.addEventListener('click', function () {
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            
            // Toggle the image source
            this.src = (type === 'password') ? 'images/hidden.png' : 'images/view.png';
        });
    }
}

// Initialize toggles for both fields
setupPasswordToggle('togglePassword', 'regPassword');
setupPasswordToggle('toggleConfirmPassword', 'confirmPassword');