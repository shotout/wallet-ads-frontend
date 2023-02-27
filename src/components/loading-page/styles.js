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
  modalWrapper: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 50,
  },
  ctnPopover: {
    background: 'rgba(255,255,255,0.7)',
    zIndex: 20000,
    '& > .MuiPaper-root': {
      background: 'rgba(255,255,255,0)',
      borderRadius: '0',
      boxShadow: '0px 0px 0px 0px rgba(0,0,0,0.7)',
      overflow: 'hidden',
      '&::-webkit-scrollbar': {
        width: 0,
      },
    },
  },
  tr: {
    position: 'relative',
    height: '100vh',
    overflowY: 'hidden',
  },
}));
