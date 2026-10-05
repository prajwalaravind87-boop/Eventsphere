import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events');
        setEvents(res.data.data.slice(0, 3)); 
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <section 
        className="w-full bg-[var(--color-primary)] text-white py-24 px-4 relative bg-cover bg-center"
        style={{ backgroundImage: 'linear-gradient(rgba(30, 27, 75, 0.8), rgba(30, 27, 75, 0.9)), url(https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)' }}
      >
        <div className="container mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight"
          >
            Your next <span className="text-[var(--color-accent)]">experience</span> starts here.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl mb-10 text-gray-300 max-w-2xl mx-auto"
          >
            Discover exclusive events, connect with brilliant minds, and participate in experiences that matter.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-x-4 flex justify-center"
          >
            <Link to="/events" className="inline-block bg-[var(--color-secondary)] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-violet-600 transition shadow-[0_0_20px_rgba(109,40,217,0.5)]">
              Explore Events
            </Link>
            <Link to="/create-event" className="inline-block bg-white text-[var(--color-primary)] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg">
              Create an Event
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-extrabold text-[var(--color-primary)]">Trending Events</h2>
            <p className="text-gray-500 mt-2 text-lg">Don't miss out on what everyone is talking about.</p>
          </div>
          <Link to="/events" className="hidden md:block text-[var(--color-secondary)] font-bold hover:underline">
            View All Events &rarr;
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((evt) => (
            <motion.div 
              whileHover={{ y: -10 }}
              key={evt._id} 
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col group"
            >
              <div 
                className="h-56 bg-cover bg-center relative"
                style={{ backgroundImage: `url(https://picsum.photos/seed/${evt._id}/600/400)` }}
              >
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[var(--color-primary)]">
                  {evt.category}
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-green-600">
                  {evt.ticketPrice > 0 ? `₹${evt.ticketPrice}` : 'FREE'}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <p className="text-sm text-[var(--color-secondary)] font-bold mb-2">
                  {new Date(evt.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {evt.city || 'Online'}
                </p>
                <h3 className="text-2xl font-extrabold mb-3 text-gray-900 group-hover:text-[var(--color-secondary)] transition-colors">{evt.title}</h3>
                <p className="text-gray-600 text-sm mb-6 line-clamp-2">{evt.description}</p>
                <div className="mt-auto">
                  <Link to={`/events/${evt._id}`} className="w-full block text-center bg-gray-100 text-[var(--color-primary)] font-bold py-3 rounded-xl group-hover:bg-[var(--color-secondary)] group-hover:text-white transition-colors">
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
          {events.length === 0 && <p className="text-gray-500">No events found.</p>}
        </div>
      </section>
    </div>
  );
};
export default Home;
