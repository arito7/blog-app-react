/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { useEffect, useState } from 'react';
import { API_ENDPOINT } from '../config/constants';
import { grey, shadow, shadowDarker } from '../config/css';
import moment from 'moment';

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
        padding: 0 1rem;
        background-color: ${grey};
        border-radius: 0.25rem;
        box-shadow: ${shadow};
        transition-property: box-shadow;
        transition-duration: 300ms;
        &:hover {
          box-shadow: ${shadowDarker};
        }
      `}
    >
      <div
        css={css`
          padding: 0 1rem;
          display: grid;
          grid-template-columns: 1fr auto;
          justify-items: center;
          align-items: center;
        `}
      >
        <h2
          css={css`
            justify-self: start;
          `}
        >
          {post.title}
        </h2>
        <span>{moment(post.createdAt).format('MMM d, YYYY')}</span>
      </div>

      <p>{post.body}</p>
    </li>
  );
};

export default Home;
