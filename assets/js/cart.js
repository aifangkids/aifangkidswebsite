// assets/js/cart.js
export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(product, size, color, qty=1){
    if(!product || !size || !color) return;

    const exist = cart.find(item => 
        item.code===product.code &&
        item.size===size &&
        item.color.name===color.name
    );

    if(exist){
        exist.quantity += qty;
    } else {
        cart.push({
            code: product.code,
            name: product.name,
            brand: product.brand,
            mainImage: product.mainImage,
            sizes: product.sizes,
            size: size,
            color: color,
            quantity: qty,
            stylingtips: product.stylingtips || null
        });
    }
    saveCart();
}

export function removeFromCart(index){
    cart.splice(index,1);
    saveCart();
}

export function saveCart(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function calculateCart(paymentMethod=''){
    let subtotal = 0;
    let bundleDiscount = 0;
    let paymentDiscount = 0;
    let shipping = 45;

    // 小計計算
    cart.forEach(item=>{
        const sizes = item.sizes || {};
        const sizeKey = item.size.toLowerCase();
        const sizeObj = sizes[sizeKey] || {};
        const price = sizeObj.salePrice || sizeObj.price || 0;
        subtotal += price * item.quantity;
    });

    // 1+1 折扣
    const codes = cart.map(i=>i.code);
    cart.forEach(i=>{
        if(i.stylingtips && codes.includes(i.stylingtips)){
            bundleDiscount += 100;
        }
    });

    // 付款折扣
    if(paymentMethod==='remit'){
        paymentDiscount = 0.2*(subtotal - bundleDiscount);
        shipping = 0;
    } else if(paymentMethod==='cod'){
        paymentDiscount = 0.1*(subtotal - bundleDiscount);
        shipping = subtotal>=1500?0:45;
    } else {
        paymentDiscount = 0;
        shipping = subtotal>=1500?0:45;
    }

    const total = subtotal - bundleDiscount - paymentDiscount + shipping;

    return {subtotal, bundleDiscount, paymentDiscount, shipping, total};
}

export function renderCartPreview(){
    const container = document.querySelector('#cart-preview');
    if(!container) return;
    container.innerHTML = '';
    cart.forEach((item,index)=>{
        const sizes = item.sizes || {};
        const sizeKey = item.size.toLowerCase();
        const sizeObj = sizes[sizeKey] || {};
        const price = sizeObj.salePrice || sizeObj.price || 0;

        const div=document.createElement('div');
        div.innerHTML=`
            <img src="${item.mainImage}" width="40">
            <div>${item.name} (${item.size})</div>
            <div>${item.color.name}</div>
            <div>${price} x ${item.quantity}</div>
            <button data-index="${index}">刪除</button>
        `;
        div.querySelector('button').addEventListener('click',()=>{
            removeFromCart(index);
            renderCartPreview();
        });
        container.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', renderCartPreview);
