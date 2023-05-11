import { useAppSelector } from '../redux/redux-hook';

export const useAuth = () => {
  const isAuth = useAppSelector((state) => state.auth.data);
  return Boolean(isAuth);
};
