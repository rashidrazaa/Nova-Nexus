const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();
const PORT = 3000;

// Import models
const Organizer = require('./models/Organizer');
const Participant = require('./models/Participant');
const Event = require('./models/Event');
const Registration = require('./models/Registration');

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/eventManagement', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from public directory
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/OrgSignup.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'OrgSignup.html'));
});

app.get('/OrgLogin.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'OrgLogin.html'));
});

app.get('/PartSignup.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'PartSignup.html'));
});

app.get('/PartLogin.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'PartLogin.html'));
});

app.get('/Organizer.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Organizer.html'));
});

app.get('/Participant.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Participant.html'));
});

// Add these routes first to serve the dashboard pages
app.get('/Organizer.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Organizer.html'));
});

app.get('/Participant.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Participant.html'));
});

// API Routes for handling form submissions
app.post('/api/organizer/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const organizer = new Organizer({
            name,
            email,
            password
        });

        await organizer.save();
        res.redirect('/OrgLogin.html');
    } catch (error) {
        res.status(500).send('Error registering organizer');
    }
});

app.post('/api/participant/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const participant = new Participant({
            name,
            email,
            password
        });

        await participant.save();
        res.redirect('/PartLogin.html');
    } catch (error) {
        res.status(500).send('Error registering participant');
    }
});

// Update the login routes to redirect to the correct pages
app.post('/api/organizer/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const organizer = await Organizer.findOne({ email, password });
        
        if (!organizer) {
            return res.status(401).send('Invalid email or password');
        }

        // Store organizer ID in session
        req.session.organizerId = organizer._id;
        req.session.organizerName = organizer.name;

        // Redirect to the organizer dashboard with the organizer ID in the query string
        res.redirect(`/Organizer.html?organizerId=${organizer._id}`);
    } catch (error) {
        res.status(500).send('Error during login');
    }
});

app.post('/api/participant/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const participant = await Participant.findOne({ email, password });
        
        if (!participant) {
            return res.status(401).send('Invalid email or password');
        }

        res.redirect('/Participant.html'); // Redirect to participant dashboard
    } catch (error) {
        res.status(500).send('Error during login');
    }
});

// Add this route to handle event creation form submission
app.post('/api/events/create', async (req, res) => {
    try {
        // Check if organizer is logged in
        if (!req.session.organizerId) {
            return res.status(401).send('Please login first');
        }

        const event = new Event({
            title: req.body.name,
            type: req.body.eventType,
            description: req.body.description,
            date: {
                start: new Date(req.body.startDate),
                end: new Date(req.body.endDate)
            },
            venue: req.body.venue,
            maxParticipants: parseInt(req.body.maxParticipants),
            organizerId: req.session.organizerId,  // Get organizer ID from session
            registeredParticipants: [] // Initialize as an empty array
        });

        await event.save();
        console.log('Event created successfully:', event);
        res.redirect('/Organizer.html');
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).send('Error creating event: ' + error.message);
    }
});

// Get all events (for participants to view)
app.get('/api/events', async (req, res) => {
    try {
        const events = await Event.find()
            .populate('organizerId', 'name')
            .select('-registeredParticipants');
        console.log("Fetched events:", events);
        if (!Array.isArray(events)) {
            return res.status(500).send('Expected an array of events, but got something else');
        }
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).send('Error fetching events');
    }
});

// Get events created by a specific organizer
app.get('/api/organizer/events/:organizerId', async (req, res) => {
    try {
        const { organizerId } = req.params;

        // Validate the organizerId
        if (!mongoose.Types.ObjectId.isValid(organizerId)) {
            return res.status(400).send('Invalid organizer ID');
        }

        const events = await Event.find({ organizerId })
            .populate('registeredParticipants', 'name email');
        console.log("Fetched organizer events:", events);
        res.json(events);
    } catch (error) {
        console.error('Error fetching organizer events:', error);
        res.status(500).send('Error fetching organizer events');
    }
});

// Get single event details
app.get('/api/events/:eventId', async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId)
            .populate('organizerId', 'name');
        if (!event) {
            return res.status(404).send('Event not found');
        }
        res.json(event);
    } catch (error) {
        res.status(500).send('Error fetching event details');
    }
});

// Event registration route
app.post('/api/events/register', async (req, res) => {
    try {
        const { eventId, name, email, phone, college } = req.body;
        
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).send('Event not found');
        }
        
        if (event.registeredParticipants.length >= event.maxParticipants) {
            return res.status(400).send('Event is full');
        }

        const registration = new Registration({
            eventId,
            participantName: name,
            email,
            phone,
            college,
            registrationDate: new Date()
        });

        await registration.save();
        
        event.registeredParticipants.push(registration._id);
        await event.save();

        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(500).send('Error processing registration');
    }
});

// Cancel registration (for participants)
app.post('/api/events/cancel-registration', async (req, res) => {
    try {
        const { eventId, participantId } = req.body;
        const event = await Event.findById(eventId);
        
        if (!event) {
            return res.status(404).send('Event not found');
        }
        
        event.registeredParticipants = event.registeredParticipants
            .filter(id => id.toString() !== participantId);
        await event.save();
        res.status(200).send('Registration cancelled');
    } catch (error) {
        res.status(500).send('Error cancelling registration');
    }
});

// Delete an event (for organizers)
app.delete('/api/events/:eventId', async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.eventId);
        res.status(200).send('Event deleted');
    } catch (error) {
        res.status(500).send('Error deleting event');
    }
});

// Add a logout route
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Get registrations for an event (for organizers)
app.get('/api/events/:eventId/registrations', async (req, res) => {
    try {
        const registrations = await Registration.find({ eventId: req.params.eventId });
        res.json(registrations);
    } catch (error) {
        res.status(500).send('Error fetching registrations');
    }
});

app.get('/eventRegistration.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'eventRegistration.html'));
});

// 404 handler
app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>');
});

app.listen(PORT, () => {
    console.log(`Server is Working on http://localhost:${PORT}`);
});

