// 模擬 API 資料抓取
const API_URL = "https://script.google.com/macros/s/AKfycbxrmloTY4wCo1Sn5tgMQDRwhU8uXWBTA0c6v17ec7M6W5LkufjES1fjJBolMb_552z5/exec";

export async function fetchProducts() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        return data.products || [];
    } catch (err) {
        console.error("API 讀取失敗:", err);
        return [];
    }
}
