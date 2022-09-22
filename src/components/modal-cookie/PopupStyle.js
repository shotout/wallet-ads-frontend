import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  ctnRoot: {
    // background: 'red',
    display: 'flex',
    position: 'relative',
    alignItems: 'center'
  },
  ctnText: {
    display: 'flex',
    flexDirection: 'column',
    paddingRight: 12,
    flexGrow: 1,
    '& > span':{
      fontSize: 12
    }
  },
  ctnBtn: {
    minWidth: 100,
    height: 28,
    border: '1px solid #fff',
    marginRight: '-20px !important'
  },
  ctnBtnDe:{
    minWidth: 140
  },
  btnManage:{
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    cursor: 'pointer',
    '& > span':{
      fontSize: 12,
      textAlign: 'center',
      // marginBottom: 2,
      fontWeight: '600'
    }
  },
  ctnPopover: {
    background: 'rgba(0,0,0,0.3)',
    padding: 20,
    '& > .MuiPaper-root': {
      maxWidth: 680,
      background: '#fff',
    },
  },
  ctnContentPopup: {
    maxWidth: 520,
    maxHeight: '80%',
    padding: '40px 20px 30px 40px',
    marginLeft: 20,
    marginRight: 40,
  },
}));

export default useStyles;
