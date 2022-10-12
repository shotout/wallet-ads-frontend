import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  ctnBtn: {
    width: '100%',
    background: '#7089FF',
    height: 44,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 8,
    cursor: 'pointer',
    '& > span': {
      textAlign: 'center',
      color: '#fff',
      fontFamily: 'Public Sans,sans-serif',
      fontSize: 16,
      fontWeight: 'bold',
    },
    '& > .MuiCircularProgress-colorPrimary': {
      color: '#fff',
    },
    border: 0,
  },
  ctnDisableButton: {
    backgroundColor: '#bdc3c7 !important',
    cursor: 'not-allowed !important',
    '& > span': {
      textAlign: 'center',
      backgroundColor: '#bdc3c7 !important',
      color: '#7f8c8d !important',
      fontFamily: 'Public Sans,sans-serif',
      fontSize: 16,
      fontWeight: 'bold',
    },
  },
}));
