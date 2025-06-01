import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      // redirect to login or reset form here
    } catch (err: any) {
      setError(err.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      {!showOtpInput ? (
        <form onSubmit={handleSubmit}>
          {/* Name, Email, Password inputs with required etc. */}
          <input name="name" onChange={handleChange} placeholder="Name" required className="border p-2 mb-2 w-full" />
          <input type="email" name="email" onChange={handleChange} placeholder="Email" required className="border p-2 mb-2 w-full" />
          <input type="password" name="password" onChange={handleChange} placeholder="Password" required className="border p-2 mb-2 w-full" />
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button disabled={loading} type="submit" className="bg-green-600 text-white py-2 rounded w-full">
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      ) : (
        <div>
          <p>Enter the OTP sent to your email:</p>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="OTP"
            className="border p-2 mb-2 w-full"
          />
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button onClick={verifyOtp} disabled={loading} className="bg-blue-600 text-white py-2 rounded w-full">
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </div>
      )}
    </div>
  );
}
