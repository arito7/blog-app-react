/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { Link, useNavigate } from 'react-router-dom';
import { formatDate, updatePost } from '../config/helpers';
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActionArea,
  CardActions,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { Delete } from '@mui/icons-material';

const Post = ({ post }) => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handlePublish = () => {
    updatePost(post._id, null, null, true)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card>
      <CardActionArea
        onClick={() => {
          navigate(`/post/${post._id}`);
        }}
      >
        <CardHeader title={post.title} subheader={formatDate(post.createdAt)} />
        <CardContent>
          <Typography variant="body2" textAlign="left">
            {post.body.split(' ').slice(0, 50).join(' ')}
            {post.body.length > 50 ? '...' : null}
          </Typography>
        </CardContent>
      </CardActionArea>
      {auth?.user?._id === post.creator ? (
        <CardActions>
          <Button color="error" endIcon={<Delete />}>
            Delete
          </Button>
          {post.published ? null : (
            <Button onClick={handlePublish}>Publish</Button>
          )}
        </CardActions>
      ) : null}
    </Card>
  );
};

export default Post;
