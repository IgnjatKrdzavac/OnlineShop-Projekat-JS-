function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];


    fetch('http://localhost:7000/admin/orderdetails', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('orderDetList');

            data.forEach( el => {
                document.getElementById('orderDetList').innerHTML += `<li>ID: ${el.id}, Naziv porudzbine: ${el.name}, Cena: ${el.price}</li>`;
            });
        });

document.getElementById('detailBtn').addEventListener('click', e => {
    e.preventDefault();

    
    const data = {
        name  : document.getElementById('detailName').value,
        price : document.getElementById('detailPrice').value,
        sku :  document.getElementById('detailSku').value,
        quantity :  document.getElementById('detailQuantity').value,
        orderId :  document.getElementById('orderId').value,
        productId :  document.getElementById('productId').value,
    };
    
    console.log(data)
   

    document.getElementById('detailName').value = '';
    document.getElementById('detailPrice').value = '';
    document.getElementById('detailSku').value = '';
    document.getElementById('detailQuantity').value = '';
    document.getElementById('orderId').value = '';
    document.getElementById('productId').value = '';
    

    
    fetch('http://localhost:7000/admin/orderdetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        
        body: JSON.stringify(data)
    })
        .then( res => res.json() )
        .then( el => {
            if (el.msg) {
                alert(el.msg);
            } else {
                console.log(el);
                document.getElementById('orderDetList').innerHTML += `<li>ID: ${el.id}, Naziv porudzbine: ${el.name}, Cena: ${el.price}</li>`;
            }
        });
});


    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
}