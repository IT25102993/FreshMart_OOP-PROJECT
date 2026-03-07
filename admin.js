document.addEventListener("DOMContentLoaded", function () {
    const authLink = document.getElementById("auth-link");
    const adminContainer = document.getElementById("admin-link-container");
    const admin = document.getElementById("admin-link");
    const currentUser = sessionStorage.getItem('loggedInUser');

    if (currentUser) {
        authLink.innerHTML = `Logged in as: <b>${currentUser}</b> | <span id="logout-btn" style="cursor:pointer; color: #3b58ff; margin-left: 10px;">Logout</span>`;
        authLink.href = "javascript:void(0)";
        
        // Show Admin Panel / Add Products link if admin
        if (currentUser === "admin@gmail.com") {
            adminContainer.innerHTML = `<a href="admin.html" target="_blank" style="color: red; font-weight: bold; margin-right:15px;">Add Products</a>`;
        }
        if (currentUser === "admin@gmail.com") {
            admin.innerHTML = `<h4 style="color: red;  ">Admin</h4>`;
        }

        document.getElementById("logout-btn").addEventListener("click", () => {
            sessionStorage.removeItem('loggedInUser');
            window.location.reload();
        });
    }
});