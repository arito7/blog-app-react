/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { Link, useNavigate } from 'react-router-dom';
import { deletePost, formatDate, updatePost } from '../config/helpers';
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
import { useSnackbar } from '../contexts/SnackbarContext';

const Post = ({ post, updatePosts }) => {
  const auth = useAuth();
  const snackbar = useSnackbar();
  const navigate = useNavigate();

  const handlePublish = () => {
    updatePost(post._id, null, null, true)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
  const handleDelete = () => {
    deletePost(post._id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          snackbar.setMessage('Post Deleted!');
          snackbar.setSeverity('success');
          snackbar.setOpen(true);
          updatePosts();
        } else {
          snackbar.setMessage(data.message);
          snackbar.setSeverity('error');
          snackbar.setOpen(true);
        }
      })
      .catch((err) => {
        snackbar.setMessage(err.message);
        snackbar.setSeverity('error');
        snackbar.setOpen(true);
      });
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
          <Button onClick={handleDelete} color="error" endIcon={<Delete />}>
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
