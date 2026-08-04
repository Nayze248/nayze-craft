<script>
    // Toggle du menu mobile
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Fonction de test pour le tiroir du panier
    function toggleCartDrawer() {
        alert("Ouverture du panneau latéral du panier !");
    }


</script>