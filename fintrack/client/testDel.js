import axios from 'axios';

const test = async () => {
    try {
        // Login to get token
        const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'shikhar@example.com', // wait, let's just register a temp
            password: 'password123'
        }).catch(err => axios.post('http://localhost:5000/api/auth/register', {
            name: 'temp',
            email: 'temp@example.com',
            password: 'password123'
        }));
        
        let token = loginRes.data.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        // Add transaction
        const addRes = await axios.post('http://localhost:5000/api/transactions', {
            type: 'expense',
            amount: 50,
            category: 'Food',
            note: 'Test Delete'
        }, config);
        
        const id = addRes.data._id;
        console.log("Added transaction with ID:", id);
        
        // Delete it
        const delRes = await axios.delete(`http://localhost:5000/api/transactions/${id}`, config);
        console.log("Delete response:", delRes.status, delRes.data);
    } catch (e) {
        console.error("API error:", e.response?.data || e.message);
    }
};

test();
