import { fetchProducts } from './api.js';
import { addToCart, renderCartPreview } from './cart.js';

const productList=document.getElementById('product-list');
const categoryList=document.getElementById('category-list');
let allProducts=[];

function createCategorySidebar(products){
    const categories=[...new Set(products.map(p=>p.category))];
    categoryList.innerHTML='';
    categories.forEach(cat=>{
        const catDiv=document.createElement('div');
        catDiv.classList.add('category-item');
        catDiv.innerHTML=`<span class="category-toggle">☰ ${cat}</span><div class="brand-list"></div>`;
        const brandListDiv=catDiv.querySelector('.brand-list');
        const brands=[...new Set(products.filter(p=>p.category===cat).map(p=>p.brand))];
        brands.forEach(brand=>{
            const bDiv=document.createElement('div');
            bDiv.classList.add('brand-item');
            bDiv.innerHTML=`<input type="checkbox" data-category="${cat}" data-brand="${brand}"> ${brand}`;
            brandListDiv.appendChild(bDiv);
        });
        catDiv.querySelector('.category-toggle').addEventListener('click',()=>{
            brandListDiv.classList.toggle('expanded');
        });
        categoryList.appendChild(catDiv);
    });

    // 多選品牌篩選
    categoryList.querySelectorAll('input[type=checkbox]').forEach(cb=>{
        cb.addEventListener('change',renderProducts);
    });
}

function renderProducts(){
    const checkedBrands=[...categoryList.querySelectorAll('input[type=checkbox]:checked')].map(cb=>({category:cb.dataset.category,brand:cb.dataset.brand}));
    let filtered=allProducts;
    if(checkedBrands.length>0){
        filtered=allProducts.filter(p=>checkedBrands.some(c=>c.category===p.category && c.brand===p.brand));
    }
    productList.innerHTML='';
    filtered.forEach(p=>{
        const card=document.createElement('div');
        card.classList.add('product-card');
        const sizes=[p.sizes.bebe,p.sizes.kids,p.sizes.junior].filter(s=>s!==null);
        let minPrice=Math.min(...sizes.map(s=>s.salePrice||s.price));
        card.innerHTML=`
            <div class="brand-label">${p.brand}</div>
            <img src="${p.mainImage}">
            <h3>${p.name}</h3>
            <div class="price">NT$${minPrice}</div>
        `;
        card.addEventListener('click',()=>{window.location.href=`/detail.html?code=${p.code}`;});
        productList.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded',async ()=>{
    allProducts=await fetchProducts();
    createCategorySidebar(allProducts);
    renderProducts();
    renderCartPreview();
});
