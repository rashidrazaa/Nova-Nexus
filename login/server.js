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

const events = [
    {
        id: 1,
        title: "Tech Fest 2025",
        date: "March 30, 2025",
        time: "10:00 AM",
        description: "Join us for a day of innovation with tech talks, hackathons, and more!"
    },
    {
        id: 2,
        title: "Cultural Night",
        date: "April 5, 2025",
        time: "6:00 PM",
        description: "Celebrate diversity with performances, food stalls, and cultural exhibits."
    },
    {
        id: 3,
        title: "Sports Day",
        date: "April 10, 2025",
        time: "8:00 AM",
        description: "Compete in various sports and win exciting prizes!"
    }
];

// Endpoint to fetch events
app.get('/api/events', (req, res) => {
    res.json({ success: true, events });
});

// Add this after the events array and /api/events endpoint
app.post('/api/create-event', (req, res) => {
    const { title, date, time, description } = req.body;
    if (!title || !date || !time || !description) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newEvent = {
        id: events.length + 1,
        title,
        date,
        time,
        description
    };
    events.push(newEvent);
    res.json({ success: true, event: newEvent });
});