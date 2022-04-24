/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { Backdrop, CircularProgress } from '@mui/material';
import { useState } from 'react';

const Loading = () => {
  const [isLoading, setLoading] = useState(false);
  const component = isLoading ? (
    <Backdrop open={isLoading} sx={{ zIndex: 10 }}>
      <CircularProgress color="secondary" />
    </Backdrop>
  ) : null;

  return { setLoading, component };
};

export default Loading;
