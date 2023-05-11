import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAppDispatch } from '../../redux/redux-hook';
import { logout } from '../../redux/slices/login';

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
  };

  return (
    <>
      <header className='flex flex-row justify-between'>
        <div>
          <Link to={'/'}>
            <button>Домой</button>
          </Link>
        </div>
        <div>
          {useAuth() ? (
            <button onClick={handleLogout}>Выйти</button>
          ) : (
            <>
              <Link to={'/login'}>
                <button className='mr-2'>Логин</button>
              </Link>
              <Link to={'/register'}>
                <button>Регистрация</button>
              </Link>
            </>
          )}
        </div>
      </header>
      <main className='flex flex-col items-center h-screen'>{children}</main>
    </>
  );
};
