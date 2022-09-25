import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  ctnRoot: {
    // background: 'red',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    [theme.breakpoints.down('md')]:{
      flexDirection: 'column'
    }
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
    marginRight: '-20px !important',
    [theme.breakpoints.down('md')]:{
      position: 'absolute',
      bottom: -58,
      marginLeft: 60,
    }
  },
  ctnBtnDe:{
    minWidth: 140,
    [theme.breakpoints.down('md')]:{
      marginLeft: 100
    }
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
  ctnRootTop:{
    position: 'relative',
    [theme.breakpoints.down('md')]:{
      '& > div':{
        '& > div:last-child':{
          // background: 'red',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingRight: 100
        }
      }
    }
  },
  ctnRootDe:{
    [theme.breakpoints.down('md')]:{
      '& > div':{
        '& > div:last-child':{
          // background: 'red',
          paddingRight: 130
        }
      }
    }
  },
}));

export default useStyles;
