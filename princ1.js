// Attendre le chargement complet de la page HTML
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. GESTION DU MENU MOBILE ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- 2. GESTION DU PANIER ET LOCALSTORAGE ---
    // Charger le panier depuis la mémoire du navigateur (localStorage)
    window.cart = JSON.parse(localStorage.getItem('configGamerCart')) || [];
    
    // Mettre à jour l'affichage du panier au chargement
    updateCartUI();

    // Fonction d'ajout au panier
    window.addToCart = function(productName, price) {
        window.cart.push({ name: productName, price: price });
        saveCart();
        updateCartUI();
        alert(`${productName} (${price} €) a été ajouté à votre panier !`);
    };

    // Fonction de réinitialisation/vidage du panier
    window.clearCart = function() {
        if (confirm("Voulez-vous vraiment vider votre panier ?")) {
            window.cart = [];
            saveCart();
            updateCartUI();
        }
    };

    // Affichage des éléments du panier
    window.toggleCartDrawer = function() {
        if (window.cart.length === 0) {
            alert("Votre panier est actuellement vide.");
        } else {
            let total = 0;
            let summary = "--- VOTRE PANIER ---\n\n";
            window.cart.forEach((item, index) => {
                summary += `${index + 1}. ${item.name} - ${item.price} €\n`;
                total += parseFloat(item.price);
            });
            summary += `\nTOTAL : ${total.toFixed(2)} €`;
            alert(summary);
        }
    };

    // Fonction interne pour sauvegarder dans le navigateur
    function saveCart() {
        localStorage.setItem('configGamerCart', JSON.stringify(window.cart));
    }

    // Fonction interne pour mettre à jour les compteurs du panier
    function updateCartUI() {
        const badges = document.querySelectorAll('#cartBadge, .cart-count-mobile');
        badges.forEach(badge => {
            badge.innerText = window.cart.length;
        });
    }
});


// Charger dynamiquement les prix affiliés au chargement de la page
async function loadAffiliatePrices() {
    try {
        const response = await fetch('prices.json');
        const data = await response.json();

        // Exemple pour la RTX 4070 Super
        if (data.rtx_4070_super) {
            const item = data.rtx_4070_super;
            
            // Mise à jour de l'affichage du prix
            const priceElement = document.getElementById('rtx4070-price');
            if (priceElement) priceElement.innerText = `${item.best_price.toFixed(2)} €`;

            // Mise à jour du nom du marchand le moins cher
            const merchantElement = document.getElementById('rtx4070-merchant');
            if (merchantElement) merchantElement.innerText = `Meilleur prix sur ${item.merchant}`;

            // Redirection vers le lien d'affiliation lors du clic
            const buyBtn = document.getElementById('rtx4070-buy-btn');
            if (buyBtn) {
                buyBtn.onclick = () => window.open(item.affiliate_url, '_blank');
            }
        }
    } catch (error) {
        console.error("Erreur de chargement des prix :", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadAffiliatePrices();
});