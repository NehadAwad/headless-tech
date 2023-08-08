import { useAuthContext } from './useAuthContext';
// import { useWorkoutsContext } from './useWorkoutsContext';

interface LogoutResult {
  logout: () => void;
}

export const useLogout = (): LogoutResult => {
  const { dispatch } = useAuthContext();
//   const { dispatch: dispatchWorkouts } = useWorkoutsContext();

  const logout = (): void => {
    
    // Remove user from storage
    localStorage.removeItem('user');

    // Dispatch logout action
    dispatch({ type: 'LOGOUT' });
    // dispatchWorkouts({ type: 'SET_WORKOUTS', payload: null });
  };

  return { logout };
};
