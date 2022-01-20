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
                    
                    alert("Invalid password");
                } else {
                    document.cookie = `token=${el.token};SameSite=Lax`;
                    window.location.href = 'mainPage.html';
                   
                }
            });
    });
}