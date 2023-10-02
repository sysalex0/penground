import { ThemeProvider } from '@mui/material/styles';
import PenguinTheme from './theme/PenguinTheme';
import Cryptography from './cryptography/Cryptography';
import { Box } from '@mui/material';
import SwipeableEdgeDrawer from './global/SwipeableEdgeDrawer';

function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
      }}
    >
      <ThemeProvider theme={PenguinTheme}>
        <Cryptography />
        <SwipeableEdgeDrawer />
      </ThemeProvider>
    </Box>
  );
}

export default App;
