# HomeAssist Frontend

A React + Vite frontend for **HomeAssist**, a Local Service Provider Directory application. It allows customers to find and book service providers while enabling providers to manage booking requests and profiles.


## Features

### Customer
- Register and Login
- Browse service categories
- View service providers
- Book providers
- View booking history
- Manage profile

### Provider
- Register and Login
- View booking requests
- Accept booking requests
- Manage profile


## Tech Stack

- React
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- Lucide React


## Installation

git clone <repository-url>
cd homeassist-frontend
npm install
npm run dev


Application runs at:

http://localhost:5173


## Project Structure

src/
├── api/
├── components/
├── context/
├── layouts/
├── pages/
├── routes/
├── App.jsx
└── main.jsx

## API

The frontend communicates with the backend through Axios.

Default backend URL:

http://localhost:3000/api


## Main Pages

- Login
- Register
- Dashboard
- Services
- Providers
- Profile
- My Bookings
- Provider Dashboard


## Scripts


npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build



## Requirements

- Node.js
- npm
- HomeAssist Backend API
- PostgreSQL Database
