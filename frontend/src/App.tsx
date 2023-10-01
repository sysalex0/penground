import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import PenguinTheme from './theme/penguin';
import Cryptography from './cryptography/Cryptography';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={PenguinTheme}>
        <Cryptography />
      </ThemeProvider>
    </div>
  );
}

export default App;
