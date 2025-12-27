import { fetchProducts } from './api.js';
import { addToCart, updateCartUI } from './cart.js';

document.addEventListener('DOMContentLoaded', async () => {
    const products = await fetchProducts();
    renderProducts(products);

    updateCartUI();
});

function renderProducts(products) {
    const grid2 = document.querySelector('.grid-2col');
    const grid4 = document.querySelector('.grid-4col');
    if (!grid2 || !grid4) return;

    products.forEach(p => {
        const card = document.createElement('div');
        card.classList.add('p-card');
        card.innerHTML = `
            <div class="p-img-box">
                <img class="p-img-main" src="${p.img}">
            </div>
            <div class="p-info">
                <div class="p-name">${p.name}</div>
                <div class="p-price">NT$ ${p.price}</div>
            </div>
        `;
        card.onclick = () => showDetail(p);
        grid2.appendChild(card);
    });
}

function showDetail(product) {
    window.location.href = `detail.html?code=${product.code}`;
}

// 側欄選單
window.openNav = function(id) {
    document.getElementById(id).classList.add('active');
    document.getElementById('overlay').style.display = 'block';
}

window.closeAll = function() {
    document.querySelectorAll('.side-nav').forEach(n => n.classList.remove('active'));
    document.getElementById('overlay').style.display = 'none';
}
