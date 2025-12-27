// assets/js/detail.js
import { fetchProducts } from './api.js';
import { addToCart, renderCartPreview } from './cart.js';

document.addEventListener('DOMContentLoaded', async ()=>{
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const products = await fetchProducts();
    const product = products.find(p=>p.code===code);
    if(!product) return;

    document.querySelector('#product-title').textContent=product.name;
    document.querySelector('#material').textContent='材質：'+(product.material||'');
    document.querySelector('#description').textContent=product.description||'';

    const colorContainer=document.querySelector('#color-options');
    product.colors.forEach(c=>{
        const span=document.createElement('span');
        span.style.background=c.value;
        span.style.display='inline-block';
        span.style.width='20px';
        span.style.height='20px';
        span.style.margin='2px';
        span.style.cursor='pointer';
        span.addEventListener('click',()=> selectedColor=c);
        colorContainer.appendChild(span);
    });
    let selectedColor=product.colors[0];

    const sizeContainer=document.querySelector('#size-options');
    Object.entries(product.sizes).forEach(([key,val])=>{
        if(val){
            val.options.forEach(opt=>{
                const btn=document.createElement('button');
                btn.textContent=opt;
                btn.addEventListener('click',()=> selectedSize=opt.split('|')[0]);
                sizeContainer.appendChild(btn);
            });
        }
    });
    let selectedSize=Object.entries(product.sizes).find(([k,v])=>v)[1]?.options[0].split('|')[0];

    document.querySelector('#add-to-cart').addEventListener('click', ()=>{
        addToCart(product, selectedSize, selectedColor);
        renderCartPreview();
        alert('已加入購物車');
    });

});
