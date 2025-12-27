import { fetchProductByCode, fetchDetailByCode } from './api.js';
import { addToCart } from './cart.js';

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  if (!code) return;

  const product = await fetchProductByCode(code);
  const detail = await fetchDetailByCode(code);

  document.querySelector('#product-title').textContent = `${product.brand} - ${product.name}`;
  document.querySelector('#material').textContent = detail.material;
  document.querySelector('#description').textContent = detail.description;

  const colorContainer = document.querySelector('#color-options');
  product.colors.forEach(c => {
    const btn = document.createElement('button');
    btn.style.background = c.value;
    btn.addEventListener('click', () => selectedColor = c);
    colorContainer.appendChild(btn);
  });

  const sizeContainer = document.querySelector('#size-options');
  ['bebe','kids','junior'].forEach(sz => {
    if(product.sizes[sz]){
      product.sizes[sz].options.forEach(s=>{
        const btn = document.createElement('button');
        btn.textContent = s.split('|')[0];
        btn.addEventListener('click', ()=> selectedSize = sz);
        sizeContainer.appendChild(btn);
      });
    }
  });

  document.querySelector('#add-to-cart').addEventListener('click', ()=>{
    addToCart(product, selectedSize, selectedColor);
  });
});
