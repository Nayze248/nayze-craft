// --- FONCTION DE LECTURE DU PANIER ---
function getCart() {
    try {
        return JSON.parse(localStorage.getItem('myCart')) || [];
    } catch (e) {
        return [];
    }
}

// --- MISE À JOUR DU COMPTEUR DE LA NAVBAR ---
function updateCartBadge() {
    const cart = getCart();
    const badges = document.querySelectorAll('#cartBadge, .cart-count-mobile');
    badges.forEach(badge => {
        badge.innerText = cart.length;
    });
}

// --- FONCTION D'AJOUT D'UN PRODUIT ---
window.addToCart = function(productName, price) {
    const cart = getCart();
    cart.push({ name: productName, price: parseFloat(price) });
    localStorage.setItem('myCart', JSON.stringify(cart));
    updateCartBadge();
    alert(`✅ ${productName} a été ajouté au panier !`);
};

// Exécution au chargement
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();

    // Gestion du Menu Mobile
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
});