import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  ctnRoot: {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
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
    marginLeft: 100,
    maxWidth: 420,
    width: '100%',
    boxShadow: '0px 10px 20px rgba(114, 125, 196, 0.5)',
    borderRadius: 28,
    padding: 20,
    background: '#E4E6FA',
    marginBottom: 80,
  },
  ctnTitle: {
    marginBottom: 20,
  },
  ctnForm: {
    '& $inputWrapper': {
      marginBottom: 20,
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
      '& > .MuiInputLabel-root.Mui-focused': {
        color: '#7089FF !important',
      },
    },
  },
  btnStyle: {
    height: 44,
    backgroundColor: '#7089FF',
    width: '100%',
    color: '#fff',
    '& span': {
      backgroundColor: '#7089FF !important',
    },
  },
  ctnForgotPassword: {
    marginBottom: 30,
    marginTop: 12,
    width: '100%',
    textAlign: 'right',
    '& > span': {
      fontSize: 15,
      textDecoration: 'underline',
      fontFamily: 'Public Sans,sans-serif',
    },
  },
  ctnDirectRegister: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
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
  ctnRedBox: {
    marginBottom: 20,
    background: '#AD4061',
    padding: 12,
    borderRadius: 12,
  },
  ctnGreenBox: {
    marginBottom: 20,
    background: '#1FCB96',
    padding: 12,
    borderRadius: 12,
  },
  ctnTextNote: {
    marginBottom: 20,
  },
}));
