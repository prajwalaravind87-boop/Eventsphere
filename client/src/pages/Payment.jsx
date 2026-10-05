import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CreditCard, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Payment = () => {
  const { id } = useParams(); // registration ID
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [registration, setRegistration] = useState(null);

  useEffect(() => {
    // In a real app we might fetch registration details to show amount
    // For now we assume the user is just finalizing the demo checkout
    setRegistration(id);
  }, [id]);

  const handlePayment = async () => {
    setProcessing(true);
    try {
      const token = localStorage.getItem('token');
      // Simulate network/payment delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const res = await axios.post(`http://localhost:5000/api/registrations/${id}/pay`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate(`/ticket/${id}`);
    } catch (err) {
      alert('Payment failed');
      setProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="bg-[var(--color-primary)] p-6 text-center text-white">
          <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold">Secure Checkout</h2>
          <p className="text-indigo-200 mt-2">Demo Payment Gateway</p>
        </div>
        <div className="p-8 space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-500 font-medium mb-1">Registration ID</p>
            <p className="font-mono text-gray-800 text-xs truncate">{id}</p>
          </div>
          
          <button 
            onClick={handlePayment}
            disabled={processing}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center transition ${processing ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30'}`}
          >
            {processing ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Processing...
              </div>
            ) : (
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Complete Registration
              </div>
            )}
          </button>
          
          <p className="text-center text-xs text-gray-400 mt-4">
            This is a simulated demo payment. No real charges will be made.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
export default Payment;
