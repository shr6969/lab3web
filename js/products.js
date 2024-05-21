let products;
let cart = [];

async function loadProducts(category) {
    try {
        const response = await fetch('js/data/items.json'); 
        products = await response.json();
        const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);
        uploadFilteredProducts(filteredProducts);
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

function uploadFilteredProducts(filteredProducts) {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = ""; 

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
}

function createProductCard(product) {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    imageContainer.appendChild(image);

    const superRacket = document.createElement("p");
    superRacket.classList.add("super-racket");
    superRacket.textContent = "Super racket";
    imageContainer.appendChild(superRacket);

    productCard.appendChild(imageContainer);

    const details = document.createElement("div");
    details.classList.add("product-details");

    const name = document.createElement("h3");
    name.textContent = product.name;
    details.appendChild(name);

    const price = document.createElement("p");
    price.textContent = "Price: " + product.price;
    details.appendChild(price);

    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "Add to Cart";
    addToCartButton.classList.add("add-to-cart-button");
    addToCartButton.addEventListener("click", () => {
        addToCart(product);
    });
    details.appendChild(addToCartButton);

    productCard.appendChild(details);

    imageContainer.addEventListener("mouseover", () => {
        superRacket.style.display = "block";
    });

    imageContainer.addEventListener("mouseout", () => {
        superRacket.style.display = "none";
    });

    return productCard;
}


function addToCart(product) {
    const existingItemIndex = cart.findIndex(item => item === product);
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity++;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    
    updateCartCount();
    updateCartDropdown();
}

function updateCartCount() {
    const cartIcon = document.getElementById("cart-icon");
    const cartCount = cartIcon.querySelector("span");
    cartCount.textContent = cart.length;
}

function updateCartDropdown(sortBy) {
    let sortedCart = [...cart];
    if (sortBy === 'name-asc') {
        sortedCart.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
        sortedCart.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'price-asc') {
        sortedCart.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
    } else if (sortBy === 'price-desc') {
        sortedCart.sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
    }

    const cartDropdown = document.querySelector(".cartTab .listCart");
    cartDropdown.innerHTML = "";

    let totalPrice = 0; 

    sortedCart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>Price: ${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <button class="remove-from-cart" data-index="${index}">Remove</button>
            </div>
        `;
        cartDropdown.appendChild(cartItem);

        if (!isNaN(parseFloat(item.price.replace('$', '')))) {
            totalPrice += parseFloat(item.price.replace('$', '')) * item.quantity;
        }
    });

    const totalPriceElement = document.createElement("p");
    totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
    cartDropdown.appendChild(totalPriceElement);

    document.querySelectorAll(".remove-from-cart").forEach(button => {
        button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            removeFromCart(index);
        });
    });
}


function updateQuantity(index, newQuantity) {
    cart[index].quantity = parseInt(newQuantity);
    updateCartCount();
    updateCartDropdown();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    updateCartDropdown();
}

document.addEventListener("DOMContentLoaded", function() {
    const cartIcon = document.querySelector(".icon-cart");
    if (cartIcon) {
        cartIcon.addEventListener("click", function (e) {
            e.preventDefault();
            const cartTab = document.querySelector(".cartTab");
            if (cartTab) {
                cartTab.classList.toggle("visible");
            } else {
                console.error("Cart tab element not found.");
            }
        });
    } else {
        console.error("Cart icon not found in the DOM.");
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const closeButton = document.querySelector('.cartTab .btn .close');
    const cartTab = document.querySelector('.cartTab');
    const cartIcon = document.querySelector('#cart-icon');

    cartIcon.addEventListener('click', function() {
        cartTab.classList.toggle('show');
    });

    closeButton.addEventListener('click', function() {
        cartTab.classList.toggle('show');
    });
});

document.querySelector(".checkOut").addEventListener("click", function () {
    alert("Proceeding to checkout...");
});

loadProducts('all');

document.querySelector(".sort-name-asc").addEventListener("click", function () {
    updateCartDropdown('name-asc');
});

document.querySelector(".sort-name-desc").addEventListener("click", function () {
    updateCartDropdown('name-desc');
});

document.querySelector(".sort-price-asc").addEventListener("click", function () {
    updateCartDropdown('price-asc');
});

document.querySelector(".sort-price-desc").addEventListener("click", function () {
    updateCartDropdown('price-desc');
});

function calculateCategoryQuantities(cart) {
    const categoryQuantities = {};

    cart.forEach(item => {
        const category = item.category; 
        if (category in categoryQuantities) {
            categoryQuantities[category] += item.quantity;
        } else {
            categoryQuantities[category] = item.quantity;
        }
    });

    return categoryQuantities;
}




window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    var scrollTopBtn = document.getElementById("scrollTopBtn");
    if (document.body.scrollTop > (window.innerHeight * 2/3) || document.documentElement.scrollTop > (window.innerHeight * 2/3)) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
