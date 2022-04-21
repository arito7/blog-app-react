/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { useEffect, useState } from 'react';
import { API_ENDPOINT } from '../config/constants';
import Post from './Post';
import PostSkeleton from './PostSkeleton';

const Home = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetch(`${API_ENDPOINT}/posts`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data.posts);
        setPosts(data.posts);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      <ul
        css={css`
          margin: auto;
          display: grid;
          gap: 1rem;
          max-width: 85%;
          padding: 1rem;
          justify-contents: center;
        `}
      >
        {posts ? (
          posts.map((post) => {
            return <Post post={post} key={post.id} />;
          })
        ) : (
          <PostSkeleton />
        )}
      </ul>
    </div>
  );
};

export default Home;
