import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    ctnRoot: {
        position: 'relative',
        background: '#fff',
        minHeight: '98vh',
        paddingBottom: 80,
        width: '100%'
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
    }
}))