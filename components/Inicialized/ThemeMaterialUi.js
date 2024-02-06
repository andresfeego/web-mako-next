import { createTheme } from '@mui/material/styles';


export const customTheme = createTheme({
    components: {
      MuiButtonBase: {
        defaultProps: {
            style:{
                color: '#414042',
                backgroundColor: '#ffcc29',
                width: '260px', 
                fontSize: '25px',    
                marginTop: '48px',
                display: 'flex' ,
                borderRadius: '2vw' 

            }
        },
      },
    },
  });
  