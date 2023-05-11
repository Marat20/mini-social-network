import { FC } from 'react';
import { Posts } from '../../interface/interfaces';
import { format, parseISO } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import { LikeIcon } from '../../assets/icons/like';
import axios from '../../axios';
import { Link } from 'react-router-dom';

export const Post: FC<Posts> = (props) => {
  const { _id, text, image, likes, user, createdAt, isOwner } = props;

  const isoDate = createdAt;
  const date = parseISO(isoDate);
  const formattedDate = format(date, 'dd MMM yyyy', {
    locale: ruLocale,
  });

  const handleLike = async () => {
    await axios.post(`/posts/like/${_id}`);
  };

  return (
    <div className='w-2/5 min-h-min rounded-lg bg-white mt-4 px-5 py-4'>
      <header className='flex flex-row'>
        <div>
          <img
            src='https://цск-златоуст.рф/local/templates/aspro-stroy/images/noimage_detail.png'
            alt='заглушка'
            className='w-10 h-10 rounded-full mr-3'
          />
        </div>
        <div className='grow'>
          <div>
            <Link to={`/${user._id}`}>{user.fullName}</Link>
          </div>
          <div>{formattedDate}</div>
        </div>
        <div>{isOwner && 'X'}</div>
      </header>
      <div>
        <div className='pt-2'>{text}</div>
        <div className='pt-3 btn_like cursor-pointer'>
          <span onClick={handleLike}>{likes}</span>
        </div>
      </div>
    </div>
  );
};
