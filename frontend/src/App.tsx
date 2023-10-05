import { ThemeProvider } from '@mui/material/styles';
import PenguinTheme from './theme/PenguinTheme';
import Cryptography from './cryptography/Cryptography';
import SwipeableEdgeDrawer from './global/bottomDrawer/SwipeableEdgeDrawer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './home/home';

function App() {
  return (
    <>
      <ThemeProvider theme={PenguinTheme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="cryptography" element={<Cryptography />} />
          </Routes>
          <SwipeableEdgeDrawer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
