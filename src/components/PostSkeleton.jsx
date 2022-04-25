import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';

function PostSkeleton() {
  return (
    <Card sx={{ m: 1 }}>
      <CardHeader
        title={
          <Skeleton animation="pulse" height={10} style={{ marginBottom: 6 }} />
        }
        subheader={<Skeleton animation="pulse" height={10} width="40%" />}
      />

      <CardContent>
        <Skeleton
          sx={{ height: 190 }}
          animation="pulse"
          variant="rectangular"
        />
      </CardContent>
    </Card>
  );
}

export default PostSkeleton;
