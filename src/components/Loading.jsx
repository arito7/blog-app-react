/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { useState } from 'react';

const Loading = () => {
  const [isLoading, setLoading] = useState(false);
  const component = isLoading ? (
    <div
      css={css`
        position: absolute;
        display: grid;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: 1;
        background-color: #aaaaaa45;
      `}
    >
      <img
        src="images/loading-blocks.svg"
        alt="Loading"
        srcset=""
        width={75}
        height={75}
      />
    </div>
  ) : null;

  return { setLoading, component };
};

export default Loading;
