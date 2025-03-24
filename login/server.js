const express = require('express');
const cors = require('cors'); // Add CORS
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all origins
app.use(express.json());

// In-memory user store (replace with database later)
let users = [
    { email: "org@example.com", password: "Passw0rd!", role: "organizer" },
    { email: "part@example.com", password: "Passw0rd!", role: "participant" }
];

// Login endpoint
app.post('/api/login', (req, res) => {
    console.log('Login request received:', req.body); // Add logging for debugging
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        res.json({ success: true, role: user.role });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Add a simple GET endpoint to test the server
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});