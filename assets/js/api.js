// assets/js/api.js
const API_URL = 'https://script.google.com/macros/s/AKfycbxrmloTY4wCo1Sn5tgMQDRwhU8uXWBTA0c6v17ec7M6W5LkufjES1fjJBolMb_552z5/exec';

export async function fetchProducts(){
    try{
        const res = await fetch(API_URL);
        const data = await res.json();
        return data.products || [];
    } catch(err){
        console.error('fetchProducts error:', err);
        return [];
    }
}

export async function fetchDetails(){
    try{
        const res = await fetch(API_URL);
        const data = await res.json();
        return data.details || [];
    } catch(err){
        console.error('fetchDetails error:', err);
        return [];
    }
}
