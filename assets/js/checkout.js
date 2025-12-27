import { cart } from './cart.js';

document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.querySelector('#checkout-form');
  form.addEventListener('submit', async e=>{
    e.preventDefault();
    const formData = new FormData(form);
    const orderData = {
      cart,
      payment: formData.get('payment'),
      shipping: formData.get('shipping'),
      consignee: formData.get('consignee'),
      store: formData.get('store')
    };
    const res = await fetch('https://script.google.com/macros/s/AKfycbxrmloTY4wCo1Sn5tgMQDRwhU8uXWBTA0c6v17ec7M6W5LkufjES1fjJBolMb_552z5/exec', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
    const result = await res.json();
    alert(`訂單編號：${result.orderId}`);
    localStorage.removeItem('cart');
    window.location.href = 'index.html';
  });
});
