const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Event = require('./models/Event');
const connectDB = require('./config/db');

dotenv.config({ path: '../.env.example' }); // using example env for testing
// fallback to env if exists
require('dotenv').config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Event.deleteMany();

    const createdUsers = await User.insertMany([
      { name: 'Admin User', email: 'admin@eventsphere.com', password: 'password123', role: 'ADMIN' },
      { name: 'John Organizer', email: 'organizer@eventsphere.com', password: 'password123', role: 'ORGANIZER' },
      { name: 'Jane Participant', email: 'participant@eventsphere.com', password: 'password123', role: 'PARTICIPANT' }
    ]);

    const organizerId = createdUsers[1]._id;

    await Event.insertMany([
      {
        organizer: organizerId,
        title: 'AI Innovation Summit 2027',
        description: 'Explore the future of AI and machine learning at this cutting-edge summit.',
        category: 'Conference',
        eventType: 'Hybrid',
        startDate: new Date('2027-03-15'),
        endDate: new Date('2027-03-16'),
        startTime: '09:00',
        endTime: '17:00',
        venue: 'Tech Park Auditorium',
        city: 'Bengaluru',
        capacity: 500,
        status: 'Published'
      },
      {
        organizer: organizerId,
        title: 'Global Hackathon 2027',
        description: '48-hour coding marathon to solve real-world problems.',
        category: 'Hackathon',
        eventType: 'Online',
        startDate: new Date('2027-04-10'),
        endDate: new Date('2027-04-12'),
        startTime: '10:00',
        endTime: '10:00',
        capacity: 1000,
        teamRegistration: true,
        minTeamSize: 2,
        maxTeamSize: 4,
        status: 'Registration Open'
      }
    ]);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
