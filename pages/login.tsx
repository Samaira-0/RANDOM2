// pages/login.tsx
import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', form);
      alert('Login successful! Token: ' + res.data.token);
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input name="email" onChange={handleChange} placeholder="Email" /><br />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" /><br />
      <button type="submit">Login</button>
    </form>
  );
}
