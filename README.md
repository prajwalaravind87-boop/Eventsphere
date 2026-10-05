# EventSphere – Smart Event Management & Engagement Platform

## Tagline
"Discover. Connect. Participate. Experience."

## Overview
EventSphere is a modern full-stack event-management platform built for colleges, hackathons, workshops, and technical events. 
It supports multiple roles (Participant, Organizer, Admin) and features live event mode, dynamic QR check-ins, networking matching, and much more.

## Technology Stack
- **Frontend**: React.js, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js, Socket.IO
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, bcrypt

## Getting Started

1. **Install dependencies**
   - Root: `npm install`
   - Server: `cd server && npm install`
   - Client: `cd client && npm install`

2. **Environment Variables**
   - Copy `.env.example` to `.env` in the root folder.
   - Fill in your MongoDB connection string and JWT secret.

3. **Seed Database**
   - Run `cd server && node seeder.js` to create demo users and events.

4. **Run Application**
   - Run `npm run dev` in the root directory to start both client and server concurrently.

## Demo Credentials
- Admin: admin@eventsphere.com / password123
- Organizer: organizer@eventsphere.com / password123
- Participant: participant@eventsphere.com / password123
