import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getPost,
  getComments,
  formatDate,
  postComment,
} from '../config/helpers';
import Loading from '../components/Loading';
import { Button, Box, Grid, TextField, Typography, Paper } from '@mui/material';
import { useSnackbar } from '../contexts/SnackbarContext';

const useComments = (post) => {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    console.log('effect: getting comments');
    if (post) {
      getComments(post._id)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            setComments(data.comments);
          }
        })
        .catch((err) => console.log(err.message));
    }
  }, [post]);

  return [comments, setComments];
};

const Post = () => {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useComments(post);
  const loading = Loading();

  useEffect(() => {
    console.log('effect: getting post');
    loading.setLoading(true);
    getPost(params.id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setPost(data.post);
        }
        loading.setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      {loading.component}
      <Grid container p={'2rem'} justifyContent="center" rowGap={'1rem'}>
        <Grid item xs={12}>
          <Typography variant="h4">{post?.title}</Typography>
        </Grid>
        <Grid item xs={6} align="left">
          <Typography variant="subtitle1">By {post?.creator}</Typography>
        </Grid>
        <Grid item xs={6} align="right">
          <Typography variant="subtitle1">
            {formatDate(post?.createdAt)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" component="p">
            {post?.body}
          </Typography>
        </Grid>

        <CommentForm post={post} setComments={setComments} />

        <Grid item container xs={12}>
          {comments?.map((com) => (
            <Comment comment={com} key={com.id} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

const Comment = ({ comment }) => {
  return (
    <Paper elevation="0" sx={{ width: '100%', padding: '1rem' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          textAlign="left"
          variant="subtitle2"
          color="color.secondary"
        >
          {comment.name} says:
        </Typography>
        <Typography textAlign="right" variant="subtitle2">
          {formatDate(comment.createdAt)}
        </Typography>
      </Box>
      <Typography textAlign="left">{comment.comment}</Typography>
    </Paper>
  );
};

const CommentForm = ({ post, setComments }) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handlePostComment = () => {
    postComment(post._id, name, comment)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setComment('');
          setName('');
          getComments(post._id)
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                setComments(data.comments);
              }
            })
            .catch((err) => console.log(err.message));
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <Grid component="form" item xs={12} sm={6} container rowGap="1rem">
      <TextField
        sx={{ width: '100%' }}
        label="Display Name"
        variant="outlined"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <TextField
        sx={{ width: '100%' }}
        label="Comment"
        placeholder="I have something very nice to say..."
        multiline
        rows={2}
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <Button
        variant="outlined"
        onClick={handlePostComment}
        sx={{ marginLeft: 'auto' }}
      >
        Comment
      </Button>
    </Grid>
  );
};
export default Post;
