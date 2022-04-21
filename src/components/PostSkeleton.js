import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';

function PostSkeleton() {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardHeader
        title={
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
        }
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />

      <CardContent>
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      </CardContent>
    </Card>
  );
}

export default PostSkeleton;
