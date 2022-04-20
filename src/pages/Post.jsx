import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPost, getComments, formatDate } from '../config/helpers';
import Loading from '../components/Loading';
import { Grid, Typography } from '@mui/material';

const Post = () => {
  const params = useParams();
  const [post, setPost] = useState();
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

  useEffect(() => {
    console.log('effect: getting comments');
    getComments(params.id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err.message));
  }, [post]);

  return (
    <div>
      {loading.component}
      <Grid container p={'2rem'}>
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
      </Grid>
    </div>
  );
};

export default Post;
