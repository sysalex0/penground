import { ThemeProvider } from '@mui/material/styles';
import PenguinTheme from './theme/PenguinTheme';
import SwipeableEdgeDrawer from './ui_component/global/bottomDrawer/SwipeableEdgeDrawer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import DailyRandomHomePage from './ui_component/home/DailyRandomHomePage';
import CryptographyPage from './ui_component/cryptography/CryptographyPage';
import ErrorPage from './ui_component/error/ErrorPage';
import AboutPage from './ui_component/about/AboutPage';

function App() {
  return (
    <>
      <ThemeProvider theme={PenguinTheme}>
        <BrowserRouter>
          <div className="page-common">
            <Routes>
              <Route path="/" element={<DailyRandomHomePage />} />
              <Route path="cryptography" element={<CryptographyPage />} />
              <Route path="about" element={<AboutPage />} />
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
