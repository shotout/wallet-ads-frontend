import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  ctnAds: {
    position: 'relative',
  },
  cardAds: {
    backgroundColor: '#fff',
    boxShadow: '0px 10px 20px rgba(114, 125, 196, 0.5)',
    width: '100%',
    height: '100%',
    marginLeft: 20,
    padding: 10,
    borderRadius: 20,
    marginBottom: 40,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 400,
    overflow: 'hidden',
  },
  cardBanner: {
    width: '100%',
    height: 150,
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
    '& > img': {
      width: '100%',
      height: '100%',
      borderRadius: 10,
      //   objectFit: 'contain',
      //   objectPosition: 'center',
    },
  },
  audienceContainer: {
    display: 'flex',
    marginBottom: 5,
  },
  adtextContainer: {
    minHeight: 120,
    overflowY: 'auto',
  },
}));
