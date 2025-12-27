import { fetchProducts } from './api.js';
import { addToCart } from './cart.js';

document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();
  const container = document.querySelector('#product-list');

  products.forEach(product => {
    const priceArr = [];
    ['bebe','kids','junior'].forEach(sz => {
      if (product.sizes[sz]) priceArr.push(product.sizes[sz].salePrice);
    });
    const minPrice = Math.min(...priceArr);

    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.mainImage}" />
      <div class="brand">${product.brand}</div>
      <div class="name">${product.name}</div>
      <div class="price">${minPrice}</div>
      <div class="colors">
        ${product.colors.map(c => `<span style="background:${c.value}"></span>`).join('')}
      </div>
    `;
    card.addEventListener('click', () => window.location.href = `detail.html?code=${product.code}`);
    container.appendChild(card);
  });
});
