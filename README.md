# Nova-Nexus
# College Event Hub

**College Event Hub** is a web application designed to manage college events, allowing organizers to create and manage events and participants to browse and register for events. This project includes a responsive frontend built with HTML, CSS (Tailwind CSS), and JavaScript, and a simple Node.js backend for user authentication.

## Features
- **Homepage**: A landing page with smooth scrolling, animations, testimonials, and key features.
- **User Roles**: Supports two roles:
  - **Organizers**: Can manage events (dashboard under development).
  - **Participants**: Can browse and register for events (dashboard under development).
- **Login System**: Single login page with role detection, success modal, and redirection to role-specific dashboards.
- **Registration Pages**: Dedicated pages for organizers and participants to register (currently frontend-only; backend integration pending).
- **Backend**: A Node.js/Express server for handling login requests, with an in-memory user store.
- **Responsive Design**: Built with Tailwind CSS, ensuring a mobile-friendly experience.
- **Animations**: Includes Lottie animations, smooth scrolling, and hover effects.

## Project Structure
INDEX-EVENT/
├── dashboard/
│   ├── organizer-dashboard.html    # Placeholder dashboard for organizers
│   └── participant-events.html     # Placeholder dashboard for participants
├── login/
│   └── (empty, intended for login.html)
├── node_modules/                   # Node.js dependencies (Express, CORS)
├── registration/
│   ├── organizerRegister.html     # Organizer registration page
│   └── participantRegister.html   # Participant registration page
├── home.css                       # Custom CSS styles
├── index.html                     # Homepage
├── package-lock.json              # Dependency lock file
├── package.json                   # Node.js project configuration
├── script.js                      # Main JavaScript file (login, animations, etc.)
└── server.js                      # Node.js/Express backend server


**Note**: `login.html` is currently in the root directory (not shown in the screenshot) but should be moved to the `login/` folder for consistency.

## Prerequisites
- **Node.js**: Required to run the backend server. Install from [nodejs.org](https://nodejs.org/).
- **Live Server**: Recommended for serving the frontend (e.g., via VS Code’s Live Server extension).

## Setup Instructions

### 1. Clone the Repository
If you’re using version control:
```bash
git clone <repository-url>
cd INDEX-EVENT
2. Install Backend Dependencies
