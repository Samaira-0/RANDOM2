import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setOtp(e.target.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', form);
      alert(res.data.message); // Show the message from the server
      setIsOtpSent(true); // Set the state to show OTP input
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error || 'Login failed: Unknown error';
      alert(errorMessage);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/verify-otp', { email: form.email, otp });
      alert('OTP verification successful!');

      // Optionally store user info if returned from API
      if (res.data.user) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
      }

      // Redirect to home page after success
      router.push('/home');
    } catch (err: any) {
      console.error('OTP Verification error:', err);
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'OTP verification failed: Unknown error';
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
      <form onSubmit={isOtpSent ? handleOtpSubmit : handleSubmit} className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <div>
          <input
            name="email"
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {isOtpSent && (
          <div>
            <input
              name="otp"
              type="text"
              onChange={handleOtpChange}
              placeholder="Enter OTP"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg shadow-md transition duration-200"
        >
          {isOtpSent ? 'Verify OTP' : 'Login'}
        </button>
      </form>
    </div>
  );
}
