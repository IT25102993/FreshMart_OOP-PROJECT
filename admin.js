const sidebar = document.querySelector(".sidebar");
const sidebarBtn = document.querySelector(".sidebarBtn");
const navLinks = document.querySelectorAll(".nav-links li a");

// Handle Sidebar Toggling
sidebarBtn.onclick = function() {
  sidebar.classList.toggle("active");
  if(sidebar.classList.contains("active")){
    sidebarBtn.classList.replace("bx-menu" ,"bx-menu-alt-right");
  } else {
    sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
  }
}

// Ensure active class updates visually on click
navLinks.forEach(link => {
    link.addEventListener("click", function() {
        navLinks.forEach(item => item.classList.remove("active"));
        this.classList.add("active");
    });
});