// api.js - 只負責從 GAS 取得資料
const API_URL = 'https://script.google.com/macros/s/AKfycbxrmloTY4wCo1Sn5tgMQDRwhU8uXWBTA0c6v17ec7M6W5LkufjES1fjJBolMb_552z5/exec';

async function fetchProducts() {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data.products;
}

async function fetchDetails() {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data.details;
}

async function fetchProductByCode(code) {
  const products = await fetchProducts();
  return products.find(p => p.code === code);
}

async function fetchDetailByCode(code) {
  const details = await fetchDetails();
  return details.find(d => d.code === code);
}
