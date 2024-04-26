import { createTheme } from '@mui/material/styles';
import {  } from '@mui/material/';


export const customTheme = createTheme({
    components: {
      MuiButton: {
        defaultProps: {
            style:{
                color: '#414042',
                backgroundColor: '#ffcc29',
                width: '260px', 
                fontSize: '25px',    
                marginTop: '48px',
                display: 'flex' ,
                borderRadius: '50px' 

            }
        },
      },
    },
    palette: { 
      primary: {
          main: '#34C1BB',
      },
  },
  });
  