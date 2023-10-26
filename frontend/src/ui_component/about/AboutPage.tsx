import { Box, Typography } from '@mui/material';
import homePenguinBall from '../../image/penguinBall/transparant/cute/home_ball.png';
import './About.scss';

const AboutPage = () => {
  return (
    <Box id="about-page" className="aboutPage">
      <Box>
        <Typography variant="h1">Penground means Penguin Playground</Typography>
        <Typography variant="body1">Penguins play anything fun here.</Typography>
        <Typography variant="body2">I am a cute coding penguin!</Typography>
        <img src={homePenguinBall} className="aboutImage" />
      </Box>
    </Box>
  );
};

export default AboutPage;
