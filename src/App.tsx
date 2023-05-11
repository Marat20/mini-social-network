import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Login, FriendList, Register, Profile } from './pages';
import { Layout } from './components/Layout/Layout';
import { useAppDispatch } from './redux/redux-hook';
import { useEffect } from 'react';
import { fetchLoginMe } from './redux/slices/login';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLoginMe());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/friends' element={<FriendList />} />
          <Route path='/:userId' element={<Profile />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
