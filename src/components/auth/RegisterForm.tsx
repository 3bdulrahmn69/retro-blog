import React from 'react';
import Button from '../ui/Button';

interface RegisterFormProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`p-6 space-y-6 min-h-[400px] flex flex-col transition-all duration-300}`}
    >
      <div className="space-y-2">
        <label className="block text-amber-800 font-bold uppercase tracking-wide text-sm">
          Full Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 bg-amber-50 border-2 border-amber-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-amber-800 font-bold uppercase tracking-wide text-sm">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 bg-amber-50 border-2 border-amber-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-amber-800 font-bold uppercase tracking-wide text-sm">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 bg-amber-50 border-2 border-amber-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          required
        />
      </div>

      <div className="mt-auto">
        <Button type="submit">Register</Button>
      </div>
    </form>
  );
};

export default RegisterForm;
