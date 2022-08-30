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
        display: 'flex',
        alignItems: 'center'
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
        width: 320,
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
    ctnInputTarget: {
        display: 'flex',
        marginTop: 20,
        paddingTop: 20,
        borderTop: '1px solid #8C65CC'
    },
    ctnLeftInputTarget: {
        width: '30%',
        paddingRight: 30,
        paddingLeft: 20,
    },
    ctnRightTarget: {
        width: '70%',
        paddingRight: 30,
        paddingLeft: 20,
    },
    ctnRight30: {
        width: '20%',
        paddingRight: 30,
        paddingLeft: 20,
        position: 'relative'
    },
    ctnInputSelect: {
        marginTop: 8,
        '& > .css-wb57ya-MuiFormControl-root-MuiTextField-root': {
            '& > .css-1hw9fc4-MuiInputBase-root-MuiOutlinedInput-root': {
                height: 44,
                background: '#F1F1F1'
            }
        }
    },
    ctnTitleInput:{
        display: 'flex',
        alignItems: 'center',
        '& > img': {
            width: 16,
            height: 16,
            objectFit: 'contain',
            marginLeft: 8
        }
    },
    ctnRowInput: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    ctnGrayInput: {
        marginTop: 8,
        background: '#F1F1F1',
        height: 44,
        borderRadius: 8,
        overflow: 'hidden',
        marginRight: 20,
        display: 'flex',
        alignItems: 'center',
        paddingRight: 20,
        width: 140,
        '& > input': {
            fontFamily: 'Public Sans,sans-serif',
            border: 0,
            height: 44,
            background: '#F1F1F1',
            paddingLeft: 12,
            paddingRight: 12,
            outline: 'none',
            width: 70,
            textAlign: 'center'
        }
    },
    borderRed: {
        borderTopColor: '#AD4061'
    },
    ctnDetailInput: {
        paddingLeft: 20,
        width: '30%',
        paddingRight: 30,
    },
    inputSectionLeft: {
        marginBottom: 20,
    },
    inputCollectionWrapper: {
        marginTop: 8,
        '& > input': {
            fontFamily: 'Public Sans,sans-serif',
            border: 0,
            height: 44,
            width: '100%',
            background: '#F1F1F1',
            borderRadius: 8,
            paddingLeft: 12,
            paddingRight: 12
        }
    },
    comingSoon: {
        background: 'rgba(252, 252, 252,0.8)',
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 30,
        paddingLeft: 20,
        top: 0
    }
}))