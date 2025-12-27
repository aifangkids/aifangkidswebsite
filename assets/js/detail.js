import { addToCart, updateCartUI } from './cart.js';

document.addEventListener('DOMContentLoaded', () => {
    const colorSwatches = document.querySelectorAll('.swatch');
    colorSwatches.forEach(s => s.addEventListener('click', () => pickColor(s)));

    const sizeBtns = document.querySelectorAll('.s-btn');
    sizeBtns.forEach(b => b.addEventListener('click', () => pickSize(b)));

    document.querySelector('.buy-btn').addEventListener('click', addProductToCart);
});

let selectedColor = null;
let selectedSize = null;

function pickColor(el) {
    document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
    el.classList.add('active');
    selectedColor = el.querySelector('.swatch-name').textContent;
    const img = el.querySelector('img');
    if(img) document.getElementById('main-img').src = img.src;
}

function pickSize(el) {
    document.querySelectorAll('.s-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    selectedSize = el.textContent;
}

function addProductToCart() {
    const name = document.querySelector('.product-title').textContent;
    const brand = document.querySelector('.brand-tag').textContent;
    const price = parseInt(document.querySelector('.size-category .category-header span').textContent.replace(/[^\d]/g,''));
    const qty = parseInt(document.getElementById('qty').value);
    const img = document.getElementById('main-img').src;

    if(!selectedSize || !selectedColor){
        alert('請選擇顏色與尺寸');
        return;
    }

    addToCart({ name, brand, price, qty, color: selectedColor, size: selectedSize, img, code: 'dummy' });
    alert('已加入購物車');
    updateCartUI();
}

// 快速預覽
window.togglePreview = function(id) {
    const tip = document.getElementById(id);
    tip.style.display = tip.style.display === 'block' ? 'none' : 'block';
}
document.addEventListener('click', () => {
    const tip = document.getElementById('p1');
    if(tip) tip.style.display = 'none';
});
