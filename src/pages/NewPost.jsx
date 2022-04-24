import {
  Button,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { createPost } from '../config/apiHelpers';

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [publish, setPublish] = useState(false);

  function handlePublish(e) {
    setPublish(e.target.checked);
  }

  const onPost = (e) => {
    console.log(title, body);
    createPost(title, body, publish)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <Typography m={3} color="secondary" variant="h3" component="h2">
        Create a new post
      </Typography>
      <Grid container component="form" p={3}>
        <Grid item xs={12}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
            sx={{ paddingBottom: '1rem' }}
            fullWidth
            color="secondary"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Content"
            required
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
            multiline
            sx={{ paddingBottom: '1rem' }}
            fullWidth
            minRows={2}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Switch onChange={handlePublish} />}
            label="Publish"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="button"
            color="secondary"
            variant="contained"
            onClick={onPost}
          >
            Post
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default NewPost;
