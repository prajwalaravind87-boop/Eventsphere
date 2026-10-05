import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const ExploreEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events');
        setEvents(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-secondary)]"></div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h2 className="text-5xl font-extrabold mb-4 text-[var(--color-primary)] tracking-tight">Discover Events</h2>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">Find the best tech events, workshops, hackathons, and networking sessions tailored for you.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((evt, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={evt._id} 
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group overflow-hidden"
          >
            <div 
              className="h-48 bg-cover bg-center relative"
              style={{ backgroundImage: `url(https://picsum.photos/seed/${evt._id}/600/400)` }}
            >
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-800">
                {evt.category}
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-extrabold text-xl text-gray-900 line-clamp-2 leading-tight group-hover:text-[var(--color-secondary)] transition-colors">{evt.title}</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{evt.description}</p>
              
              <div className="mt-auto border-t pt-4 flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">When</p>
                  <p className="text-sm font-semibold text-[var(--color-primary)]">{new Date(evt.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Price</p>
                  <span className="text-sm font-bold text-green-600">{evt.ticketPrice > 0 ? `₹${evt.ticketPrice}` : 'FREE'}</span>
                </div>
              </div>
              
              <Link to={`/events/${evt._id}`} className="mt-5 block text-center bg-gray-50 border border-gray-200 text-[var(--color-primary)] font-bold py-2.5 rounded-xl group-hover:bg-[var(--color-secondary)] group-hover:text-white group-hover:border-transparent transition-all">
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
export default ExploreEvents;
