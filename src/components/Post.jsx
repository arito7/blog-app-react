/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { Link, useNavigate } from 'react-router-dom';
import { formatDate } from '../config/helpers';
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActionArea,
  CardActions,
} from '@mui/material';
import { useAuth } from '../App';
import { Delete } from '@mui/icons-material';

const Post = ({ post }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => {
        navigate(`/post/${post._id}`);
      }}
    >
      <CardActionArea>
        <CardHeader title={post.title} subheader={formatDate(post.createdAt)} />
        <CardContent>
          <Typography variant="body2">{post.body}</Typography>
        </CardContent>
      </CardActionArea>
      {auth?.user ? (
        <CardActions>
          {auth.user._id === post.creator ? (
            <>
              <Button color="error" endIcon={<Delete />}>
                Delete
              </Button>
              <Button>Publish</Button>
            </>
          ) : null}
        </CardActions>
      ) : null}
    </Card>
  );
};

export default Post;
