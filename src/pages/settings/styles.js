import { makeStyles } from '@mui/styles';
import { NAVBAR } from '../../config';

export default makeStyles((theme) => ({
    ctnOption: {
      width: 30,
      height: 30,
      cursor: 'pointer'
    },
    ctnCvc: {
      marginTop: 28,
    },
    ctnCardSet: {
      position: 'absolute',
      right: -120,
      paddingTop: 34,
      zIndex: 1
    },
    btnBlack: {
      background: '#000 !important',
      '& > span': {
        color: '#fff',
      },
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
    forgotPassword: {
      cursor: 'pointer'
    },
    tr: {
      position: 'relative',
      height: '100vh',
      overflowY: 'hidden',
    },
    ctnWrapperPopup: {
        maxWidth: '1366px',
        margin: 'auto',
        backgroundColor: 'white',
        padding: 20,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 20,
        marginLeft: 20,
        marginRight: 20,
        width: '100%',
        boxShadow: '0px 10px 20px rgba(114, 125, 196, 0.5)',
    },
    header: {
      height: 80,
      display: 'flex',
      justifyContent: 'space-between',
    },
    ctnClose: {
      // position: 'absolute',
      // top: 0,
      // right: 20,
      cursor: 'pointer',
    },
    ctnPopover: {
      background: 'rgba(0,0,0,0.3)',
      '& > .MuiPaper-root': {
          maxWidth: 680,
          background: 'rgba(0,0,0,0.0)',
          overflowY: 'hidden',
          '&::-webkit-scrollbar': {
          width: 0,
          },
      },
    },
    ctnGridRadius: {
        border: '1px solid #808080',
        borderRadius: 12,
        height: 34,
        padding: 2,
        paddingRight: 50,
        paddingLeft: 50,
        cursor: 'pointer',
        marginTop: 10,
        marginLeft: 40
    },
    changePassword: {
        paddingTop: 32,
        position: 'absolute',
        left: '42%',
        cursor: 'pointer'
    },
    ctnRoot: {
        position: 'relative',
        background: '#fff',
        paddingBottom: 60,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.up('xl')]:{
            paddingRight: NAVBAR.DASHBOARD_COLLAPSE_WIDTH
        },
        [theme.breakpoints.down('xl')]:{
            paddingRight: 20
        }
    },
    ctnWrapper: {
        maxWidth: '1366px',
        margin: 'auto',
        backgroundColor: '#E4E6FA',
        padding: 20,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 20,
        marginLeft: 20,
        marginRight: 20,
        width: '100%',
        boxShadow: '0px 10px 20px rgba(114, 125, 196, 0.5)',
    },
    ctnContent:{
        background: '#D0D4EF',
        padding: 20,
        borderRadius: 20,
    },
    ctnCard:{
        background: '#fff',
        padding: 20,
        borderRadius: 20,
        boxShadow: '0px 10px 20px rgba(114, 125, 196, 0.5)'
    },
    ctnTitle:{
        paddingBottom: 12,
        marginBottom: 20,
        borderBottom: '1px solid #BDBDBD'
    },
    inputWrapper:{
        '& > .MuiFormControl-root':{
            '& > .MuiOutlinedInput-root':{
                backgroundColor: '#F1F1F1',
                // '& > .Mui-focused':{
                '& > .MuiOutlinedInput-notchedOutline':{
                    border: 'none'
                }
            },
            '& > .MuiFormLabel-root':{
                // fontSize: 14
            },
            '& > .MuiInputLabel-root.Mui-focused':{
                color: '#7089FF !important',
            }
        },
        '& > .MuiInputLabel-root':{
            fontSize: 20,
            color: '#000'
        }
    },
    ctnProfilePicture:{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    btnSave:{
        marginTop: 40
    },

    ctnGridBottom:{
        paddingTop: 20,
        marginTop: 20,
        borderTop: '1px solid #B3B3B3',
        paddingLeft: 20,
        width: '100%'
    }
}))