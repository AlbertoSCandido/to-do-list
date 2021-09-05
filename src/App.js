import './App.css';
import GloblalContext from './context/GloblalContext';
import Home from './pages/Home';

function App() {
  return (
    <GloblalContext>
      <Home />
    </GloblalContext>
  );
}

export default App;
