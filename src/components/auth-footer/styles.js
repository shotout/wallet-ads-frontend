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
      padding: '10px 20px',
    },
  },
  ctnLink: {
    '& > a': {
      color: '#fff',
      textDecoration: 'none',
      marginRight: 30,
      fontWeight: 'bold',
      fontSize: 15,
      [theme.breakpoints.down('sm')]: {
        marginLeft: 10,
        marginRight: 10,
        display: 'grid',
      },
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: 8,
      display: 'flex',
      justifyContent: 'space-around',
      flexDirection: 'row',
      '& > a': {
        textAlign: 'center',
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
