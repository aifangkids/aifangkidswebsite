// 全站共用購物車
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(product, size, color, quantity = 1) {
  const index = cart.findIndex(item => item.code === product.code && item.size === size && item.color.name === color.name);
  if (index > -1) {
    cart[index].quantity += quantity;
  } else {
    cart.push({ ...product, size, color, quantity });
  }
  saveCart();
  renderCartPreview();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCartPreview();
}

// 計算折扣與總額
function calculateCart(paymentMethod = '') {
  let subtotal = 0;
  let bundleDiscount = 0;

  // 商品小計
  cart.forEach(item => {
    const price = item.sizes[item.size.toLowerCase()]?.salePrice || item.sizes[item.size.toLowerCase()]?.price || 0;
    subtotal += price * item.quantity;
  });

  // 1+1 bundle折扣
  const codes = cart.map(i => i.code);
  const bundles = cart.filter(i => i.stylingtips && codes.includes(i.stylingtips));
  bundleDiscount = Math.floor(bundles.length / 2) * 100;

  let total = subtotal - bundleDiscount;

  // 付款折扣
  let paymentDiscount = 0;
  if (paymentMethod === 'remit') {
    total *= 0.8;
    paymentDiscount = subtotal - bundleDiscount - total;
  } else if (paymentMethod === 'cod') {
    total *= 0.9;
    paymentDiscount = subtotal - bundleDiscount - total;
  }

  // 運費判斷
  let shipping = 45;
  if (subtotal >= 1500 || paymentMethod === 'remit') shipping = 0;
  total += shipping;

  return { subtotal, bundleDiscount, paymentDiscount, shipping, total };
}

function renderCartPreview() {
  const container = document.querySelector('#cart-preview');
  if (!container) return;
  container.innerHTML = '';
  cart.forEach((item, index) => {
    const price = item.sizes[item.size.toLowerCase()]?.salePrice || item.sizes[item.size.toLowerCase()]?.price || 0;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.mainImage}" width="50" />
      <div>${item.name} (${item.size})</div>
      <div>${item.color.name}</div>
      <div>${price} x ${item.quantity}</div>
      <button data-index="${index}">刪除</button>
    `;
    div.querySelector('button').addEventListener('click', () => removeFromCart(index));
    container.appendChild(div);
  });
}
document.addEventListener('DOMContentLoaded', renderCartPreview);
