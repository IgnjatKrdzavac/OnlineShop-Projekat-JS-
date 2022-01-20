function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];


    fetch('http://localhost:7000/admin/informations', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('infoList');

            data.forEach( el => {
                document.getElementById('infoList').innerHTML += `<li>O nama: ${el.abouUs}   ,   
                                                                 Cenovnik dostave: ${el.deliveryPriceList},
                                                                 Zastita privatnosti: ${el.privacyProtection},
                                                                 Nacin placanja: ${el.methodOfPayment},
                                                                 Uslovi kupovine: ${el.termsOfPurchase}</li>`;
            });
        });

document.getElementById('infoBtn').addEventListener('click', e => {
    e.preventDefault();

    
    const data = {
        aboutUs  : document.getElementById('aboutUsInfo').value,
        deliveryPriceList : document.getElementById('PriceListInfo').value,
        privacyProtection :  document.getElementById('privacyInfo').value,
        methodOfPayment :  document.getElementById('paymentMethodInfo').value,
        termsOfPurchase :  document.getElementById('termsOfPurchaseInfo').value,
        
    };
    
    console.log(data)
   

    document.getElementById('aboutUsInfo').value = '';
    document.getElementById('PriceListInfo').value = '';
    document.getElementById('privacyInfo').value = '';
    document.getElementById('paymentMethodInfo').value = '';
    document.getElementById('termsOfPurchaseInfo').value = '';
    
    

    
    fetch('http://localhost:7000/admin/informations', {
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
                document.getElementById('infoList').innerHTML += `<li>O nama: ${el.aboutUs},
                                                                      Cenovnik dostave: ${el.deliveryPriceList},
                                                                     Zastita privatnosti: ${el.privacyProtection},
                                                                     Nacin placanja: ${el.methodOfPayment},
                                                                    Uslovi kupovine: ${el.termsOfPurchase}</li>`;
            }
        });
});


    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
}