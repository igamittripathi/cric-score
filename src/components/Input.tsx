import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import { InputBase } from '@material-ui/core';

export const Input = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3)
      }
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      marginRight: 1,
      width: '200px',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
      '&:valid':{
        '&:focus': {
          borderColor: 'green',
          boxShadow: '0 0 0 0.1rem rgba(200, 243, 164, 0.25)'
        }
      },
      '&:invalid': {
        '&:focus': {
          borderColor: 'red',
          boxShadow: '0 0 0 0.1rem rgba(255, 26, 68, 0.25)'
        }
      }
    },
  }),
)(InputBase);
