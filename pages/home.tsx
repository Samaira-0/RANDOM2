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
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
