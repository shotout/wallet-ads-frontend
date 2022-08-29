import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    ctnRoot: {
        background: '#F1F1F1',
        boxShadow: '0px 10px 20px rgba(114, 125, 196, 0.5)',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        padding: 20,
        borderRadius: 20
    },
    ctnMainContent:{
        display: 'flex'
    },
    ctnLeftContent: {
        display: 'flex',
        flexDirection:'column',
        flexGrow: 1
    },
    ctnCard: {
        background: '#fff',
        boxShadow: '0px 10px 20px rgba(114, 125, 196, 0.5)',
        marginRight: 20,
        marginBottom: 20,
        padding: 20,
        paddingLeft: 0,
        borderRadius: 20,
    },
    ctnHeader: {
        display: 'flex',
        alignItems: 'center'
    },
    ctnLeftHeader: {
        background: '#90B272',
        padding: '4px 20px',
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        ' & > span': {
            color: '#fff',
            fontSize: 40,
            fontWeight: '600'
        },
        marginRight: 20
    },
    ctnHeaderTitle: {
        display: 'flex',
        flexDirection: 'column',
        paddingRight: 30,
        marginRight: 30,
        borderRight: '1px solid #6C6B86'
    },
    ctnRightContent: {
        width: 280
    },
    ctnPurple: {
        background: '#8C65CC'
    },
    ctnRed: {
        background: '#AD4061'   
    },
    ctnSummary: {
        background: '#fff',
        boxShadow: '0px 10px 20px rgba(114, 125, 196, 0.5)',
        padding: 20,
        borderRadius: 20,
        paddingTop: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ctnHeaderSummary: {
        backgroundColor: '#7589FA',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '200px',
        paddingTop: 8,
        paddingBottom: 8,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    ctnSectionSummary: {
        marginTop: 20
    },
    ctnPriceTag: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& > img': {
            width: 22,
            height: 22,
            objectFit: 'contain',
            marginRight: 8
        }
    },
    btnAddAudience: {
        height: 44,
        borderRadius: 44 / 2,
        paddingRight: 22,
        paddingLeft: 22,
        background: '#71CE62',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
        cursor: 'pointer'
    },
}))