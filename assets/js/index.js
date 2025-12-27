document.addEventListener("DOMContentLoaded", async () => {
    const products = await fetchProducts();

    const newArrivals = document.getElementById("newArrivals");
    const collection = document.getElementById("collection");

    products.forEach(p => {
        const card = document.createElement("div");
        card.className = "p-card";
        card.innerHTML = `
            <div class="p-img-box">
                <img class="p-img-main" src="${p.mainImg}">
            </div>
            <div class="p-info">
                <div class="p-name">${p.name}</div>
                <div class="p-price">NT$ ${p.price}</div>
            </div>
        `;
        card.onclick = () => showDetail(p.code);
        (p.category === "NEW") ? newArrivals.appendChild(card) : collection.appendChild(card);
    });
});

function showDetail(code) {
    localStorage.setItem("currentProduct", code);
    document.getElementById("page-index").style.display = "none";
    document.getElementById("page-detail").style.display = "block";
    loadDetailPage();
}
