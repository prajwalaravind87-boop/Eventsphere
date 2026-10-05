import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-full py-20">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-[var(--color-primary)]">Login</h2>
        {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[var(--color-secondary)]" placeholder="Enter your email" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-[var(--color-secondary)]" placeholder="Enter your password" />
          </div>
          <button type="submit" className="w-full bg-[var(--color-secondary)] text-white font-bold py-2 rounded-lg hover:bg-violet-600 transition">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
