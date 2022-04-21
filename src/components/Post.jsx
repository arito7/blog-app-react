/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { grey, shadow, shadowDarker } from '../config/css';
import { Link, useNavigate } from 'react-router-dom';
import { formatDate } from '../config/helpers';
import { Typography, Card, CardContent, CardHeader } from '@mui/material';

const Post = ({ post }) => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => {
        navigate(`/post/${post._id}`);
      }}
    >
      <CardHeader title={post.title} subheader={formatDate(post.createdAt)} />
      <CardContent>
        <Typography variant="body2">{post.body}</Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
