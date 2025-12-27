import { getCart, removeFromCart, updateQty } from './cart.js';

document.addEventListener('DOMContentLoaded', () => {
    renderCheckout();
});

function renderCheckout() {
    const orderList = document.querySelector('.container');
    if(!orderList) return;

    const cartItems = getCart();
    let subtotal = 0;

    cartItems.forEach(item => subtotal += item.price * item.qty);

    // 顯示金額
    const subtotalEl = document.querySelector('.summary-row span:nth-child(2)');
    if(subtotalEl) subtotalEl.textContent = `NT$ ${subtotal}`;

    const totalEl = document.querySelector('.total-row span:last-child');
    if(totalEl) totalEl.textContent = `NT$ ${subtotal - 100}`; // 模擬折扣 100
}

window.confirmOrder = function() {
    alert('訂單已送出！感謝您的購買');
    localStorage.removeItem('cart');
}
