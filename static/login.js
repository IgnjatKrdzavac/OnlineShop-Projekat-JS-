function init() {

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        fetch('http://localhost:9050/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                    //alert("losa sifra");
                } else {
                    document.cookie = `token=${el.token};SameSite=Lax`;
                    //window.location.href = 'index.html';
                    window.alert("Postoji user u bazi");
                }
            });
    });
}