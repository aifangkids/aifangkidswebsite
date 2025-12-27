// assets/js/checkout.js
import { cart, calculateCart, saveCart } from './cart.js';

document.addEventListener('DOMContentLoaded', ()=>{
    const form=document.querySelector('#checkout-form');
    const totalElem=document.querySelector('#total');

    function renderTotal(){
        const calc=calculateCart(form.payment.value);
        totalElem.textContent=calc.total;
    }
    renderTotal();

    form.addEventListener('change', renderTotal);

    form.addEventListener('submit', async e=>{
        e.preventDefault();
        const data={
            payment: form.payment.value,
            shipping: form.shipping.value,
            consignee: form.consignee.value,
            store: form.store.value || '',
            cart
        };
        const res=await fetch('https://script.google.com/macros/s/AKfycbxrmloTY4wCo1Sn5tgMQDRwhU8uXWBTA0c6v17ec7M6W5LkufjES1fjJBolMb_552z5/exec',{
            method:'POST',
            body: JSON.stringify(data)
        });
        const result=await res.json();
        alert('訂單完成，編號：'+result.orderNumber);
        localStorage.removeItem('cart');
        window.location.href='index.html';
    });
});
