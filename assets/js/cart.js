// assets/js/cart.js
export let cart = JSON.parse(localStorage.getItem('cart')) || [];

// 加入購物車
export function addToCart(product, size, color, qty=1){
    if(!product || !size || !color) return;

    // 合併相同商品 (code+size+color)
    const exist = cart.find(item => item.code===product.code && item.size===size && item.color.name===color.name);
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
            quantity: qty
        });
    }
    saveCart();
}

// 刪除商品
export function removeFromCart(index){
    cart.splice(index,1);
    saveCart();
}

// 保存到 localStorage
export function saveCart(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

// 計算購物車價格
export function calculateCart(paymentMethod=''){
    let subtotal = 0;
    let bundleDiscount = 0;
    let paymentDiscount = 0;
    let shipping = 45;

    // 計算小計
    cart.forEach(item=>{
        const sizeObj = item.sizes[item.size.toLowerCase()];
        const price = sizeObj ? (sizeObj.salePrice || sizeObj.price) : 0;
        subtotal += price * item.quantity;
    });

    // 1+1 折扣判斷
    const codes = cart.map(i=>i.code);
    cart.forEach(i=>{
        if(i.stylingtips && codes.includes(i.stylingtips)){
            bundleDiscount += 100; // 每組折扣 100
        }
    });

    // 付款方式折扣
    if(paymentMethod==='remit'){
        paymentDiscount = 0.2*(subtotal - bundleDiscount);
        shipping = 0;
    } else if(paymentMethod==='cod'){
        paymentDiscount = 0.1*(subtotal - bundleDiscount);
        shipping = subtotal >= 1500 ? 0 : 45;
    } else {
        paymentDiscount = 0;
        shipping = subtotal >= 1500 ? 0 : 45;
    }

    const total = subtotal - bundleDiscount - paymentDiscount + shipping;

    return {
        subtotal, bundleDiscount, paymentDiscount, shipping, total
    };
}

// 渲染右側購物車預覽
export function renderCartPreview(){
    const container = document.querySelector('#cart-preview');
    if(!container) return;
    container.innerHTML = '';
    cart.forEach((item,index)=>{
        const sizeObj = item.sizes[item.size.toLowerCase()];
        const price = sizeObj ? (sizeObj.salePrice || sizeObj.price) : 0;

        const div = document.createElement('div');
        div.innerHTML = `
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
