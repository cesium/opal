import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: '#ffffff',
      },
      secondary: {
        main: '#052c49',
        light: '#437C90',
      },
      orange: {
        main: '#ED7A4E',
      },
      egg: {
        main: '#EDEBD2',
      },
      error: {
        main: red.A400,
      },
      background: {
        default: '#fff',
      },
    },
    navbar: {
      backgroundColor: '#052c49',
      entryBackgroundColor: 'rgba(255,255,255,0.3)',
      textColor: '#fff',
      drawer: {
        backgroundColor: '#052c49',
        textColor: '#fff',
      },
    },
  }),
);

// ENEI 2020 colors:
// Orange: #CF6733
// Dark blue: #052C49
// Aqua blue: #437C90
// Green: #255957
// Egg: #EEEBD3

export default theme;
