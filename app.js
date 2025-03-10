const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const searchBtn = document.querySelector('.search-btn');
const searchOverlay = document.getElementById('search-overlay');
const closeSearchBtn = document.querySelector('.close-search');
const cartBtn = document.querySelector('.cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCartBtn = document.querySelector('.close-cart');
const overlay = document.getElementById('overlay');
const newsletterForm = document.getElementById('newsletter-form');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (closeSearchBtn) {
    closeSearchBtn.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
}

if (cartBtn) {
    cartBtn.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (closeCartBtn) {
    closeCartBtn.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
}

if (overlay) {
    overlay.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
}

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email) {
            showNotification('Thanks for subscribing to our newsletter!');
            emailInput.value = '';
        }
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

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

function addDynamicStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.textContent = `
        /* Mobile menu active state */
        .menu-toggle.active .bar:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .menu-toggle.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .menu-toggle.active .bar:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        /* Search overlay styles */
        .search-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .search-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        
        .search-container {
            width: 80%;
            max-width: 600px;
            position: relative;
        }
        
        .search-container input {
            width: 100%;
            padding: 1rem;
            border: none;
            border-bottom: 2px solid var(--primary-color);
            background-color: transparent;
            color: white;
            font-size: 1.2rem;
            outline: none;
        }
        
        .search-container input::placeholder {
            color: rgba(255, 255, 255, 0.7);
        }
        
        .close-search {
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
        }
        
        /* Overlay */
        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .overlay.active {
            opacity: 1;
            visibility: visible;
        }
        
        /* Cart styles */
        .cart-item-image {
            width: 80px;
            height: 80px;
            overflow: hidden;
            border-radius: var(--border-radius-sm);
        }
        
        .cart-item-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .cart-item-details {
            flex: 1;
        }
        
        .cart-item-details h4 {
            margin-bottom: 0.5rem;
        }
        
        .cart-item-price {
            color: var(--primary-color);
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        
        .cart-item-quantity {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .quantity-btn {
            width: 25px;
            height: 25px;
            border-radius: 50%;
            background-color: var(--background-light);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
        }
        
        .remove-item {
            color: var(--text-light);
            transition: var(--transition);
        }
        
        .remove-item:hover {
            color: var(--accent-color);
        }
        
        .empty-cart {
            text-align: center;
            padding: 2rem 0;
            color: var(--text-light);
        }
        
        .cart-footer {
            padding: 1.5rem;
            border-top: 1px solid var(--border-color);
        }
        
        .cart-total {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            font-weight: 600;
        }
        
        .total-price {
            color: var(--primary-color);
            font-size: 1.2rem;
        }
        
        .checkout-btn {
            width: 100%;
            padding: 0.8rem;
            background-color: var(--primary-color);
            color: white;
            border-radius: var(--border-radius);
            font-weight: 600;
            transition: var(--transition);
        }
        
        .checkout-btn:hover {
            background-color: var(--primary-dark);
        }
        
        /* Notification */
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: white;
            border-left: 4px solid var(--primary-color);
            box-shadow: var(--shadow-md);
            border-radius: var(--border-radius-sm);
            padding: 1rem;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 2000;
        }
        
        .notification.show {
            transform: translateX(0);
            opacity: 1;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .notification-content i {
            color: var(--primary-color);
            font-size: 1.2rem;
        }
        
        /* Responsive styles */
        @media (max-width: 1200px) {
            .products-container,
            .category-container {
                grid-template-columns: repeat(3, 1fr);
            }
        }
        
        @media (max-width: 992px) {
            .features {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .about-content {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
            
            .footer-container {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .cart-sidebar {
                width: 350px;
            }
        }
        
        @media (max-width: 768px) {
            .products-container,
            .category-container,
            .testimonial-container {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .menu-toggle {
                display: flex;
            }
            
            .nav-menu {
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background-color: var(--background-color);
                flex-direction: column;
                align-items: center;
                padding: 1rem 0;
                box-shadow: var(--shadow-md);
                opacity: 0;
                visibility: hidden;
                transform: translateY(-10px);
                transition: var(--transition);
            }
            
            .nav-menu.active {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
            
            .newsletter-form {
                flex-direction: column;
            }
            
            .newsletter-form input {
                border-radius: var(--border-radius);
                margin-bottom: 1rem;
            }
            
            .newsletter-form button {
                border-radius: var(--border-radius);
                padding: 1rem;
            }
            
            .hero h1 {
                font-size: 2.5rem;
            }
        }
        
        @media (max-width: 576px) {
            .products-container,
            .category-container,
            .testimonial-container {
                grid-template-columns: 1fr;
            }
            
            .testimonial-card {
                flex-direction: column;
                align-items: center;
                text-align: center;
            }
            
            .footer-container {
                grid-template-columns: 1fr;
            }
            
            .footer-bottom {
                flex-direction: column;
                gap: 1rem;
            }
            
            .cart-sidebar {
                width: 100%;
            }
        }
    `;
    
    document.head.appendChild(styleSheet);
}

addDynamicStyles();

document.addEventListener('DOMContentLoaded', () => {
    const currentLocation = window.location.href;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        if (link.href === currentLocation) {
            link.classList.add('active');
        }
    });
    
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .category-card, .product-card, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    setTimeout(animateOnScroll, 100);
    
    window.addEventListener('scroll', animateOnScroll);
});