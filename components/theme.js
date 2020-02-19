import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: '#052C49', // dark blue
        mainRGB: '5,44,73',
      },
      secondary: {
        main: '#437C90', // aqua blue
        mainRGB: '67,124,144',
      },
      text: {
        title: 'white',
        body: 'white',
      },
      icons: 'white',
      error: {
        main: red[900],
      },
      background: {
        default: '#fff',
      },
    },
    navbar: {
      entryBackgroundColor: 'rgba(255,255,255,0.3)',
      textColor: '#fff',
    },
  }),
);

// ENEI 2020 colors:
// Orange: #CF6733
//  207,103,51
// Dark blue: #052C49
//  5,44,73
// Aqua blue: #437C90
//  67,124,144
// Green: #255957
//  37,89,87
// Egg: #EEEBD3
//  238,235,211

export default theme;
