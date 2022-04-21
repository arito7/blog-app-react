/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { grey, shadow, shadowDarker } from '../config/css';
import { Link, useNavigate } from 'react-router-dom';
import { formatDate } from '../config/helpers';

const Post = ({ post }) => {
  const navigate = useNavigate();
  return (
    <li
      css={css`
        cursor: pointer;
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
      onClick={() => {
        navigate(`/post/${post._id}`);
      }}
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
        <span>{formatDate(post.createdAt)}</span>
      </div>

      <p>{post.body}</p>
    </li>
  );
};

export default Post;
