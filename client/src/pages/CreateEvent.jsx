import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const CreateEvent = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '', description: '', category: 'Technical', eventType: 'Offline',
    startDate: '', endDate: '', startTime: '', endTime: '', capacity: 100, ticketPrice: 0
  });

  if (!user || (user.role !== 'ORGANIZER' && user.role !== 'ADMIN')) {
    return <div className="text-center py-20">You must be an Organizer to create events.</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/events', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Event Created Successfully!');
      navigate('/events');
    } catch (err) {
      alert('Error creating event: ' + err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <h2 className="text-3xl font-bold mb-6 text-[var(--color-primary)]">Create New Event</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Title</label>
          <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border p-2 rounded focus:outline-none focus:border-[var(--color-secondary)]" />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Description</label>
          <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border p-2 rounded focus:outline-none focus:border-[var(--color-secondary)]" rows="3"></textarea>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Category</label>
            <input type="text" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border p-2 rounded focus:outline-none focus:border-[var(--color-secondary)]" />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Event Type</label>
            <select value={formData.eventType} onChange={e => setFormData({...formData, eventType: e.target.value})} className="w-full border p-2 rounded focus:outline-none focus:border-[var(--color-secondary)]">
              <option value="Offline">Offline</option>
              <option value="Online">Online</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Capacity</label>
            <input type="number" required min="1" value={formData.capacity} onChange={e => setFormData({...formData, capacity: e.target.value})} className="w-full border p-2 rounded focus:outline-none focus:border-[var(--color-secondary)]" />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Ticket Price (₹) - Enter 0 for Free</label>
            <input type="number" required min="0" value={formData.ticketPrice} onChange={e => setFormData({...formData, ticketPrice: e.target.value})} className="w-full border p-2 rounded focus:outline-none focus:border-[var(--color-secondary)]" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Start Date</label>
            <input type="date" required value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} className="w-full border p-2 rounded focus:outline-none focus:border-[var(--color-secondary)]" />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">End Date</label>
            <input type="date" required value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} className="w-full border p-2 rounded focus:outline-none focus:border-[var(--color-secondary)]" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Start Time</label>
            <input type="time" required value={formData.startTime} onChange={e => setFormData({...formData, startTime: e.target.value})} className="w-full border p-2 rounded focus:outline-none focus:border-[var(--color-secondary)]" />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">End Time</label>
            <input type="time" required value={formData.endTime} onChange={e => setFormData({...formData, endTime: e.target.value})} className="w-full border p-2 rounded focus:outline-none focus:border-[var(--color-secondary)]" />
          </div>
        </div>
        <button type="submit" className="w-full bg-[var(--color-secondary)] text-white py-3 rounded-lg font-bold hover:bg-violet-600 transition shadow-md mt-4">
          Publish Event
        </button>
      </form>
    </div>
  );
};
export default CreateEvent;
