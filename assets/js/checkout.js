import { cart, calculateCart, saveCart } from './cart.js';

const container=document.getElementById('checkout-form');

function renderCheckoutForm(){
    const totals=calculateCart();
    container.innerHTML=`
        <h2>訂單摘要</h2>
        <div>總金額: NT$${totals.total}</div>
        <form id="checkout-form-el">
            <label>收件人: <input name="consignee" required></label>
            <label>付款方式:
                <select name="paymentterms">
                    <option value="remit">匯款 20%OFF</option>
                    <option value="cod">貨到付款 10%OFF</option>
                </select>
            </label>
            <label>運送方式: <input name="shippingmethod" required></label>
            <label>7-11店號(選填): <input name="store"></label>
            <button type="submit">送出訂單</button>
        </form>
        <div id="order-result"></div>
    `;

    document.getElementById('checkout-form-el').addEventListener('submit',async e=>{
        e.preventDefault();
        const formData=new FormData(e.target);
        const data={cart:cart,...Object.fromEntries(formData.entries())};
        try{
            const res=await fetch('https://script.google.com/macros/s/AKfycbxrmloTY4wCo1Sn5tgMQDRwhU8uXWBTA0c6v17ec7M6W5LkufjES1fjJBolMb_552z5/exec',{
                method:'POST',
                body:JSON.stringify(data),
                headers:{'Content-Type':'application/json'}
            });
            const result=await res.json();
            document.getElementById('order-result').innerHTML=`訂單編號: ${result.orderId || '0001'} 已送出`;
            localStorage.removeItem('cart');
        }catch(err){
            console.error(err);
            alert('訂單提交失敗');
        }
    });
}

document.addEventListener('DOMContentLoaded',renderCheckoutForm);
