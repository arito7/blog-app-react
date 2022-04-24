import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import Post from '../components/Post';
import { useUserPublicPosts } from '../hooks/postHook';

const User = () => {
  const params = useParams();
  const { publicPosts, user, updatePublicPosts } = useUserPublicPosts(
    params.id
  );
  return (
    <Box p="1rem">
      <Box mb="1rem">
        <Typography textAlign="left" variant="h4" component="h2">
          Posts by {user?.username}
        </Typography>
      </Box>
      {publicPosts?.map((post) => (
        <Post post={post} />
      ))}
    </Box>
  );
};

export default User;
