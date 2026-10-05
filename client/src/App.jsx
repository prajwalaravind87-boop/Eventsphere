import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ExploreEvents from './pages/ExploreEvents';
import CreateEvent from './pages/CreateEvent';
import EventDetails from './pages/EventDetails';
import EditEvent from './pages/EditEvent';
import Payment from './pages/Payment';
import Ticket from './pages/Ticket';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/events" element={<ExploreEvents />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/edit-event/:id" element={<EditEvent />} />
            <Route path="/payment/:id" element={<Payment />} />
            <Route path="/ticket/:id" element={<Ticket />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
export default App;
