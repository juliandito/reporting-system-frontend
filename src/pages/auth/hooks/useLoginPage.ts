import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/RouteConstants';
import { useAuthStore } from '../../../store/useAuthStore';

export function useLoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      clearError();
      try {
        await login({ email, password });
        navigate(ROUTES.DASHBOARD);
      } catch {
        // Error is already handled in auth store.
      }
    },
    [clearError, email, login, navigate, password]
  );

  return {
    email,
    password,
    isLoading,
    error,
    setEmail,
    setPassword,
    handleSubmit,
  };
}
