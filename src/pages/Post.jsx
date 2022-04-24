import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPost, getComments, postComment } from '../config/apiHelpers';
import { formatDate } from '../config/formatDate';
import Loading from '../components/Loading';
import {
  Button,
  Box,
  Grid,
  TextField,
  Typography,
  Paper,
  Divider,
  Link,
} from '@mui/material';
import { useSnackbar } from '../contexts/SnackbarContext';

const useComments = (post) => {
  const [comments, setComments] = useState(null);

  useEffect(() => {
    console.log('effect: getting comments');
    if (post) {
      getComments(post._id)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setComments(data.comments);
          }
        })
        .catch((err) => console.log(err.message));
    }
  }, [post]);

  // expose setComments to manually update comments when a new comment is posted
  return [comments, setComments];
};

const Post = () => {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useComments(post);
  const loading = Loading();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('effect: getting post');
    loading.setLoading(true);
    getPost(params.id)
      .then((res) => res.json())
      .then((data) => {
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
          <Typography variant="subtitle1">
            By{' '}
            <Link
              variant="subtitle1"
              component="button"
              underline="always"
              onClick={() => {
                navigate(`/user/${post?.creator?.id}`);
              }}
            >
              {post?.creator?.username}
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={6} align="right">
          <Typography variant="subtitle1">
            {formatDate(post?.createdAt)}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <Typography textAlign="left" variant="body1" component="p">
            {post?.body}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <CommentForm post={post} setComments={setComments} />

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item container xs={12} sm={8}>
          <Typography variant="h6">Comments:</Typography>
          {comments?.length > 0 ? (
            comments.map((com) => <Comment comment={com} key={com.id} />)
          ) : (
            <Typography textAlign="center" m="auto">
              There are no comments yet...
            </Typography>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

const Comment = ({ comment }) => {
  return (
    <Paper elevation="0" sx={{ width: '100%', padding: '1rem' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography textAlign="left" variant="subtitle2" color="secondary">
          {comment.name} says:
        </Typography>
        <Typography textAlign="right" variant="subtitle2">
          {formatDate(comment.createdAt)}
        </Typography>
      </Box>
      <Divider light />
      <Typography textAlign="left">{comment.comment}</Typography>
    </Paper>
  );
};

const CommentForm = ({ post, setComments }) => {
  const snackbar = useSnackbar();
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [commentHelper, setCommentHelper] = useState('');
  const [nameHelper, setNameHelper] = useState('');

  const handlePostComment = () => {
    if (comment.length < 3) {
      setCommentHelper('Your comment is too short.');
      return;
    } else {
      setCommentHelper('');
    }
    if (name.length === 0) {
      setNameHelper('Display name cannot be empty.');
      return;
    } else if (name.length < 3) {
      setNameHelper('The display name is too short.');
      return;
    } else {
      setNameHelper('');
    }
    postComment(post._id, name, comment)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
          snackbar.setSeverity('success');
          snackbar.setMessage('Comment submitted!');
          snackbar.setOpen(true);
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
        required
        sx={{ width: '100%' }}
        label="Display Name"
        variant="outlined"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        error={nameHelper}
        helperText={nameHelper}
      />
      <TextField
        required
        sx={{ width: '100%' }}
        label="Comment"
        placeholder="I have something very nice to say..."
        multiline
        rows={2}
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
        error={commentHelper}
        helperText={commentHelper}
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
