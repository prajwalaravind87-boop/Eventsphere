import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import QRCode from 'react-qr-code';
import { Download, Calendar, MapPin, User, Ticket as TicketIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const Ticket = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/registrations/${id}/ticket`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTicket(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, [id]);

  if (loading) return <div className="text-center py-20">Generating your ticket...</div>;
  if (!ticket) return <div className="text-center py-20 text-red-500">Ticket not found</div>;

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[var(--color-primary)]">You're In! 🎉</h2>
          <p className="text-gray-500 mt-2">Present this QR code at the event entrance.</p>
        </div>

        {/* Ticket Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 relative">
          
          {/* Header */}
          <div className="bg-[var(--color-primary)] p-6 text-white text-center relative">
            <TicketIcon className="w-8 h-8 absolute top-6 left-6 opacity-30" />
            <span className="uppercase text-xs font-bold tracking-widest text-indigo-300 block mb-1">Official Entry Pass</span>
            <h3 className="text-2xl font-bold">{ticket.event.title}</h3>
          </div>

          {/* Body */}
          <div className="p-8 border-b-2 border-dashed border-gray-200">
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Attendee</p>
                <p className="font-semibold text-gray-800 flex items-center"><User className="w-4 h-4 mr-1 text-gray-400"/> {ticket.participant.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Ticket ID</p>
                <p className="font-mono font-semibold text-indigo-600">{ticket.ticketId}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Date</p>
                <p className="font-semibold text-gray-800 flex items-center"><Calendar className="w-4 h-4 mr-1 text-gray-400"/> {new Date(ticket.event.startDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Location</p>
                <p className="font-semibold text-gray-800 flex items-center"><MapPin className="w-4 h-4 mr-1 text-gray-400"/> {ticket.event.city || 'Online'}</p>
              </div>
            </div>
            
            <div className="flex justify-center p-4 bg-gray-50 rounded-xl">
              <QRCode value={`TICKET:${ticket.ticketId}`} size={150} />
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 p-6 flex justify-between items-center">
            <Link to="/events" className="text-[var(--color-primary)] font-bold hover:underline">Explore More Events</Link>
            <button className="flex items-center text-[var(--color-secondary)] font-bold hover:text-violet-700 bg-indigo-50 px-4 py-2 rounded-lg">
              <Download className="w-4 h-4 mr-2"/> Save PDF
            </button>
          </div>

          {/* Cutouts for visual ticket effect */}
          <div className="absolute top-[60%] -left-4 w-8 h-8 bg-[var(--color-lightbg)] rounded-full shadow-inner border border-gray-100"></div>
          <div className="absolute top-[60%] -right-4 w-8 h-8 bg-[var(--color-lightbg)] rounded-full shadow-inner border border-gray-100"></div>
        </div>
      </motion.div>
    </div>
  );
};
export default Ticket;
