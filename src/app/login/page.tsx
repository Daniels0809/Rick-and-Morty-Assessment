'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!form.email || !form.password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    // 1. Check Hardcoded Admin
    if (form.email === 'admin@admin.com' && form.password === '123') {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify({ name: 'Admin Rick', email: 'admin@admin.com' }));
      router.push('/dashboard');
      return;
    }

    // 2. Check Registered Users from LocalStorage
    const storedUsers = localStorage.getItem('registeredUsers');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const foundUser = users.find((u: any) => u.email === form.email && u.password === form.password);

    if (foundUser) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      router.push('/dashboard');
      return;
    }

    // 3. Invalid
    setError('Invalid coordinates or passcode. Access denied.');
  };

  return (
    <div className="auth-container">
      <div className="portal-bg absolute inset-0 z-0"></div>

      <div className="auth-box">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
            Access Portal
          </h1>
          <p className="text-muted mt-2 text-sm">Identify yourself, dirtbag.</p>
        </div>

        {error && (
          <div className="alert alert-danger text-sm font-bold mb-6 animate-pulse" role="alert">
            🛑 {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--secondary)] mb-1">Email Coordinates</label>
            <input
              type="email"
              name="email"
              placeholder="C-137@citadel.com"
              value={form.email}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--secondary)] mb-1">Passcode</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <button
            type="submit"
            className="btn btn-portal w-full mt-4 text-lg"
          >
            Open Portal
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted">
          New to this dimension?{' '}
          <a href="/register" className="text-[var(--primary)] hover:underline font-bold">
            Register Identity
          </a>
        </div>
      </div>
    </div>
  );
}
