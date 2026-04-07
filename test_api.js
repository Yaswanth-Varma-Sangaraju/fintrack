fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'xyz', email: 'xyz@abc.com', password: '123' })
}).then(async r => {
    console.log(r.status);
    console.log(await r.text());
}).catch(console.error);
