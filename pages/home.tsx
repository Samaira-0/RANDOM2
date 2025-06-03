<<<<<<< HEAD
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type User = {
  name: string;
  email: string;
  // Add other fields if needed
};

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || 'null');
    if (!userData) {
      router.push('/login');
    } else {
      setUser(userData);
    }
  }, [router]);

  const goToEmotionPage = () => {
    router.push('/emotion');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
      {user ? (
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
          <p>Your email: {user.email}</p>
          <button
            onClick={goToEmotionPage}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go to Emotional Classification
          </button>
=======
// pages/home.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [user, setUser ] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch user data from local storage or API
    const userData = JSON.parse(localStorage.getItem('user') || 'null');
    if (!userData) {
      router.push('/login'); // Redirect to login if not authenticated
    } else {
      setUser (userData);
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {user ? (
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
          <p>Your email: {user.email}</p>
>>>>>>> b7032f8430ee02a2a1f8404a9eabdb1086f455c7
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
<<<<<<< HEAD

=======
>>>>>>> b7032f8430ee02a2a1f8404a9eabdb1086f455c7
