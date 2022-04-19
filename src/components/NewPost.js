import { Box, Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { API_ENDPOINT } from '../config/constants';

const useInput = () => {
  const [value, setValue] = useState();

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return { value, onChange };
};

const NewPost = () => {
  const title = useInput();
  const body = useInput();

  const onPost = (e) => {
    e.preventDefault();
    console.log(title.value, body.value);
    fetch(`${API_ENDPOINT}/posts`);
  };

  return (
    <>
      <Typography m={3} color="secondary" variant="h3" component="h2">
        Create a new post
      </Typography>
      <Box component="form" p={3}>
        <TextField
          label="Title"
          value={title.value}
          onChange={title.onChange}
          required
          sx={{ paddingBottom: '1rem' }}
          fullWidth
          color="secondary"
        />
        <TextField
          label="Content"
          required
          value={body.value}
          onChange={body.onChange}
          multiline
          sx={{ paddingBottom: '1rem' }}
          fullWidth
          minRows={2}
          color="secondary"
        />
        <Button
          type="button"
          color="secondary"
          variant="contained"
          onClick={onPost}
        >
          Post
        </Button>
      </Box>
    </>
  );
};

export default NewPost;
