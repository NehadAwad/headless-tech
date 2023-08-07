import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

interface LoginResult {
  login: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useLogin = (): LoginResult => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
      }
      if (response.ok) {
        // Save the user to local storage
        localStorage.setItem('user', JSON.stringify(json));

        // Update the auth context
        dispatch({ type: 'LOGIN', payload: json });

        // Update loading state
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError('An error occurred while logging in.');
    }
  };

  return { login, isLoading, error };
};
