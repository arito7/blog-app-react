import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuth } from '../App';
import { getUserPosts } from '../config/helpers';
import Post from '../components/Post';
import { ExpandMoreRounded } from '@mui/icons-material';

const User = () => {
  const auth = useAuth();
  const [posts, setPosts] = useState(null);
  console.log(auth.user._id);

  useEffect(() => {
    getUserPosts(auth.user._id)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <Grid container p="2rem">
      <Grid item xs={12}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreRounded />}>
            <Typography textAlign="left" sx={{ width: '40%', flexShrink: 0 }}>
              Profile
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {auth.user.username}
            </Typography>
          </AccordionSummary>
          <AccordionDetails></AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreRounded />}>
            <Typography textAlign="left" sx={{ width: '40%', flexShrink: 0 }}>
              Unpublished Posts
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {posts?.filter((post) => !post.published).length}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul>
              {posts
                ?.filter((post) => !post.published)
                ?.map((post) => (
                  <Post post={post} key={post._id} />
                ))}
            </ul>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreRounded />}>
            <Typography textAlign="left" sx={{ width: '40%', flexShrink: 0 }}>
              Published Posts
            </Typography>{' '}
            <Typography sx={{ color: 'text.secondary' }}>
              {posts?.filter((post) => post.published).length}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul>
              {posts
                ?.filter((post) => post.published)
                ?.map((post) => (
                  <Post post={post} key={post._id} />
                ))}
            </ul>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default User;
