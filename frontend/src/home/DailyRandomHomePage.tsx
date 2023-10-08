import { Box, Typography } from '@mui/material';
import CryptographyPage from '../cryptography/CryptographyPage';

const pengrounds = [CryptographyPage];
// Get the current date
const currentDate = new Date().toDateString();
const numericDate = Number(new Date(currentDate));
// Use the numeric date to generate a random number
const randomNum = Math.floor(Math.abs(Math.sin(numericDate)) * pengrounds.length);
const DailyRandomPenground: React.ComponentType<unknown> = pengrounds[randomNum];

const DailyRandomHomePage = () => (
  <Box id="daily-random-home" sx={{ pt: 6 }}>
    <Typography variant="h1">Daily Random Penground Home</Typography>
    {<DailyRandomPenground />}
  </Box>
);

export default DailyRandomHomePage;
