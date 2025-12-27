// assets/js/index.js
import { fetchProducts } from './api.js';
import { addToCart, renderCartPreview } from './cart.js';

document.addEventListener('DOMContentLoaded', async () => {
    const products = await fetchProducts();
    const categoryList = document.querySelector('#category-list');
    const productContainer = document.querySelector('#product-list');

    // 生成分類與品牌
    const categories = {};
    products.forEach(p=>{
        if(!categories[p.category]) categories[p.category]=new Set();
        categories[p.category].add(p.brand);
    });

    for(const [cat, brands] of Object.entries(categories)){
        const catDiv = document.createElement('div');
        catDiv.className='category';
        catDiv.innerHTML=`<span>${cat}</span><span>▸</span>`;

        const brandListDiv = document.createElement('div');
        brandListDiv.className='brand-list';
        brands.forEach(b=>{
            const brandDiv = document.createElement('div');
            brandDiv.className='brand-item';
            brandDiv.innerHTML=`<input type="checkbox" value="${b}"/> ${b}`;
            brandListDiv.appendChild(brandDiv);
        });

        catDiv.addEventListener('click', ()=>{
            brandListDiv.style.display = brandListDiv.style.display==='block'?'none':'block';
        });

        categoryList.appendChild(catDiv);
        categoryList.appendChild(brandListDiv);
    }

    function renderProducts(filterBrands=[]){
        productContainer.innerHTML='';
        products.forEach(p=>{
            if(filterBrands.length && !filterBrands.includes(p.brand)) return;

            const priceArr=[];
            ['bebe','kids','junior'].forEach(sz=>{
                if(p.sizes[sz]) priceArr.push(p.sizes[sz].salePrice||p.sizes[sz].price);
            });
            const minPrice = Math.min(...priceArr);

            const card=document.createElement('div');
            card.className='product-card';
            card.innerHTML=`
                <img src="${p.mainImage}" width="180">
                <div class="brand">${p.brand}</div>
                <div class="name">${p.name}</div>
                <div class="price">${minPrice}</div>
                <div class="colors">${p.colors.map(c=>`<span style="background:${c.value}"></span>`).join('')}</div>
                <button class="add-btn" data-code="${p.code}" data-size="bebe" data-color='${JSON.stringify(p.colors[0])}'>加入購物車</button>
            `;
            productContainer.appendChild(card);

            card.querySelector('.add-btn').addEventListener('click', ()=>{
                addToCart(p,'bebe',p.colors[0]);
                renderCartPreview();
            });

            card.addEventListener('click', e=>{
                if(!e.target.classList.contains('add-btn')){
                    window.location.href=`detail.html?code=${p.code}`;
                }
            });
        });
    }

    renderProducts();

    categoryList.querySelectorAll('.brand-item input').forEach(input=>{
        input.addEventListener('change', ()=>{
            const selectedBrands = Array.from(categoryList.querySelectorAll('.brand-item input:checked')).map(i=>i.value);
            renderProducts(selectedBrands);
        });
    });
});
