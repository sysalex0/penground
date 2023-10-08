import { ThemeProvider } from '@mui/material/styles';
import PenguinTheme from './theme/PenguinTheme';
import SwipeableEdgeDrawer from './global/bottomDrawer/SwipeableEdgeDrawer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import DailyRandomHomePage from './home/DailyRandomHomePage';
import CryptographyPage from './cryptography/CryptographyPage';
import ErrorPage from './error/ErrorPage';

function App() {
  return (
    <>
      <ThemeProvider theme={PenguinTheme}>
        <BrowserRouter>
          <div className="page-common">
            <Routes>
              <Route path="/" element={<DailyRandomHomePage />} />
              <Route path="cryptography" element={<CryptographyPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
          <SwipeableEdgeDrawer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
