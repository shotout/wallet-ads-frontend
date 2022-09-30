import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  ctnWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    maxWidth: '100%',
    padding: 20,
    clear: 'both',
    '& > img': {
      width: 240,
      height: 140,
      objectFit: 'contain',
      marginBottom: 20,
    },
    height: '100%',
  },
  ctnFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 20,
    position: 'relative',
  },
  txtDesc: {
    '& > b': {
      fontWeight: 800,
    },
  },
  ctnHeader: {
    marginTop: 10,
    marginLeft: 10,
    '& > img': {
      width: '40%',
      height: 50,
      objectFit: 'contain',
    },
  },
}));
