import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  ctnLine: { 
    paddingBottom: 6,
    marginBottom: 6,
    borderBottom: '1px solid #BDBDBD',
  },
  ctnLine2: { 
    paddingBottom: 6,
    marginBottom: 6,
    borderBottom: '3px solid #2f3640',
  },
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
      objectFit: 'cover',
      objectPosition: 'center',
    },
  },
  audienceContainer: {
    display: 'flex',
    marginBottom: 5,
  },
  adtextContainer: {
    maxHeight: 120,
    minHeight: 120,
    overflowY: 'auto',
    paddingLeft: 2,
    paddingRight: 10,
    marginBottom: 15,
    '&::-webkit-scrollbar': {
      width: '0.9em',
      backgroundColor: 'rgba(217, 217, 217, 0.5)',
      borderRadius: 10,
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(128, 128, 128, 0.7)',
      borderRadius: 10,
    },
  },
  ctnDivider: {
    height: 1,
    backgroundColor: '#7589FA',
    marginBottom: 10,
  },
  audienceWrapper: {
    maxHeight: 70,
    minHeight: 70,
    overflowY: 'auto',
    paddingLeft: 2,
    paddingRight: 10,
    marginBottom: 15,
    '&::-webkit-scrollbar': {
      width: '0.9em',
      backgroundColor: 'rgba(217, 217, 217, 0.5)',
      borderRadius: 10,
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(128, 128, 128, 0.7)',
      borderRadius: 10,
    },
  },
}));
