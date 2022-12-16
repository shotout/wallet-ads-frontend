import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  ctnRoot: {
    border: '1px solid #808080',
  },
  btnPicker: {
    backgroundColor: '#7089FF',
    height: 54,
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > img': {
      width: 26,
      height: 26,
      objectFit: 'contain',
      marginRight: 12,
    },
  },
  ctnBanner: {
    background: '#F1F1F1',
    paddingTop: '28%',
    position: 'relative',
    width: '100%',
  },
  bannerItem: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    top: '0px',
    '& > img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  ctnLogo: {
    background: '#D9D9D9',
    width: 100,
    height: 100,
    marginLeft: 20,
    position: 'absolute',
    bottom: -20,
    borderRadius: 10,
    border: '4px solid #fff',
  },
  logoImage: {
    background: '#D9D9D9',
    width: 100,
    height: 100,
    marginLeft: 20,
    position: 'absolute',
    bottom: -20,
    borderRadius: 10,
  },
  ctnDesc: {
    paddingTop: 40,
    marginLeft: 20,
    marginBottom: 20,
  },
}));

export default useStyles;
