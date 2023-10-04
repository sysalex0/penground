import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider } from '@mui/material';
import '../../image/penguinBall/transparant/strange/00009-970974721.png';
// Import the require.context function
const images = require.context('../../image/penguinBall/transparant/strange', true);
const imageList = images.keys().map((image) => images(image));
const randomInt = Math.floor(Math.random() * imageList.length);

const Features = () => {
  return (
    <>
      <List
        sx={{
          bgcolor: 'background.paper',
        }}
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="Penground" src={imageList[randomInt]} />
          </ListItemAvatar>
          <ListItemText
            primary="Penground Cryptography"
            secondary="Using top standard of 6uo encryption and decryption"
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
    </>
  );
};

export default Features;
