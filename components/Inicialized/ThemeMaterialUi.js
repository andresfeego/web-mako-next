import { createMuiTheme } from '@material-ui/core/styles';

export const customTheme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        color: '#414042',
        backgroundColor: '#ffcc29',
        width: '260px',
        fontSize: '25px',
        marginTop: '48px',
        display: 'flex',
        borderRadius: '50px',
        textTransform: 'none', // opcional: evita que el texto esté en mayúscula
      }
    }
  },
  palette: {
    primary: {
      main: '#34C1BB',
    },
  },
});
