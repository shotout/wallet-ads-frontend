import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  ctnRoot: {
    background: '#7089FF',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 100px',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      padding: '10px 0px',
    },
  },
  ctnLink: {
    textAlign: 'center',
    '& >  a': {
      color: '#fff',
      textDecoration: 'none',
      fontWeight: 'bold',
      fontSize: 14,
      borderRight: `1px solid white`,
      paddingLeft: 15,
      paddingRight: 15,
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: 8,
      marginTop: 8,
      '& > a': {
        marginTop: 8,
      },
    },
  },

  ctnHidden: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));
