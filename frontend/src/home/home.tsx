import { Box, Typography } from '@mui/material';
import Cryptography from '../cryptography/Cryptography';

const pengrounds = [Cryptography];
// Get the current date
const currentDate = new Date().toDateString();
const numericDate = Number(new Date(currentDate));
// Use the numeric date to generate a random number
const randomNum = Math.floor(Math.abs(Math.sin(numericDate)) * pengrounds.length);
const DailyRandomPenground: React.ComponentType<unknown> = pengrounds[randomNum];

const Home = () => (
  <Box sx={{ textAlign: 'center', pt: 10 }}>
    <Typography variant="h1">Daily Random Penground Home</Typography>
    {<DailyRandomPenground />}
  </Box>
);

export default Home;
