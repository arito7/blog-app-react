import Post from '../components/Post';
import PostSkeleton from '../components/PostSkeleton';
import { Box } from '@mui/material';
import { usePosts } from '../hooks/postHook';

const Home = () => {
  const { posts, updatePosts } = usePosts();

  return (
    <div>
      <Box
        component="ul"
        sx={{
          display: 'grid',
          gap: '1rem',
          padding: '1rem',
          maxWidth: 900,
          margin: 'auto',
        }}
      >
        {posts ? (
          posts.map((post) => {
            return <Post post={post} key={post._id} />;
          })
        ) : (
          <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </>
        )}
      </Box>
    </div>
  );
};

export default Home;
