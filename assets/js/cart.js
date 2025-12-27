let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(product) {
    const existing = cart.find(item => item.code === product.code && item.size === product.size);
    if (existing) existing.qty += product.qty;
    else cart.push(product);
    saveCart();
    updateCartUI();
}

export function removeFromCart(code, size) {
    cart = cart.filter(item => !(item.code === code && item.size === size));
    saveCart();
    updateCartUI();
}

export function updateQty(code, size, qty) {
    const item = cart.find(i => i.code === code && i.size === size);
    if (item) item.qty = qty;
    saveCart();
    updateCartUI();
}

export function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function getCart() {
    return cart;
}

// 更新右側購物車 UI
export function updateCartUI() {
    const sidebar = document.getElementById('cartSidebar');
    if (!sidebar) return;

    const body = sidebar.querySelector('.cart-body');
    body.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <img class="item-img" src="${item.img}">
            <div class="item-info">
                <span class="item-brand">${item.brand}</span>
                <span class="item-name">${item.name}</span>
                <span class="item-spec">顏色：${item.color} / 尺寸：${item.size}</span>
                <span class="item-price">NT$ ${item.price * item.qty}</span>
            </div>
        `;
        body.appendChild(div);
        total += item.price * item.qty;
    });

    const totalEl = sidebar.querySelector('.total-row span:last-child');
    if(totalEl) totalEl.textContent = `NT$ ${total}`;
}
