import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

// Import the require.context function
const imageContext = require.context('../../image/penguinBall/transparant/strange', true);
const avators = imageContext.keys().map((image) => imageContext(image));

interface FeatureData {
  title: string;
  description: string;
  link: string;
}

const features: FeatureData[] = [
  {
    title: 'Penground Cryptography',
    description: 'Using top standard of 6uo encryption and decryption',
    link: 'cryptography',
  },
  {
    title: 'Home',
    description: 'Random',
    link: '',
  },
];

const Features = () => {
  return (
    <>
      <List
        sx={{
          bgcolor: 'background.paper',
        }}
      >
        {features.map((feature) => {
          const randomNum = Math.floor(Math.random() * avators.length);

          return (
            <div key={feature.title}>
              <Link to={feature.link}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt="Penground" src={avators[randomNum]} />
                  </ListItemAvatar>
                  <ListItemText primary={feature.title} secondary={feature.description} />
                </ListItem>
              </Link>
              <Divider variant="inset" component="li" />
            </div>
          );
        })}
      </List>
    </>
  );
};

export default Features;
