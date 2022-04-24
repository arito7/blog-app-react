import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import Post from '../components/Post';
import { ExpandMoreRounded } from '@mui/icons-material';
import { useUserPosts } from '../hooks/postHook';

const User = () => {
  const auth = useAuth();
  const { userposts, update } = useUserPosts(auth.user._id);

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
              {userposts?.filter((post) => !post.published).length}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul>
              {userposts
                ?.filter((post) => !post.published)
                ?.map((post) => (
                  <Post post={post} updatePosts={update} key={post._id} />
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
              {userposts?.filter((post) => post.published).length}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul>
              {userposts
                ?.filter((post) => post.published)
                ?.map((post) => (
                  <Post post={post} updatePosts={update} key={post._id} />
                ))}
            </ul>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default User;
