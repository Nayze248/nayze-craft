// --- 1. METTRE À JOUR LE COMPTEUR (Badge) ---
function updateBadge() {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    const badges = document.querySelectorAll('#cartBadge');
    badges.forEach(badge => {
        badge.innerText = cart.length;
    });
}

// --- 2. AJOUTER UN PRODUIT (Utilisé sur index.html) ---
window.addToCart = function(productName, price) {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    cart.push({ name: productName, price: parseFloat(price) });
    localStorage.setItem('myCart', JSON.stringify(cart));
    
    updateBadge();
    alert(`✅ ${productName} a été ajouté au panier !`);
};

// --- 3. AFFICHER LE PANIER (Utilisé sur panier.html) ---
function renderCartPage() {
    const container = document.getElementById('cartPageContainer');
    if (!container) return; // Sécurité si on n'est pas sur la page panier

    let cart = JSON.parse(localStorage.getItem('myCart')) || [];

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12 bg-white rounded-xl shadow-md p-8 col-span-3">
                <p class="text-5xl mb-4">🛒</p>
                <h3 class="text-2xl font-bold text-gray-800 mb-2">Votre panier est vide</h3>
                <a href="index.html" class="inline-block mt-4 bg-blue-600 text-white font-bold px-6 py-3 rounded-lg">
                    Retourner aux offres
                </a>
            </div>
        `;
        return;
    }

    let total = 0;
    let htmlContent = '<div class="lg:col-span-2 space-y-4">';

    cart.forEach((item, index) => {
        total += item.price;
        htmlContent += `
            <div class="bg-white p-5 rounded-xl shadow-sm border flex justify-between items-center">
                <div>
                    <h4 class="font-bold text-lg text-gray-800">${item.name}</h4>
                    <p class="text-green-600 font-bold mt-1">${item.price.toFixed(2)} €</p>
                </div>
                <button onclick="removeFromCart(${index})" class="bg-red-50 text-red-500 hover:bg-red-100 px-3 py-1.5 rounded-lg font-semibold text-sm">
                    Supprimer
                </button>
            </div>
        `;
    });

    htmlContent += `</div>`;

    // Bloc récapitulatif du total
    htmlContent += `
        <div class="bg-white p-6 rounded-xl shadow-md border h-fit space-y-6">
            <h3 class="text-xl font-bold text-gray-800 border-b pb-3">Récapitulatif</h3>
            <div class="flex justify-between text-lg font-bold text-gray-800">
                <span>Total</span>
                <span class="text-green-600">${total.toFixed(2)} €</span>
            </div>
            <a href="configurateur.html" class="block text-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-lg shadow-md">
                Commander le montage →
            </a>
        </div>
    `;

    container.innerHTML = htmlContent;
}

// --- 4. SUPPRIMER UN PRODUIT ---
window.removeFromCart = function(index) {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('myCart', JSON.stringify(cart));
    
    updateBadge();
    renderCartPage();
};

// --- EXécution AUTOMATIQUE AU CHARGEMENT ---
document.addEventListener('DOMContentLoaded', () => {
    updateBadge();
    renderCartPage();
});