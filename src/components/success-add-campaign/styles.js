import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  ctnWrapper: {
    width: 680,
    height: 490,
    overflow: 'hidden',
  },
  ctnPopover: {
    background: 'rgba(0,0,0,0.3)',
    '& > .MuiPaper-root': {
      width: 680,
      position: 'relative',
      background: 'transparent',
      margin: '20vh auto 0',
      overflow: 'hidden',
    },
  },
  ctnBackground: {
    position: 'absolute',
    width: '101%',
    height: 440,
    zIndex: 1,
    '& > img': {
      width: '100%',
      objectFit: 'contain',
      bottom: 0,
    },
    bottom: -6,
    left: -3,
  },
  ctnContent: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 99,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '30px 30px 20px 30px',
  },
  ctnBtnCampaign: {
    background: 'rgba(255,255,255,0.4)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    borderRadius: 12,
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 20,
    cursor: 'pointer',
  },
  ctnClose: {
    position: 'absolute',
    bottom: 300,
    right: 20,
    cursor: 'pointer',
  },
}));
