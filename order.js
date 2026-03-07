document.addEventListener("DOMContentLoaded", function () {
    // --- Existing Authentication Logic (Kept from your original) ---
    const authLink = document.getElementById("auth-link");
    const adminContainer = document.getElementById("admin-link-container");
    const currentUser = sessionStorage.getItem('loggedInUser');

    if (currentUser === "admin@gmail.com") {
        adminContainer.innerHTML = `<a href="add_products.html" style="color: red; font-weight: bold; margin-right:15px;">Add Products</a>`;
    }

    // --- Load Products from Inventory ---
    const productGrid = document.querySelector(".products");
    const savedInventory = JSON.parse(localStorage.getItem('inventory')) || [];

    savedInventory.forEach(product => {
        const card = document.createElement('div');
        card.className = "product-card show";
        card.setAttribute('data-category', product.category);
        
        // Display the image saved with the Product ID
        card.innerHTML = `
            <img src="${product.imagePath}" alt="${product.name}">
            <small style="color:gray;">ID: ${product.id} | ${product.category}</small>
            <h3>${product.name}</h3>
            <p>Rs.${product.price}.00</p>
            <p style="font-size:12px;">Stock: <b>${product.stock}</b></p>
            <button onclick="addToCart(this)" ${parseInt(product.stock) <= 0 ? 'disabled' : ''}>
                ${parseInt(product.stock) > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
        `;
        productGrid.appendChild(card);
    });

    // --- (Your existing Category Filter and Cart Island logic continues here) ---
});