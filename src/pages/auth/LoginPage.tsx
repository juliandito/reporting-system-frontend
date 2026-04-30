import { Mail, Lock } from 'lucide-react';
import { useLoginPage } from './hooks/useLoginPage';

export function LoginPage() {
  const {
    email,
    password,
    isLoading,
    error,
    setEmail,
    setPassword,
    handleSubmit,
  } = useLoginPage();

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-base-content">Login</h1>
        <p className="text-sm text-base-content/60 mt-1">
          Sign in to continue to the dashboard.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="form-control w-full">
          <span className="label-text mb-2 font-medium">Email</span>
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50"
            />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="input input-bordered w-full pl-10"
              required
            />
          </div>
        </label>

        <label className="form-control w-full">
          <span className="label-text mb-2 font-medium">Password</span>
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50"
            />
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="input input-bordered w-full pl-10"
              required
            />
          </div>
        </label>

        {error && <p className="text-sm text-error">{error}</p>}

        <button
          type="submit"
          className="btn btn-primary w-full mt-2"
          disabled={isLoading}
        >
          Sign In
        </button>
      </form>
    </>
  );
}
