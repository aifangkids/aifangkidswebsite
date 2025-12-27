import { fetchProductByCode } from './api.js';
import { addToCart, renderCartPreview } from './cart.js';

const detailContainer=document.getElementById('product-detail');

function getQueryParam(param){
    const url=new URL(window.location.href);
    return url.searchParams.get(param);
}

function renderDetail(product){
    if(!product) {detailContainer.innerHTML='商品不存在'; return;}
    const sizes=[product.sizes.bebe,product.sizes.kids,product.sizes.junior].filter(s=>s!==null);
    let sizeOptions='';
    sizes.forEach(s=>{
        sizeOptions+=`<button data-group="${s.label}">${s.label}</button>`;
    });
    const colorOptions=product.colors.map(c=>`<div class="color-swatch" style="background:${c.value}"></div>`).join('');
    detailContainer.innerHTML=`
        <h2>${product.name}</h2>
        <div>${product.brand}</div>
        <img src="${product.mainImage}" width="200">
        <div>${product.material}</div>
        <div>${product.description}</div>
        <div class="sizes">${sizeOptions}</div>
        <div class="colors">${colorOptions}</div>
        <button id="add-cart">加入購物車</button>
    `;
    document.getElementById('add-cart').addEventListener('click',()=>{
        addToCart(product,sizes[0].label,product.colors[0],1);
        renderCartPreview();
        alert('已加入購物車');
    });
}

document.addEventListener('DOMContentLoaded',async ()=>{
    const code=getQueryParam('code');
    const product=await fetchProductByCode(code);
    renderDetail(product);
    renderCartPreview();
});
