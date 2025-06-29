AOS.init();
function getCart() {
    return JSON.parse(localStorage.getItem('dp') || '[]');
}
function setCart(cart) {
    localStorage.setItem('dp', JSON.stringify(cart));
}
function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    let cartCount = document.getElementById('cart-count');
    if (!cartCount) {
        cartCount = document.createElement('span');
        cartCount.id = 'cart-count';
        cartCount.style = "font-size:20px; color:#3bbcec; margin-left:20px;";
        document.body.insertBefore(cartCount, document.body.firstChild);
    }
    cartCount.textContent = `Panier : ${count}`;
}

document.querySelectorAll('.d2 .b1').forEach(btn => {
    btn.addEventListener('click', function () {
        const produit = this.closest('.d2');
        const p = produit.querySelector('p');
        const nom = p ? p.childNodes[0].textContent.trim() : 'Produit';
        const prix = p ? p.textContent.replace(/[^\d,]/g, '').replace(',', '.') : '';
        const img = produit.querySelector('img')?.getAttribute('src') || '';
        const confirmation = confirm(`Voulez-vous vraiment ajouter "${nom}" à votre panier ?`);
        if (confirmation) {
            let cart = getCart();
            let found = cart.find(item => item.nom === nom);
            if (found) {
                found.qty += 1;
            } else {
                cart.push({ nom, img, prix, qty: 1 });
            }
            setCart(cart);
            updateCartCount();
            alert(`"${nom}" a bien été ajouté à votre panier !`);
        }
    });
});

updateCartCount();
