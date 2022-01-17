function init() {

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            firstname: document.getElementById('firstname').value,
            lastname: document.getElementById('lastname').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            password: document.getElementById('password').value,
            admin: document.getElementById('admin').checked
        };

        fetch('http://localhost:9050/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                document.cookie = `token=${el.token};SameSite=Lax`;
                window.location.href = 'login.html';
            });
    });
}