import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-[var(--color-primary)] text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wider">
          EventSphere
        </Link>
        <div className="space-x-6 hidden md:flex">
          <Link to="/" className="hover:text-[var(--color-accent)] transition">Home</Link>
          <Link to="/events" className="hover:text-[var(--color-accent)] transition">Explore Events</Link>
        </div>
        <div className="space-x-4 flex items-center">
          {user ? (
            <>
              <span className="text-sm text-gray-300">Hi, {user.name}</span>
              <button onClick={handleLogout} className="hover:text-red-400">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link to="/register" className="bg-[var(--color-secondary)] px-4 py-2 rounded font-medium hover:bg-violet-600 transition">
                Create Account
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
