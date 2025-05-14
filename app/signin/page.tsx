'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', password: '', email: '' });
  const router = useRouter();

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
    setForm({ name: '', password: '', email: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      const res = await signIn('credentials', {
        redirect: false,
        name: form.name,
        password: form.password,
      });

      if (res?.ok) {
        router.push('/'); 
      } else {
        alert('Login failed');
      }
    } else {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      if (res.ok) {
        alert('Signup successful! You can now login.');
        setIsLogin(true);
      } else {
        alert(data.message || 'Signup failed');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6">{isLogin ? 'Login' : 'Sign Up'}</h1>

      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
        <input
          type="text"
          name="name"
          placeholder="Username"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
          required
        />

        {!isLogin && (
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
            required
          />
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
          required
        />

        <button
          type="submit"
          className="w-full bg-white text-black py-2 rounded hover:bg-gray-300 font-semibold"
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>

      <p className="mt-4 text-gray-400">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button onClick={toggleForm} className="text-blue-400 underline">
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default AuthPage;
