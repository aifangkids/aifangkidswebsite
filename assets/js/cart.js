// cart.js - 全站共用購物車邏輯

export let cart = JSON.parse(localStorage.getItem('cart') || '[]');

export function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// 加入購物車
export function addToCart(product, size, color, qty = 1) {
  if (!product || !size || !color) return;

  const existingIndex = cart.findIndex(
    (item) => item.code === product.code && item.size === size && item.color === color
  );

  const price = product.sizes?.[size.toLowerCase()]?.salePrice || product.sizes?.[size.toLowerCase()]?.price || 0;

  const cartItem = {
    code: product.code,
    name: product.name,
    size,
    color,
    price,
    qty
  };

  if (existingIndex > -1) {
    cart[existingIndex].qty += qty;
  } else {
    cart.push(cartItem);
  }

  saveCart();
  renderCartPreview();
}

// 刪除商品
export function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCartPreview();
}

// 計算購物車價格（小計、折扣、運費、總額）
export function calculateCart(paymentMethod = '') {
  let subtotal = 0;
  cart.forEach(item => {
    subtotal += (item.price || 0) * (item.qty || 1);
  });

  // TODO: 1+1 折扣判斷，可用 item.code 與 stylingTips
  let bundleDiscount = 0; // 簡單示範
  // let bundleDiscount = calcBundleDiscount(cart);

  let afterBundle = subtotal - bundleDiscount;

  let paymentDiscount = 1;
  let shippingFee = 45;

  if (paymentMethod === 'bank') {
    paymentDiscount = 0.8;
    shippingFee = 0;
  } else if (paymentMethod === 'cod') {
    paymentDiscount = 0.9;
  }

  let total = afterBundle * paymentDiscount;

  if (total >= 1500) shippingFee = 0;

  total += shippingFee;

  return { subtotal, bundleDiscount, paymentDiscount, shippingFee, total };
}

// 渲染右側購物車預覽
export function renderCartPreview() {
  const container = document.getElementById('cart-preview');
  if (!container) return;

  container.innerHTML = '';

  cart.forEach((item, index) => {
    const name = item?.name || '未知商品';
    const size = item?.size || '';
    const color = item?.color || '';
    const price = item?.price || 0;
    const qty = item?.qty || 1;

    const html = `
      <div class="cart-item">
        <span class="cart-item-name">${name}</span>
        <span class="cart-item-size">${size}</span>
        <span class="cart-item-color">${color}</span>
        <span class="cart-item-price">$${price}</span>
        <span class="cart-item-qty">x${qty}</span>
        <button class="cart-item-remove" data-index="${index}">刪除</button>
      </div>
    `;
    container.innerHTML += html;
  });

  // 綁定刪除按鈕
  container.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.target.dataset.index);
      removeFromCart(idx);
    });
  });
}

// 初始化右側購物車預覽
document.addEventListener('DOMContentLoaded', renderCartPreview);
