/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { useEffect, useState } from 'react';
import { API_ENDPOINT } from '../config/constants';

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
    <div className="postContainer">
      <ul
        css={css`
          display: grid;
          gap: 1rem;
        `}
      >
        {posts
          ? posts.map((post) => {
              return <Post post={post} key={post.id} />;
            })
          : null}
      </ul>
    </div>
  );
};

const Post = ({ post }) => {
  return (
    <li
      css={css`
        color: blue;
        &:hover {
          color: red;
        }
      `}
    >
      <h2
        css={css`
          color: blue;
        `}
      >
        {post.title}
      </h2>
      <p>{post.body}</p>
    </li>
  );
};

export default Home;
