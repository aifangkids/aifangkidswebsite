import { cart, removeFromCart, calculateCart, renderCartPreview, saveCart } from './cart.js';

const container=document.getElementById('cart-list');

function renderCartPage(){
    if(!container) return;
    container.innerHTML='';
    cart.forEach((item,index)=>{
        const sizes=item.sizes||{};
        const sizeKey=item.size.toLowerCase();
        const sizeObj=sizes[sizeKey]||{};
        const price=sizeObj.salePrice||sizeObj.price||0;
        const div=document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML=`
            <div>${item.name}</div>
            <div>${item.size}</div>
            <div>${item.color.name}</div>
            <div>NT$${price}</div>
            <div>
                <button class="minus">-</button>
                ${item.quantity}
                <button class="plus">+</button>
            </div>
            <button class="remove">刪除</button>
        `;
        div.querySelector('.minus').addEventListener('click',()=>{if(item.quantity>1)item.quantity--;saveCart();renderCartPage();});
        div.querySelector('.plus').addEventListener('click',()=>{item.quantity++;saveCart();renderCartPage();});
        div.querySelector('.remove').addEventListener('click',()=>{removeFromCart(index);renderCartPage();});
        container.appendChild(div);
    });

    const totals=calculateCart();
    const totalDiv=document.createElement('div');
    totalDiv.classList.add('cart-totals');
    totalDiv.innerHTML=`
        <div>小計: NT$${totals.subtotal}</div>
        <div>1+1折扣: NT$${totals.bundleDiscount}</div>
        <div>付款折扣: NT$${totals.paymentDiscount}</div>
        <div>運費: NT$${totals.shipping}</div>
        <div>總金額: NT$${totals.total}</div>
    `;
    container.appendChild(totalDiv);
}

document.addEventListener('DOMContentLoaded',()=>{
    renderCartPage();
    renderCartPreview();
});
