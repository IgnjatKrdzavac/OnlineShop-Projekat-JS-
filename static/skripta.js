

function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];


    

    fetch('http://localhost:7000/admin/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('usrLst');

            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.firstname}, E-mail: ${el.email}</li>`;
            });
        });

        fetch('http://localhost:7000/admin/products', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then( res => res.json() )
            .then( data => {
                const lst = document.getElementById('prodLst');
    
                data.forEach( el => {
                    lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, Price ${el.price}:</li>`;
                });
            });

    document.getElementById('productIdBtn').addEventListener('click', e => {
        e.preventDefault();

        
        const data = {
            name  : document.getElementById('prodName').value,
            price : document.getElementById('prodPrice').value,
            weight :  document.getElementById('prodWeight').value,
            shortDesc :  document.getElementById('prodDescription').value,
            sku  : document.getElementById('prodSku').value,
            
        };
        
        console.log(data)
       

        document.getElementById('prodName').value = '';
        document.getElementById('prodPrice').value = '';
        document.getElementById('prodWeight').value = '';
        document.getElementById('prodDescription').value = '';
        document.getElementById('prodSku').value = '';

        
        fetch('http://localhost:7000/admin/products', {
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
                    document.getElementById('prodLst').innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, Price ${el.price}:</li>`;
                }
            });
    });

    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
}