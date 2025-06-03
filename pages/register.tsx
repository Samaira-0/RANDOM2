import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter(); // Initialize useRouter

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('/api/auth/register', form);
      setShowOtpInput(true); // Show OTP input form
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.post('/api/auth/verify-register-otp', { email: form.email, otp });
      alert('Registration successful! Please login.');
      router.push('/'); // Redirect to index page after successful registration
    } catch (err: any) {
      setError(err.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 to-sky-500 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-6">
        {!showOtpInput ? (
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-center text-gray-700">Register</h2>
            <input
              name="name"
              onChange={handleChange}
              placeholder="Name"
              required
              className="border border-gray-300 p-2 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Email"
              required
              className="border border-gray-300 p-2 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              required
              className="border border-gray-300 p-2 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
            <button
              disabled={loading}
              type="submit"
              className="bg-green-600 text-white py-2 rounded-lg w-full transition duration-200 hover:bg-green-700"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-center text-gray-700">Verify OTP</h2>
            <p className="text-center text-gray-600 mb-4">Enter the OTP sent to your email:</p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="OTP"
              className="border border-gray-300 p-2 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
            <button
              onClick={verifyOtp}
              disabled={loading}
              className="bg-blue-600 text-white py-2 rounded-lg w-full transition duration-200 hover:bg-blue-700"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
