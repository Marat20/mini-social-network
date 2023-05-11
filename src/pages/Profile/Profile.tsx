import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/redux-hook';
import { useEffect, useState } from 'react';
import { User } from '../../interface/interfaces';
import axios from '../../axios';

export const Profile = () => {
  const [user, setUser] = useState<User>();
  const { userId } = useParams();

  useEffect(() => {
    axios
      .get(`/user/${userId}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.log(error));
  }, [userId]);
  
  return (
    <>
      <div className='flex'>
        <div></div>
        <div>
          <div>
            <h2>{user?.fullName}</h2>
            <div>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
