import axios from 'axios';

const testDelete = async () => {
    try {
        // Register / Login to get token
        const loginRes = await axios.post('http://localhost:5000/api/auth/register', {
            name: 'Test Delete User',
            email: 'delete_test@example.com',
            password: 'password123'
        }).catch(err => axios.post('http://localhost:5000/api/auth/login', {
            email: 'delete_test@example.com',
            password: 'password123'
        }));
        
        const token = loginRes.data.token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        // Add a transaction
        const addRes = await axios.post('http://localhost:5000/api/transactions', {
            type: 'income',
            amount: 100,
            category: 'Salary',
            note: 'Test'
        }, config);
        
        const transactionId = addRes.data._id;
        console.log('Added transaction:', transactionId);
        
        // Try Delete
        const delRes = await axios.delete(`http://localhost:5000/api/transactions/${transactionId}`, config);
        console.log('Delete response:', delRes.status, delRes.data);
        
    } catch(err) {
        console.error('Error during test:', err.response?.data || err.message);
    }
};

testDelete();
