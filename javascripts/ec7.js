AOS.init();
function getCart() {
    return JSON.parse(localStorage.getItem('dp') || '[]');
}
function setCart(cart) {
    localStorage.setItem('dp', JSON.stringify(cart));
}
function displayCart() {
    const cart = getCart();
    const contenaire = document.getElementById('d1');
    const totalDiv = document.getElementById('d2');
    if (!contenaire) return;

    if (cart.length === 0) {
        contenaire.innerHTML = "<p>Votre panier est vide.</p>";
        if (totalDiv) totalDiv.querySelector('b').textContent = "0€";
        return;
    }

    let total = 0;
    contenaire.innerHTML = cart.map((item, idx) => {
        const prixNum = parseFloat(item.prix.replace('€', '').replace(',', '.')) || 0;
        total += prixNum * item.qty;
        return `
        <div class="d1">
            <img src="${item.img}" alt="${item.nom}" style="width:80px;height:80px;vertical-align:middle;">
            <span class="cart-nom">${item.nom}</span>
            <span class="cart-prix">${item.prix}€</span>
            <span class="cart-qty">x${item.qty}</span>
            <button class="suppression" data-idx="${idx}">Supprimer</button>
        </div>
        `;
    }).join('');

    if (totalDiv) totalDiv.querySelector('b').textContent = total.toFixed(2) + "€";

    // Ajoute la suppression
    contenaire.querySelectorAll('.suppression').forEach(btn => {
        btn.addEventListener('click', function () {
            const idx = parseInt(this.getAttribute('data-idx'));
            let cart = getCart();
            cart.splice(idx, 1);
            setCart(cart);
            displayCart();
        });
    });
}

// Pour le bouton "valider la commande"
function validerCommande() {
    alert("Merci pour votre commande !");

    const cart = getCart();

    // Vérification si le panier est vide
    if (cart.length === 0) {
        alert("Votre panier est vide. Veuillez ajouter des articles avant de valider la commande.");
        return;
    }

    const total = cart.reduce((sum, item) => {
        const prixNum = parseFloat(item.prix.replace('€', '').replace(',', '.')) || 0;
        return sum + (prixNum * item.qty);
    }, 0).toFixed(2);

    window.location.href = `https://pay.devforge.space/pay/v1/253e830ca164daa2a859cd515c9e013c78a6c1e45602a77b86a5e8bdd0420553?amount=${total}&currency=CDF&reference=starshop-001`; // Redirection vers la page de paiement
    setCart([]);
    displayCart();
}

// Appel au chargement
displayCart();