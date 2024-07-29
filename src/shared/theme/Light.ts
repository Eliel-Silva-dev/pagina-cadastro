import { createTheme } from '@mui/material';
import { cyan, orange } from '@mui/material/colors';

export const LightTheme = createTheme({
  palette: {
    primary: { // cor aplicada a botões e lugares com mais destaque. main, dark, light, contraste são variações.
      main: orange[700],
      dark: orange[800],
      light: orange[500],
      contrastText: '#ffffff',
    },
    secondary:{ // aplicado a autocomplite
      main: cyan[700],
      dark: cyan[800],
      light: cyan[500],
      contrastText: '#ffffff',
    },
    background: {
      paper: '#ffffff', // usando para estilizar o fundo dos cards.
      default: '#f7f6f3' // usado para estilizar o fundo das paginas.
    }
  }
});