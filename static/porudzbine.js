function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];


    fetch('http://localhost:7000/admin/orders', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('ordList');

            data.forEach( el => {
                document.getElementById('ordList').innerHTML += `<li>ID: ${el.id}, Iznos: ${el.amount}, Adresa kupca: ${el.shipAdress}</li>`;
            });
        });

document.getElementById('orderBtn').addEventListener('click', e => {
    e.preventDefault();

    
    const data = {
        amount  : document.getElementById('orderAmount').value,
        shipName : document.getElementById('orderName').value,
        shipAdress :  document.getElementById('orderAdress').value,
        date :  document.getElementById('orderdate').value,
    };
    
    console.log(data)
   

    document.getElementById('orderAmount').value = '';
    document.getElementById('orderName').value = '';
    document.getElementById('orderAdress').value = '';
    document.getElementById('orderdate').value = '';
    

    
    fetch('http://localhost:7000/admin/orders', {
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
                document.getElementById('ordList').innerHTML += `<li>ID: ${el.id}, Ime: ${el.shipName}  ,Iznos: ${el.amount}, Adresa kupca: ${el.shipAdress}</li>`;
            }
        });
});

document.getElementById('orderIdBtn').addEventListener('click', e => {
    e.preventDefault();

    
    id = document.getElementById('deleteOrderId').value;

    document.getElementById('deleteOrderId').value = '';
   
    var url = 'http://localhost:7000/admin/order/id';
    url = url.replace('id', id);
    
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        

    })
        .then( res => res.json() )
        .then( el => {
            if (el.msg) {
                alert(el.msg);
            } else {
                          lista = '';
                        fetch('http://localhost:7000/admin/orders', {
                            headers: {
                                    'Authorization': `Bearer ${token}`
                            }
                         })
                            .then( res => res.json() )
                            .then( data => {
                                    lst = document.getElementById('ordList');
                                    
                                    data.forEach( el => {
                                        lista += `<li>ID: ${el.id}, Ime: ${el.shipName}  ,Iznos: ${el.amount}, Adresa kupca: ${el.shipAdress}</li>`;
                        });

                        lst.innerHTML = lista;
                    });
                
            }
        });
});


    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
}