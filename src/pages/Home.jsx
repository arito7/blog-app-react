/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { useEffect, useState } from 'react';
import { API_ENDPOINT } from '../config/constants';
import Post from '../components/Post';
import PostSkeleton from '../components/PostSkeleton';
import { usePosts } from '../hooks/postHook';

const Home = () => {
  const { posts, updatePosts } = usePosts();

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
