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
    setCart([]);
    displayCart();
}

// Appel au chargement
displayCart();