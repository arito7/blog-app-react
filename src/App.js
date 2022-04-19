import './App.css';
import { Link, Outlet } from 'react-router-dom';
import ResponsiveAppBar from './components/ResponsiveAppbar';
function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <Outlet />
    </div>
  );
}

export default App;
