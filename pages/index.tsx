// index.tsx

import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 to-sky-500 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md text-center space-y-6 custom-class">
        <h1 className="text-3xl font-extrabold text-white">Welcome to My Auth App</h1>
        <p className="text-gray-300 text-sm">Please choose an option to get started:</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.push('/login')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg shadow-md transition duration-200"
          >
            Sign In
          </button>
          <button
            onClick={() => router.push('/register')}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-lg shadow-md transition duration-200"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
