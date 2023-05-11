import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hook';
import { fetchPosts } from '../../redux/slices/posts';
import { Post } from '../../components/Post/Post';

export const Home = () => {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.posts);
  const userData = useAppSelector((state) => state.auth.data);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <>
      {posts?.map((post) => (
        <Post
          key={post._id}
          isOwner={userData?.user._id === post.user._id}
          {...post}
        />
      ))}
    </>
  );
};
