import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  ctnWrapper: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
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
    // display: 'none', //just delete this line to show promocode
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    padding: '20px 40px 40px 40px',
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
}));
