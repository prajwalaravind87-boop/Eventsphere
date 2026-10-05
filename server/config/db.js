const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/User');
const Event = require('../models/Event');

const seedDemoData = async () => {
  try {
    const createdUsers = await User.create([
      { name: 'Admin User', email: 'admin@eventsphere.com', password: 'password123', role: 'ADMIN' },
      { name: 'John Organizer', email: 'organizer@eventsphere.com', password: 'password123', role: 'ORGANIZER' },
      { name: 'Jane Participant', email: 'participant@eventsphere.com', password: 'password123', role: 'PARTICIPANT' }
    ]);
    const organizerId = createdUsers[1]._id;
    await Event.insertMany([
      {
        organizer: organizerId,
        title: 'AI Innovation Summit 2027',
        description: 'Explore the future of Artificial Intelligence, Machine Learning, and Neural Networks at this cutting-edge global summit. Features keynote speakers from top tech giants, hands-on ML workshops, and networking sessions with industry leaders.',
        category: 'Conference',
        eventType: 'Hybrid',
        startDate: new Date('2027-03-15'),
        endDate: new Date('2027-03-16'),
        startTime: '09:00',
        endTime: '17:00',
        venue: 'Tech Park Auditorium',
        city: 'Bengaluru',
        capacity: 500,
        ticketPrice: 999,
        status: 'Published'
      },
      {
        organizer: organizerId,
        title: 'Global Hackathon: Build the Future',
        description: 'A 48-hour intense coding marathon to solve real-world problems. Form a team, build a prototype, and pitch to angel investors! Free food, swags, and a massive prize pool of $10,000.',
        category: 'Hackathon',
        eventType: 'Offline',
        startDate: new Date('2027-04-10'),
        endDate: new Date('2027-04-12'),
        startTime: '10:00',
        endTime: '10:00',
        venue: 'Startup Hub',
        city: 'Mumbai',
        capacity: 1000,
        ticketPrice: 0,
        teamRegistration: true,
        minTeamSize: 2,
        maxTeamSize: 4,
        status: 'Registration Open'
      },
      {
        organizer: organizerId,
        title: 'Web3 & Blockchain Masterclass',
        description: 'Dive deep into smart contracts, decentralized apps (dApps), and the future of finance. Perfect for developers looking to transition into the Web3 space.',
        category: 'Workshop',
        eventType: 'Online',
        startDate: new Date('2027-05-05'),
        endDate: new Date('2027-05-05'),
        startTime: '14:00',
        endTime: '18:00',
        capacity: 200,
        ticketPrice: 499,
        status: 'Published'
      },
      {
        organizer: organizerId,
        title: 'E-Sports Championship: Valorant',
        description: 'The biggest collegiate E-Sports tournament of the year. Compete against top teams and win massive cash prizes. Live casting and audience giveaways!',
        category: 'Gaming',
        eventType: 'Offline',
        startDate: new Date('2027-06-20'),
        endDate: new Date('2027-06-22'),
        startTime: '09:00',
        endTime: '21:00',
        venue: 'Arena 52',
        city: 'Delhi',
        capacity: 2000,
        ticketPrice: 250,
        status: 'Published'
      },
      {
        organizer: organizerId,
        title: 'UI/UX Design Systems Workshop',
        description: 'Learn how to build scalable design systems in Figma. Taught by senior product designers. Includes real-world assignments and portfolio reviews.',
        category: 'Design',
        eventType: 'Hybrid',
        startDate: new Date('2027-07-10'),
        endDate: new Date('2027-07-11'),
        startTime: '10:00',
        endTime: '16:00',
        venue: 'Creative Studio',
        city: 'Pune',
        capacity: 150,
        ticketPrice: 1500,
        status: 'Published'
      },
      {
        organizer: organizerId,
        title: 'Startup Pitch Fest 2027',
        description: 'Got an idea? Pitch it to top VC firms and angel investors. A networking mixer for founders, investors, and early-stage startup employees.',
        category: 'Entrepreneurship',
        eventType: 'Offline',
        startDate: new Date('2027-08-01'),
        endDate: new Date('2027-08-01'),
        startTime: '16:00',
        endTime: '22:00',
        venue: 'Grand Hotel',
        city: 'Bengaluru',
        capacity: 300,
        ticketPrice: 0,
        status: 'Published'
      }
    ]);
    console.log('Demo Data automatically seeded to in-memory DB!');
  } catch (err) {
    console.error('Error seeding demo data:', err);
  }
};

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI || 'mongodb://localhost:27017/eventsphere';
    let isMemory = false;

    if (uri.includes('localhost') || uri.includes('127.0.0.1')) {
      console.log('Local MongoDB URI detected. Using mongodb-memory-server for guaranteed demo operation...');
      const mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
      isMemory = true;
      console.log(`In-memory MongoDB started at: ${uri}`);
    }

    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    if (isMemory) {
      await seedDemoData();
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
