// index.js - 商品列表頁

import { fetchProducts } from './api.js';
import { addToCart } from './cart.js';

document.addEventListener('DOMContentLoaded', async () => {
  const productList = document.getElementById('product-list');
  if (!productList) return;

  const products = await fetchProducts();

  products.forEach(product => {
    const lowestPrice = Math.min(
      ...Object.values(product.sizes)
        .filter(s => s)
        .map(s => s.salePrice || s.price)
    );

    const html = `
      <div class="product-card">
        <img src="${product.mainImage}" alt="${product.name}">
        <div class="brand">${product.brand}</div>
        <div class="name">${product.name}</div>
        <div class="price">$${lowestPrice}</div>
        <button class="view-detail" data-code="${product.code}">查看</button>
        <button class="add-cart" data-code="${product.code}">加入購物車</button>
      </div>
    `;
    productList.innerHTML += html;
  });

  // 點擊查看商品
  document.querySelectorAll('.view-detail').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const code = e.target.dataset.code;
      window.location.href = `detail.html?code=${code}`;
    });
  });

  // 點擊加入購物車
  document.querySelectorAll('.add-cart').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const code = e.target.dataset.code;
      const product = products.find(p => p.code === code);
      if (!product) return;

      // 預設選擇第一個尺寸和顏色
      const sizeKey = Object.keys(product.sizes).find(k => product.sizes[k]);
      const size = product.sizes[sizeKey].options[0];
      const color = product.colors[0].name;

      addToCart(product, size, color, 1);
      alert(`${product.name} 已加入購物車`);
    });
  });
});
