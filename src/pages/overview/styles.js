import { makeStyles } from '@mui/styles';
import { NAVBAR } from '../../config';

export default makeStyles((theme) => ({
  ctnRoot: {
    position: 'relative',
    background: '#fff',
    paddingBottom: 60,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('xl')]: {
      paddingRight: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
    },
    [theme.breakpoints.down('xl')]: {
      paddingRight: 20,
    },
  },
  ctnWrapper: {
    maxWidth: '1366px',
    margin: 'auto',
    backgroundColor: '#E4E6FA',
    // padding: 20,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    boxShadow: '0px 10px 20px rgba(114, 125, 196, 0.5)',
    width: '100%',
  },
  ctnContent: {
    background: '#D0D4EF',
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  ctnContent2: {
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  ctnCard: {
    background: '#fff',
    padding: 20,
    borderRadius: 20,

    boxShadow: '0px 10px 20px rgba(114, 125, 196, 0.5)',
  },
  ctnTitle: {
    paddingBottom: 12,
    marginBottom: 20,
    borderBottom: '1px solid #BDBDBD',
  },
  ctnItem: {
    marginTop: 20,
    borderTop: '1px solid #BDBDBD',
    paddingTop: 20,
  },
  ctnStatusItem: {
    display: 'flex',
    alignItems: 'center',
  },
  leftStatusItem: {
    width: 120,
    display: 'flex',
    alignItems: 'center',
  },
  ctnStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 8 / 2,
    background: '#E83155',
    marginRight: 8,
  },
  ctnDownload: {
    width: 20,
    height: 20,
  },
  greenBg: {
    background: '#71CE62',
  },
  ctnIconShort: {
    '& > img': {
      width: 15,
      height: 15,
      objectFit: 'contain',
      marginLeft: 4,
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  txtCampaignName: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
  },
  ctnPopoverBlack: {
    '& > .MuiPaper-root': {
      background: 'rgba(0, 0, 0,0.9)',
      boxShadow: ' rgba(0, 0, 0, 0.1) 0px 10px 15px -10px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    },
  },
  ctnPopoverWhite: {
    '& > .MuiPaper-root': {
      borderRadius: 0,
      background: '#fff',
      boxShadow: ' rgba(0, 0, 0, 0.1) 0px 10px 15px -10px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    },
  },
  ctnSelect: {
    width: '50%',
    backgroundColor: '#F1F1F1',
  },
  btnExportToExcel: {
    width: `40% !important`,
    float: 'right',
  },
  bannerContainer: {
    width: '100%',
    marginTop: -40,
    marginBottom: -100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  p20: {
    padding: 20,
  },
  statusContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& > div > img': {
      width: 40,
      height: 40,
      marginRight: 20,
      backgroundColor: '#F1F1F1',
      borderRadius: 8,
    },
  },
  leftTitle: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    '& > img': {
      width: 16,
      height: 16,
      objectFit: 'contain',
      marginLeft: 8,
      cursor: 'pointer',
    },
    '& > div': {
      position: 'relative',
    },
  },
  paginationContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    '& > span': {
      marginLeft: 20,
      cursor: 'pointer',
    },
  },
  isPaginateActive: {
    fontWeight: 'bolder',
    color: '#8C65CC',
  },
  imageProver: {
    padding: 0,
    marginBottom: 10,
    marginTop: 10,
    '& > img': {
      width: 150,
      aspectRatio: 1,
      borderRadius: 10,
    },
  },
  ctnEmptyData: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 25,
    // borderTop: '1px solid #BDBDBD',
    marginTop: 20,
  },
  adtextContainer: {
    overflowY: 'hidden',
    paddingLeft: 2,
    paddingRight: 2,
    marginBottom: 3,
  },
  titleOnModal: {
    marginTop: 5,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    // Addition lines for 2 line or multiline ellipsis
    display: '-webkit-box !important',
    whiteSpace: 'normal',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',

    // &::-webkit-line-clamp: vertical;
    // white-space: normal;
  },
}));
