document.addEventListener("DOMContentLoaded", () => {
    // 1. Select Elements
    const sidebar = document.querySelector(".sidebar");
    const sidebarBtn = document.querySelector(".sidebarBtn");
    const navLinks = document.querySelectorAll(".nav-links li a");
    const pImage = document.getElementById('pImage');
    const imgPreview = document.getElementById('imgPreview');
    const productForm = document.getElementById('productForm');

    let base64Image = "";

    // 2. Sidebar Toggle Logic
    if (sidebarBtn && sidebar) {
        sidebarBtn.onclick = function() {
            sidebar.classList.toggle("active");
            // Check for class existence to swap icons safely
            const icon = sidebarBtn.querySelector("i") || sidebarBtn; 
            if (sidebar.classList.contains("active")) {
                sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
            } else {
                sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
            }
        };
    }

    // 3. Navigation Active State
    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            navLinks.forEach(item => item.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // 4. Image Preview & Base64 Conversion
    if (pImage) {
        pImage.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    base64Image = e.target.result;
                    if (imgPreview) {
                        imgPreview.src = base64Image;
                        imgPreview.style.display = "block";
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // 5. Form Submission & LocalStorage
    if (productForm) {
        productForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Extract values safely
            const pId = document.getElementById('pId')?.value;
            const pName = document.getElementById('pName')?.value;
            const pPrice = document.getElementById('pPrice')?.value;
            const pStock = document.getElementById('pStock')?.value;
            const pCategory = document.getElementById('pCategory')?.value;

            if (!pId || !pName) {
                alert("Please fill in the required fields.");
                return;
            }

            const newProduct = {
                id: pId,
                name: pName,
                price: pPrice,
                stock: pStock,
                category: pCategory,
                imagePath: base64Image // Note: Base64 strings can be very large
            };

            // Save to Inventory
            try {
                let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
                inventory.push(newProduct);
                localStorage.setItem('inventory', JSON.stringify(inventory));
                
                alert(`Product ${pId} added successfully!`);
                window.location.href = "order.html";
            } catch (error) {
                console.error("Storage error:", error);
                alert("Storage is full! Try a smaller image.");
            }
        });
    }
});