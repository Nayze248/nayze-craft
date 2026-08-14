// --- 1. INITIALISATION DU PANIER ---
// On charge les données stockées dans le navigateur dès l'ouverture du script
let cart = [];
try {
    cart = JSON.parse(localStorage.getItem('configGamerCart')) || [];
} catch (e) {
    cart = [];
}

// --- 2. FONCTION DE SAUVEGARDE ---
function saveCart() {
    localStorage.setItem('configGamerCart', JSON.stringify(cart));
}

// --- 3. MISE À JOUR DU BADGE DU PANIER ---
function updateCartUI() {
    const badges = document.querySelectorAll('#cartBadge, .cart-count-mobile');
    badges.forEach(badge => {
        badge.innerText = cart.length;
    });
}

// --- 4. FONCTIONS GLOBALES DU PANIER ---

// Ajouter un produit (depuis index.html)
window.addToCart = function(productName, price) {
    cart.push({ name: productName, price: price });
    saveCart();
    updateCartUI();
    alert(`✅ ${productName} (${price} €) a été ajouté à votre panier !`);
};

// Supprimer un produit
window.removeFromCart = function(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
    renderCartPage();
};

// Vider le panier
window.clearCart = function() {
    if (confirm("Voulez-vous vraiment vider tout le panier ?")) {
        cart = [];
        saveCart();
        updateCartUI();
        renderCartPage();
    }
};

// --- 5. AFFICHAGE DYNAMIQUE SUR PANIER.HTML ---
function renderCartPage() {
    const container = document.getElementById('cartPageContainer');
    if (!container) return; // Si la page actuelle n'est pas panier.html, on s'arrête

    if (cart.length === 0) {
        // Affichage Panier Vide
        container.className = "text-center py-12 bg-white rounded-xl shadow-md border border-gray-200 p-8";
        container.innerHTML = `
            <p class="text-5xl mb-4">🛒</p>
            <h3 class="text-2xl font-bold text-gray-800 mb-2">Votre panier est vide</h3>
            <p class="text-gray-500 mb-6">Vous n'avez pas encore ajouté de composants à votre sélection.</p>
            <a href="index.html" class="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-lg transition">
                Découvrir les offres composants
            </a>
        `;
    } else {
        // Affichage Panier Rempli
        container.className = "grid grid-cols-1 lg:grid-cols-3 gap-8";

        let total = 0;
        let itemsHTML = '<div class="lg:col-span-2 space-y-4">';

        cart.forEach((item, index) => {
            const itemPrice = parseFloat(item.price) || 0;
            total += itemPrice;
            itemsHTML += `
                <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center">
                    <div>
                        <h4 class="font-bold text-gray-800 text-lg">${item.name}</h4>
                        <p class="text-green-600 font-bold text-md mt-1">${itemPrice.toFixed(2)} €</p>
                    </div>
                    <button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg text-sm font-semibold transition">
                        Supprimer
                    </button>
                </div>
            `;
        });

        itemsHTML += `
            <div class="flex justify-between items-center pt-2">
                <button onclick="clearCart()" class="text-sm text-gray-500 hover:text-red-600 underline">
                    Vider tout le panier
                </button>
                <a href="index.html" class="text-sm text-blue-600 hover:underline">
                    + Ajouter d'autres composants
                </a>
            </div>
        </div>`;

        // Résumé des prix
        const summaryHTML = `
            <div class="bg-white p-6 rounded-xl shadow-md border border-gray-200 h-fit space-y-6">
                <h3 class="text-xl font-bold text-gray-800 border-b pb-3">Récapitulatif</h3>
                
                <div class="flex justify-between text-gray-600">
                    <span>Articles (${cart.length})</span>
                    <span>${total.toFixed(2)} €</span>
                </div>

                <div class="border-t pt-4 flex justify-between items-center">
                    <span class="text-lg font-bold text-gray-800">Total estimé</span>
                    <span class="text-2xl font-black text-green-600">${total.toFixed(2)} €</span>
                </div>

                <a href="configurateur.html" class="block text-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-lg shadow-md transition">
                    Demander le montage sur mesure →
                </a>
            </div>
        `;

        container.innerHTML = itemsHTML + summaryHTML;
    }
}

// --- 6. EXECUTION AU CHARGEMENT DU DOM ---
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    renderCartPage();

    // Menu Mobile
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
});