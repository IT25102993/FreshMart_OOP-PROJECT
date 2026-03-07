document.addEventListener("DOMContentLoaded", function () {
    // --- Authentication Logic ---
    const authLink = document.getElementById("auth-link");
    const adminContainer = document.getElementById("admin-link-container");
    const currentUser = sessionStorage.getItem('loggedInUser');

    if (currentUser) {
        authLink.innerHTML = `Logged in as: <b>${currentUser}</b> | <span id="logout-btn" style="cursor:pointer; color: #3b58ff; margin-left: 10px;">Logout</span>`;
        if (currentUser === "admin@gmail.com") {
            adminContainer.innerHTML = `<a href="add_products.html" style="color: red; font-weight: bold; margin-right:15px;">Add Products</a>`;
        }
        document.getElementById("logout-btn").addEventListener("click", () => {
            sessionStorage.removeItem('loggedInUser');
            window.location.reload();
        });
    }

    // --- Product Animation for Static Items ---
    const cards = document.querySelectorAll(".product-card");
    cards.forEach((card, index) => {
        setTimeout(() => card.classList.add("show"), index * 100);
    });

    // --- Category Filtering ---
    const buttons = document.querySelectorAll(".category-btn");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            const category = button.dataset.category;
            document.querySelectorAll(".product-card").forEach(product => {
                product.style.display = (category === "all" || product.dataset.category === category) ? "block" : "none";
            });
        });
    });

    // --- Loading Custom Products from inventory.txt ---
    const productGrid = document.querySelector(".products");
    fetch('inventory.txt')
        .then(response => response.text())
        .then(data => {
            const lines = data.trim().split('\n');
            lines.forEach(line => {
                const parts = line.split(',');
                if(parts.length >= 5) {
                    const [id, name, category, price, stock] = parts;
                    const card = document.createElement('div');
                    card.className = "product-card show";
                    card.setAttribute('data-category', category.trim());
                    
                    card.innerHTML = `
                        <img src="images/products_pics/PRNF.png" alt="${name}">
                        <small style="color:gray;">ID: ${id}</small>
                        <h3>${name}</h3>
                        <p>Rs.${price}.00</p>
                        <p style="font-size:12px;">Stock: <b>${stock}</b></p>
                        <button onclick="addToCart(this)" ${parseInt(stock) <= 0 ? 'disabled' : ''}>
                            ${parseInt(stock) > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                    `;
                    productGrid.appendChild(card);
                }
            });
        })
        .catch(() => console.log("Inventory file is empty or not yet created."));

    // --- Dynamic Island Cart System ---
    let cartCount = 0;
    const island = document.getElementById("cart-island");
    const islandCount = document.getElementById("island-count");

    window.addToCart = function (button) {
        cartCount++;
        islandCount.innerText = cartCount;
        island.classList.add("active");
        island.classList.remove("pulse");
        void island.offsetWidth; // Force reflow
        island.classList.add("pulse");

        button.innerText = "Added ✓";
        button.style.background = "green";
        setTimeout(() => {
            button.innerText = "Add to Cart";
            button.style.background = "#2a5298";
        }, 800);
    };

    // --- Scroll to Top ---
    const topBtn = document.getElementById("topBtn");
    window.addEventListener("scroll", () => {
        topBtn.style.display = window.scrollY > 200 ? "block" : "none";
    });
    topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
});