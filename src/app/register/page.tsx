'use client';

import { useState } from 'react';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<RegisterForm>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Check if user exists
    const storedUsers = localStorage.getItem('registeredUsers');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (users.some((u: any) => u.email === form.email)) {
      setError('This identity is already registered in this dimension.');
      return;
    }

    if (form.email === 'admin@admin.com') {
      setError('Identity theft is not a joke, Jim! You cannot be Admin.');
      return;
    }

    // Save new user
    const newUser = { name: form.name, email: form.email, password: form.password };
    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));

    // Auto-login
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    console.warn('Registro exitoso:', form);

    window.dispatchEvent(new Event("auth-update"));
    router.push('/dashboard');
  };

  return (
    <div className="auth-container">
      <div className="portal-bg absolute inset-0 z-0"></div>

      <div className="auth-box" style={{ borderColor: 'rgba(0,181,204,0.3)' }}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)]">
            New Citizen Identity
          </h1>
          <p className="text-muted mt-2 text-sm">Join the Citadel of Ricks (or Mortys).</p>
        </div>

        {error && (
          <div className="alert alert-danger text-sm font-bold mb-6 animate-pulse" role="alert">
            🛑 {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--secondary)] mb-1">Full Designation</label>
            <input
              type="text"
              name="name"
              placeholder="Ex: Morty Smith C-137"
              value={form.name}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--secondary)] mb-1">Email Coordinates</label>
            <input
              type="email"
              name="email"
              placeholder="citadel@rick.com"
              value={form.email}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--secondary)] mb-1">Secrets</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--secondary)] mb-1">Confirm Secrets</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full mt-4 text-lg font-bold"
          >
            Create Identity
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted">
          Already have clearance?{' '}
          <a href="/login" className="text-[var(--secondary)] hover:underline font-bold">
            Access Portal
          </a>
        </div>
      </div>
    </div>
  );
}
