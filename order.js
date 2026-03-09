document.addEventListener("DOMContentLoaded", function () {
    // --- 1. Authentication Logic ---
    const authLink = document.getElementById("auth-link");
    const adminContainer = document.getElementById("admin-link-container");
    const admin = document.getElementById("admin-link");
    const currentUser = sessionStorage.getItem('loggedInUser');

    if (currentUser) {
        authLink.innerHTML = `Logged in: <b>${currentUser}</b> | <span id="logout-btn" style="cursor:pointer; color: #3b58ff; margin-left: 10px;">Logout</span>`;
        
        if (currentUser === "admin@gmail.com") {
            if(adminContainer) adminContainer.innerHTML = `<a href="admin.html" target="_blank" style="color: red; font-weight: bold; margin-right:15px;">Admin Panel</a>`;
            if(admin) admin.innerHTML = `<span style="color: red; font-size: 14px; margin-left:10px;">(Admin)</span>`;
        }

        document.getElementById("logout-btn").addEventListener("click", () => {
            sessionStorage.removeItem('loggedInUser');
            window.location.reload();
        });
    }

    // --- 2. Load Products ---
    const productGrid = document.getElementById("product-grid");
    const savedInventory = JSON.parse(localStorage.getItem('inventory')) || [];

    if(savedInventory.length === 0) {
        productGrid.innerHTML = "<p>No products available in inventory.</p>";
    }

    savedInventory.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = "product-card";
        card.setAttribute('data-category', product.category);
        
        card.innerHTML = `
            <img src="${product.imagePath || 'images/products_pics/PRNF.png'}" alt="${product.name}">
            <small style="color:gray; display:block; margin-top:5px;">ID: ${product.id}</small>
            <h3>${product.name}</h3>
            <p>Rs.${product.price}.00</p>
            <p style="font-size:12px;">Stock: <b>${product.stock}</b></p>
            <button onclick="addToCart(this, '${product.name}')" ${parseInt(product.stock) <= 0 ? 'disabled' : ''}>
                ${parseInt(product.stock) > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
        `;
        productGrid.appendChild(card);
        
        // Staggered Animation
        setTimeout(() => card.classList.add("show"), index * 100);
    });

    // --- 3. Category Filtering ---
    const buttons = document.querySelectorAll(".category-btn");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            
            const category = button.dataset.category;
            const allCards = document.querySelectorAll(".product-card");
            
            allCards.forEach(card => {
                if (category === "all" || card.dataset.category === category) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // --- 4. Cart Logic ---
    let cartCount = 0;
    const island = document.getElementById("cart-island");
    const islandCount = document.getElementById("island-count");

    window.addToCart = function (button, productName) {
        cartCount++;
        islandCount.innerText = cartCount;

        island.classList.add("active");
        
        // Button Feedback
        const originalText = button.innerText;
        button.innerText = "Added ✓";
        button.style.background = "#23b236";
        button.disabled = true;

        setTimeout(() => {
            button.innerText = originalText;
            button.style.background = "#2a5298";
            button.disabled = false;
        }, 800);
    };

    island.addEventListener("click", () => {
        window.location.href = "checkout.html";
    });

    // --- 5. Scroll to Top Fix ---
    const topBtn = document.getElementById("topBtn");

    window.onscroll = function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    };

    topBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});