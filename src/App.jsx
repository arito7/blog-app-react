/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import './App.css';
import { Link, Outlet } from 'react-router-dom';
import Appbar from './components/Appbar';

function App() {
  return (
    <div className="App">
      <Appbar />
      <section
        css={css`
          max-width: 960px;
          margin: auto;
        `}
      >
        <Outlet />
      </section>
    </div>
  );
}

export default App;
