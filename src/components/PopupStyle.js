import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  ctnRoot: {
    // background: 'red',
    display: 'flex',
    position: 'relative',
  },
  ctnText: {
    display: 'flex',
    flexDirection: 'column',
  },
  ctnBtn: {
    width: 160,
    height: 40,
    border: '1px solid #fff',
  },

  ctnPopover: {
    background: 'rgba(0,0,0,0.3)',
    '& > .MuiPaper-root': {
      maxWidth: 680,
      background: '#fff',
    },
  },
  ctnContentPopup: {
    width: 400,
    height: 400,
  },
}));

export default useStyles;
