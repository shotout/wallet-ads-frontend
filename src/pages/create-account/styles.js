import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  ctnRoot: {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  centerPosition: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '85vh',
  },
  bgGradation: {
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(203, 180, 223, 0.5) 100%)',
  },
  bgImage: {
    backgroundImage: 'url("/assets/auth_bg.png")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
  },
  ctnHeader: {
    marginTop: 30,
    marginLeft: 100,
    marginBottom: 30,
    '& > img': {
      width: 220,
      height: 50,
      objectFit: 'contain',
    },
  },
  ctnInput: {
    maxWidth: 620,
    width: '100%',
    boxShadow: '0px 10px 20px rgba(114, 125, 196, 0.5)',
    borderRadius: 28,
    padding: 20,
    background: '#E4E6FA',

    overflow: 'hidden',
    [theme.breakpoints.up('md')]: {
      marginBottom: 80,
      marginLeft: 100,
    },
    [theme.breakpoints.down('md')]: {
      marginBottom: 150,
    },
  },
  ctnTitle: {
    marginBottom: 40,
  },
  ctnForm: {
    marginBottom: 30,
    // paddingLeft: 20,
    '& > .MuiGrid-container': {
      '& > .MuiGrid-item': {
        // paddingLeft: '0px !important'
        // '& > .Mui-error':{
        //     marginLeft: '0px !important'
        // }
      },
    },
  },
  inputWrapper: {
    '& > .MuiFormControl-root': {
      '& > .MuiOutlinedInput-root': {
        backgroundColor: '#fff',
        // '& > .Mui-focused':{
        '& > .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
      },
      '& > .MuiFormLabel-root': {
        // fontSize: 14
      },
      '& > .MuiInputLabel-root.Mui-focused': {
        color: '#7089FF !important',
      },
    },
  },
  btnStyle: {
    height: 44,
    backgroundColor: '#7089FF',
    maxWidth: 320,
    margin: 'auto',
    width: '100%',
    color: '#fff',
    '& span': {
      backgroundColor: '#7089FF !important',
    },
  },
  ctnDirectRegister: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 20,
    '& > span': {
      fontFamily: 'Public Sans,sans-serif',
      marginRight: 6,
    },
    '& > div': {
      cursor: 'pointer',
      '& > a': {
        fontFamily: 'Public Sans,sans-serif',
        color: '#7089FF',
        textDecoration: ' underline',
      },
    },
  },
  ctnSuccess: {
    margin: 'auto',
    padding: '40px 0px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& > img': {
      width: 100,
      height: 96,
      objectFit: 'contain',
    },
  },
  ctnGridBottom: {
    paddingTop: 20,
    marginTop: 20,
    borderTop: '1px solid #fff',
    paddingLeft: 20,
    width: '100%',
  },
  ctnMobileHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 30,
    [theme.breakpoints.down('md')]: {
      '& > img': {
        width: '50%',
        height: 50,
        objectFit: 'contain',
      },
      '& > .menu': {
        '& > img': {
          marginTop: 15,
          width: '80%',
          height: 'auto',
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
    zIndex: 10,
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
