import { Box, Typography } from '@mui/material';
import errorPenguinBall from '../../image/penguinBall/transparant/error/00016-970974728.png';
import './Error.scss';

const ErrorPage = () => {
  return (
    <Box id="error-page" className="errorPage">
      <Box>
        <Typography variant="h1">Oops!</Typography>
        <Typography variant="body1">Sorry, You are reaching a not exist page</Typography>
        <img src={errorPenguinBall} className="errorImage" />
      </Box>
    </Box>
  );
};
export default ErrorPage;
