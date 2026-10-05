import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, Tag } from 'lucide-react';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    if (!user) {
      alert('Please login to register for this event.');
      navigate('/login');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/registrations/init', 
        { eventId: id }, 
        { headers: { Authorization: `Bearer ${token}` }}
      );
      // Navigate to checkout/payment flow
      navigate(`/payment/${res.data.data._id}`);
    } catch (err) {
      alert(err.response?.data?.message || 'Error initializing registration');
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/events/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Event deleted successfully');
        navigate('/events');
      } catch (err) {
        alert('Error deleting event');
      }
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-secondary)]"></div>
    </div>
  );
  if (!event) return <div className="text-center py-20 text-xl text-red-500">Event not found</div>;

  const isOwner = user && (user._id === event.organizer._id || user.role === 'ADMIN');

  return (
    <div className="pb-20">
      <div 
        className="w-full h-[50vh] min-h-[400px] bg-cover bg-center relative"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(30,27,75,0.9)), url(https://picsum.photos/seed/${event._id}/1200/600)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-lightbg)] to-transparent opacity-90"></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12 relative z-10">
          <div className="flex justify-between items-end">
            <div className="max-w-3xl">
              <span className="inline-block bg-white/20 backdrop-blur-md text-white border border-white/30 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-4">
                {event.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">{event.title}</h1>
              <div className="flex items-center text-gray-200 space-x-6 text-lg">
                <span className="flex items-center"><Calendar className="w-5 h-5 mr-2"/> {new Date(event.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span className="flex items-center"><MapPin className="w-5 h-5 mr-2"/> {event.eventType === 'Online' ? 'Online Event' : event.city}</span>
              </div>
            </div>
            
            {isOwner && (
              <div className="flex space-x-3 mb-4">
                <Link to={`/edit-event/${event._id}`} className="bg-white/10 hover:bg-white/20 backdrop-blur border border-white/50 text-white px-5 py-2.5 rounded-xl font-bold transition">
                  Edit Event
                </Link>
                <button onClick={handleDelete} className="bg-red-500/80 hover:bg-red-600 backdrop-blur text-white px-5 py-2.5 rounded-xl font-bold transition">
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-4 text-[var(--color-primary)]">About This Event</h2>
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">{event.description}</p>
            </motion.div>
          </div>
          
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 sticky top-6">
              <div className="text-center pb-6 border-b border-gray-100 mb-6">
                <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-1">Ticket Price</p>
                <span className="block text-5xl font-extrabold text-gray-900">
                  {event.ticketPrice > 0 ? `₹${event.ticketPrice}` : 'FREE'}
                </span>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-700">
                  <div className="bg-indigo-50 p-2 rounded-lg mr-4"><Clock className="text-indigo-500 w-5 h-5"/></div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">TIME</p>
                    <p className="font-bold">{event.startTime} - {event.endTime}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="bg-blue-50 p-2 rounded-lg mr-4"><MapPin className="text-blue-500 w-5 h-5"/></div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">LOCATION</p>
                    <p className="font-bold">{event.venue || 'TBA'}, {event.city}</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-700">
                  <div className="bg-purple-50 p-2 rounded-lg mr-4"><Users className="text-purple-500 w-5 h-5"/></div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold">CAPACITY</p>
                    <p className="font-bold">{event.capacity} Attendees</p>
                  </div>
                </div>
              </div>

              {!isOwner ? (
                <button 
                  onClick={handleRegister}
                  className="w-full bg-gradient-to-r from-[var(--color-secondary)] to-indigo-600 text-white py-4 rounded-xl font-extrabold text-lg shadow-[0_10px_20px_rgba(109,40,217,0.3)] hover:shadow-[0_10px_25px_rgba(109,40,217,0.5)] transform hover:-translate-y-1 transition-all"
                >
                  Register Now
                </button>
              ) : (
                <div className="w-full bg-gray-100 text-gray-500 py-4 rounded-xl font-bold text-center border border-dashed border-gray-300">
                  You are the Organizer
                </div>
              )}
            </motion.div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
export default EventDetails;
