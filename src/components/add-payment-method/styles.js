import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  ctnWrapper: {
    overflow: 'hidden',
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    '& > .content': {
      padding: 30,
    },
  },
  ctnPopover: {
    background: 'rgba(0,0,0,0.3)',
    '& > .MuiPaper-root': {
      maxWidth: 680,
      background: 'rgba(0,0,0,0.02)',
      overflowY: 'hidden',
      '&::-webkit-scrollbar': {
        width: 0,
      },
    },
  },
  tr: {
    // position: 'relative',
    // height: '100vh',
    // overflowY: 'hidden',
  },
  ctnPromo: {
    // display: 'none', //just delete this line to show promocode
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    padding: '30px 40px 30px 40px',
    [theme.breakpoints.down('md')]: {
      padding: '10px 40px 0px 40px',
      marginTop: -10,
    },
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
    [theme.breakpoints.down('md')]: {
      marginTop: 0,
      height: 40,
      '& > span': {
        fontSize: 12,
      },
    },
  },
  btnBlack: {
    background: '#000 !important',
    '& > span': {
      color: '#fff',
    },
  },
  header: {
    height: 80,
    display: 'flex',
    justifyContent: 'space-between'
  },
  ctnClose: {
    // position: 'absolute',
    // top: 0,
    // right: 20,
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
    // [theme.breakpoints.down('xl')]: {
    //   width: '100%',
    //   // margin: '0 auto',
    // },
  },
  ctnBold: {
    fontWeight: 'bold',
    fontFamily: 'Public Sans, sans-serif',
  },
}));
