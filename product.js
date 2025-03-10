const productsData = [
    {
        id: 1,
        name: "Organic Broccoli",
        category: "Leafy Greens",
        price: 3.99,
        oldPrice: 4.99,
        image: "assets/brocoli.jpg",
        rating: 4.8,
        reviews: 124,
        isOrganic: true,
        inStock: true,
        description: "Fresh organic broccoli, rich in vitamins and minerals."
    },
    {
        id: 2,
        name: "Fresh Carrots",
        category: "Root Vegetables",
        price: 2.49,
        oldPrice: null,
        image: "assets/carrots.jpg",
        rating: 4.6,
        reviews: 98,
        isOrganic: true,
        inStock: true,
        description: "Sweet and crunchy organic carrots, perfect for salads and cooking."
    },
    {
        id: 3,
        name: "Red Bell Peppers",
        category: "Peppers",
        price: 2.99,
        oldPrice: 3.49,
        image: "assets/peppers.jpg",
        rating: 4.7,
        reviews: 85,
        isOrganic: true,
        inStock: true,
        description: "Vibrant red bell peppers with a sweet, crisp flavor."
    },
    {
        id: 4,
        name: "Organic Spinach",
        category: "Leafy Greens",
        price: 3.49,
        oldPrice: null,
        image: "assets/spinach.jpg",
        rating: 4.9,
        reviews: 156,
        isOrganic: true,
        inStock: true,
        description: "Tender organic spinach leaves, packed with nutrients."
    },
    {
        id: 5,
        name: "Sweet Potatoes",
        category: "Root Vegetables",
        price: 1.99,
        oldPrice: 2.49,
        image: "assets/potatoes.jpg",
        rating: 4.5,
        reviews: 73,
        isOrganic: true,
        inStock: true,
        description: "Nutritious sweet potatoes, great for baking, roasting, or mashing."
    },
    {
        id: 6,
        name: "Fresh Zucchini",
        category: "Squash",
        price: 1.79,
        oldPrice: null,
        image: "assets/acar.jpg",
        rating: 4.4,
        reviews: 62,
        isOrganic: true,
        inStock: true,
        description: "Tender green zucchini, versatile for many recipes."
    },
    {
        id: 7,
        name: "Cherry Tomatoes",
        category: "Tomatoes",
        price: 3.99,
        oldPrice: 4.49,
        image: "assets/tomatoes.jpg",
        rating: 4.7,
        reviews: 92,
        isOrganic: true,
        inStock: true,
        description: "Sweet and juicy cherry tomatoes, perfect for salads and snacking."
    },
    {
        id: 8,
        name: "Yellow Onions",
        category: "Alliums",
        price: 1.29,
        oldPrice: null,
        image: "assets/onion.jpg",
        rating: 4.3,
        reviews: 58,
        isOrganic: true,
        inStock: true,
        description: "Flavorful yellow onions, a kitchen staple for countless recipes."
    }
];


let cart = [];

const productsContainer = document.getElementById('products-container');
const cartItems = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const totalPrice = document.querySelector('.total-price');

function displayProducts() {
    if (!productsContainer) return;
    
    productsContainer.innerHTML = '';
    
    productsData.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        
        const starsHTML = generateStarsHTML(product.rating);
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.isOrganic ? '<span class="product-tag">Organic</span>' : ''}
                <div class="product-actions">
                    <button class="action-btn"><i class="far fa-heart"></i></button>
                    <button class="action-btn"><i class="fas fa-eye"></i></button>
                </div>
                <button class="add-to-cart" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i>
                    Add to Cart
                </button>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
                </div>
                <div class="product-rating">
                    <div class="stars">${starsHTML}</div>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
        
        const addToCartBtn = productCard.querySelector('.add-to-cart');
        addToCartBtn.addEventListener('click', () => {
            addToCart(product.id);
        });
    });
}

function generateStarsHTML(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    if (halfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

function addToCart(productId) {
    const product = productsData.find(item => item.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCart();
    
    // Show notification
    showNotification(`${product.name} added to cart!`);
    
    // Open cart sidebar
    document.getElementById('cart-sidebar').classList.add('active');
    document.getElementById('overlay').classList.add('active');
}

function updateCart() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (cartItems) {
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart"> <i class="fas fa-shopping-basket"></i><p>Your cart is empty</p><button class="cta-button-secondary continue-shopping">Continue Shopping</button></div>';
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                
                cartItem.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn increase" data-id="${item.id}">+</button>
                        </div>
                    </div>
                    <button class="remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                
                cartItems.appendChild(cartItem);
                
                const decreaseBtn = cartItem.querySelector('.decrease');
                const increaseBtn = cartItem.querySelector('.increase');
                const removeBtn = cartItem.querySelector('.remove-item');
                
                decreaseBtn.addEventListener('click', () => {
                    updateItemQuantity(item.id, -1);
                });
                
                increaseBtn.addEventListener('click', () => {
                    updateItemQuantity(item.id, 1);
                });
                
                removeBtn.addEventListener('click', () => {
                    removeFromCart(item.id);
                });
            });
        }
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (totalPrice) {
        totalPrice.textContent = `$${total.toFixed(2)}`;
    }
    
    saveCartToLocalStorage();
}

function updateItemQuantity(itemId, change) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    if (itemIndex === -1) return;
    
    cart[itemIndex].quantity += change;
    
    if (cart[itemIndex].quantity <= 0) {
        removeFromCart(itemId);
    } else {
        updateCart();
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCart();
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function saveCartToLocalStorage() {
    localStorage.setItem('vegShopCart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('vegShopCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

function searchProducts(query) {
    query = query.toLowerCase().trim();
    
    const filteredProducts = productsData.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
    
    return filteredProducts;
}

function filterProductsByCategory(category) {
    if (category === 'all') {
        return productsData;
    } else {
        return productsData.filter(product => product.category === category);
    }
}

function sortProducts(products, sortBy) {
    const sortedProducts = [...products];
    
    switch (sortBy) {
        case 'price-low-high':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high-low':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-a-z':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-z-a':
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'rating':
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:
            sortedProducts.sort((a, b) => b.id - a.id);
    }
    
    return sortedProducts;
}

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    loadCartFromLocalStorage();
    
});

window.vegShop = {
    addToCart,
    removeFromCart,
    updateItemQuantity,
    searchProducts,
    filterProductsByCategory,
    sortProducts
};