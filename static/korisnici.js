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
                    const lst = document.getElementById('korisniciList');
        
                    data.forEach( el => {
                        lst.innerHTML += `<li>ID: ${el.id}, Ime: ${el.firstname}, Prezime: ${el.lastname}</li>`;
                    });
                });



    document.getElementById('delUsrBtn').addEventListener('click', e => {
        e.preventDefault();

        
        id = document.getElementById('deleteUser').value;

        document.getElementById('deleteUser').value = '';
        
        var url = 'http://localhost:7000/admin/users/id';
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
                            fetch('http://localhost:7000/admin/users', {
                                headers: {
                                        'Authorization': `Bearer ${token}`
                                }
                                })
                                .then( res => res.json() )
                                .then( data => {
                                        lst = document.getElementById('korisniciList');
                                        
                                        data.forEach( el => {
                                            lista += `<li>ID: ${el.id}, Ime: ${el.firstname}, Prezime: ${el.lastname}</li>`;
                            });

                            lst.innerHTML = lista;
                        });
                    
                }
            });
    });



    document.getElementById('chngeusrBtn').addEventListener('click', e => {
        e.preventDefault();

        
        const data = {
            email  : document.getElementById('userEmail').value,
            firstname : document.getElementById('userFirstname').value,
            lastname :  document.getElementById('userLastname').value,
            phone:  document.getElementById('userPhone').value,
    
            
        };
        
        console.log(data)
       

        document.getElementById('userEmail').value = '';
        document.getElementById('userFirstname').value = '';
        document.getElementById('userLastname').value = '';
        document.getElementById('userPhone').value = '';


        id = document.getElementById('userId').value;

        document.getElementById('userId').value = '';
        
        var url = 'http://localhost:7000/admin/users/id';
        url = url.replace('id', id);

        
        fetch(url, {
            method: 'PUT',
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
                    
                    lista = '';
                    fetch('http://localhost:7000/admin/users', {
                        headers: {
                                'Authorization': `Bearer ${token}`
                        }
                        })
                        .then( res => res.json() )
                        .then( data => {
                                lst = document.getElementById('korisniciList');
                                
                                data.forEach( el => {
                                    lista += `<li>ID: ${el.id}, Ime: ${el.firstname}, Prezime: ${el.lastname}</li>`;
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