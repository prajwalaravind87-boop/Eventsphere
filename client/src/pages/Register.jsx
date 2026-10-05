import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'PARTICIPANT' });
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData.name, formData.email, formData.password, formData.role);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-full py-10">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-[var(--color-primary)]">Create Account</h2>
        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Full Name</label>
            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[var(--color-secondary)]" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[var(--color-secondary)]" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Role</label>
            <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[var(--color-secondary)]">
              <option value="PARTICIPANT">Participant</option>
              <option value="ORGANIZER">Organizer</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[var(--color-secondary)]" />
          </div>
          <button type="submit" className="w-full bg-[var(--color-secondary)] text-white font-bold py-2 rounded-lg hover:bg-violet-600 transition">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
export default Register;
