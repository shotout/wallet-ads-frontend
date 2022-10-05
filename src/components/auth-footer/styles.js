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
    padding: 5,

    '& >  a': {
      color: '#fff',
      textDecoration: 'none',
      fontWeight: 'bold',
      fontSize: 14,
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: 8,
      marginTop: 8,
      '& > a': {
        marginTop: 8,
        paddingLeft: 20,
        paddingRight: 20,
        lineHeight: 2,
      },
    },
    [theme.breakpoints.down('lg')]: {
      marginBottom: 8,
      marginTop: 8,
      '& > a': {
        marginTop: 8,
        paddingLeft: 20,
        paddingRight: 20,
        lineHeight: 2,
      },
    },
    [theme.breakpoints.down('xl')]: {
      marginBottom: 8,
      marginTop: 8,
      '& > a': {
        marginTop: 8,
        paddingLeft: 20,
        paddingRight: 20,
        lineHeight: 2,
      },
    },
  },
  ctnBorder: {
    [theme.breakpoints.down('sm')]: {
      borderRight: `1px solid white`,
    },
  },
  ctnHidden: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));
