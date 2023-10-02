import { createTheme } from '@mui/material/styles';

const PenguinTheme = createTheme({
  palette: {
    primary: {
      main: '#2979FF', // Icy blue color for primary
      dark: '#1565C0', // Darker shade of blue
      light: '#BBDEFB', // Lighter shade of blue
    },
    secondary: {
      main: '#FF4081', // Vibrant pink color for secondary
      dark: '#D50000', // Darker shade of pink
      light: '#FF80AB', // Lighter shade of pink
    },
    background: {
      default: '#FFFFFF', // Snow white background color
      paper: '#F2F2F2', // Light gray color for paper/background elements
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    fontSize: 16,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#333333', // Dark gray color for heading
    },
    // Add any other typography styles you want to customize
  },
  shape: {
    borderRadius: 8, // Rounded corners for components
  },
  // Add any other customizations you want for the theme

  spacing: 4,
});

export default PenguinTheme;
