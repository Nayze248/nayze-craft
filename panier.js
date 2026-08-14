// --- AFFICHAGE DE LA PAGE PANIER ---
function renderCartPage() {
    const container = document.getElementById('cartPageContainer');
    if (!container) return; // Sécurité si on n'est pas sur la bonne page

    const cart = JSON.parse(localStorage.getItem('myCart')) || [];

    // Cas où le panier est vide
    if (cart.length === 0) {
        container.className = "text-center py-12 bg-white rounded-xl shadow-md p-8 col-span-3";
        container.innerHTML = `
            <p class="text-5xl mb-4">🛒</p>
            <h3 class="text-2xl font-bold text-gray-800 mb-2">Votre panier est vide</h3>
            <p class="text-gray-500 mb-6">Ajoutez des composants depuis la page d'accueil.</p>
            <a href="index.html" class="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-lg text-white">
                Voir les offres composants
            </a>
        `;
        return;
    }

    // Cas où il y a des articles
    container.className = "grid grid-cols-1 lg:grid-cols-3 gap-8";
    let total = 0;
    let itemsHTML = '<div class="lg:col-span-2 space-y-4">';

    cart.forEach((item, index) => {
        total += item.price;
        itemsHTML += `
            <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center">
                <div>
                    <h4 class="font-bold text-lg text-gray-800">${item.name}</h4>
                    <p class="text-green-600 font-bold mt-1">${item.price.toFixed(2)} €</p>
                </div>
                <button type="button" onclick="removeFromCart(${index})" class="bg-red-50 text-red-500 hover:bg-red-100 px-3 py-1.5 rounded-lg font-semibold text-sm transition">
                    Supprimer
                </button>
            </div>
        `;
    });

    itemsHTML += '</div>';

    const summaryHTML = `
        <div class="bg-white p-6 rounded-xl shadow-md border border-gray-200 h-fit space-y-6">
            <h3 class="text-xl font-bold text-gray-800 border-b pb-3">Récapitulatif</h3>
            <div class="flex justify-between text-lg font-bold text-gray-800">
                <span>Total (${cart.length} articles)</span>
                <span class="text-green-600">${total.toFixed(2)} €</span>
            </div>
            <a href="configurateur.html" class="block text-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-lg shadow-md">
                Commander le montage →
            </a>
        </div>
    `;

    container.innerHTML = itemsHTML + summaryHTML;
}

// --- FONCTION DE SUPPRESSION ---
window.removeFromCart = function(index) {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('myCart', JSON.stringify(cart));
    
    // Met à jour le badge (fonction dans main.js)
    if (typeof updateCartBadge === 'function') {
        updateCartBadge();
    }
    renderCartPage();
};

// Exécution au chargement
document.addEventListener('DOMContentLoaded', () => {
    renderCartPage();
});