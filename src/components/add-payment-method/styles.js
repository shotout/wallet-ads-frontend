import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  ctnWrapper: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    justifyContent: 'center',
    '& > .content': {
      padding: 30,
    },
  },
  ctnPopover: {
    background: 'rgba(0,0,0,0.3)',
    '& > .MuiPaper-root': {
      maxWidth: 680,
      background: '#fff',
    },
  },
  ctnPromo: {
    display: 'none', //just delete this line to show promocode
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    padding: '30px 40px 30px 40px',
  },
  ctnGroup: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: '100%',
  },
  ctnInput: {
    width: '100%',
    height: '100%',
    border: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    '& fieldset': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      color: 'black',
    },
  },
  ctnApply: {
    height: '100%',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    width: '40%',
    border: 0,
  },
  btnStyle: {
    marginTop: 12,
    height: 80,
    '& > span': {
      fontSize: 20,
    },
  },
  btnBlack: {
    background: '#000 !important',
    '& > span': {
      color: '#fff',
    },
  },
  ctnClose: {
    position: 'absolute',
    top: 30,
    right: 20,
    cursor: 'pointer',
  },
  ctnLink: {
    color: '#7089FF',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  ctnCancel: {
    color: '#808080',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: 18,
    marginLeft: 13,
    // fontWeight: 'bold',
    fontFamily: 'Public Sans, sans-serif',
  },
  ctnBackgroundBlue: {
    backgroundColor: '#CACCED',
  },
  ctnBackgroundSuccess: {
    backgroundColor: '#1FCB96',
  },
  ctnErrTextWrapper: {
    height: 25,
  },
  ctnErrText: {
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 5,
  },
  ctnPromoText: {
    marginTop: -20,
  },
  ccStyle: {
    width: '100%',
    alignSelf: 'center',
    [theme.breakpoints.down('md')]: {
      width: '50%',
      margin: '0 auto',
    },
  },
  ctnBold: {
    fontWeight: 'bold',
    fontFamily: 'Public Sans, sans-serif',
  },
}));
