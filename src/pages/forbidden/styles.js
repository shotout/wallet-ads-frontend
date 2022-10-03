import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  ctnWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    maxWidth: '100%',
    padding: 20,
    height: '100%',

    '& > img': {
      width: '20%',
      height: 'auto',
      objectFit: 'contain',
      marginBottom: 20,
    },

    [theme.breakpoints.down('md')]: {
      '& > img': {
        width: '40%',
        height: 'auto',
        objectFit: 'contain',
        marginBottom: 20,
      },
    },
  },
  ctnFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      height: 100,
    },
  },
  txtDesc: {
    '& > b': {
      fontWeight: 800,
    },
  },
  ctnHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    [theme.breakpoints.down('md')]: {
      '& > img': {
        width: '50%',
        height: 50,
        objectFit: 'contain',
      },
      '& > .menu': {
        '& > img': {
          width: '40%',
          height: 50,
          objectFit: 'contain',
          float: 'right',
        },
      },
    },
  },
  ctnMenuRoot: {
    position: 'absolute',
    top: 0,
    width: '100%',

    backgroundColor: '#fff',
    '& > .close': {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: 10,

      width: '100%',
      fontSize: 20,
    },
  },
  ctnLink: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    '& > a': {
      width: '100%',
      color: '#000',
      textDecoration: 'none',
      padding: 15,
      fontWeight: 'bold',
      fontSize: 15,
    },
  },
}));
