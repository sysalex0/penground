import { ThemeProvider } from '@mui/material/styles';
import PenguinTheme from './theme/PenguinTheme';
import SwipeableEdgeDrawer from './global/bottomDrawer/SwipeableEdgeDrawer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './home/home';
import Cryptography from './cryptography/Cryptography';

function App() {
  return (
    <>
      <ThemeProvider theme={PenguinTheme}>
        <BrowserRouter>
          <div className="page-common">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="cryptography" element={<Cryptography />} />
            </Routes>
          </div>
          <SwipeableEdgeDrawer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
