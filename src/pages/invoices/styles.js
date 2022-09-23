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
        boxShadow: '0px 10px 20px rgba(114, 125, 196, 0.5)',
        width: '100%',
    },
    ctnContent:{
        background: '#D0D4EF',
        padding: 20,
        borderRadius: 20,
        minHeight: '64vh'
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
    ctnItem:{
        marginTop: 20,
        borderTop: '1px solid #BDBDBD',
        paddingTop: 20,
    },
    ctnStatusItem:{
        display: 'flex',
        alignItems: 'center',
    },
    leftStatusItem: {
        width: 120,
        display: 'flex',
        alignItems: 'center',
    },
    ctnStatusDot:{
        width: 8,
        height: 8,
        borderRadius: 8 / 2,
        background: '#E83155',
        marginRight: 8
    },
    ctnDownload:{
        width: 20,
        height: 20,
    },
    greenBg:{
        background: '#71CE62'
    },
    ctnIconShort:{
        '& > img':{
            width: 20,
            height: 20,
            objectFit: 'contain',
            marginLeft: 4
        },
        cursor: 'pointer'
    },
    txtCampaignName:{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 1,
    }
}))