import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    ctnRoot: {
        position: 'relative',
        backgroundColor: '#E4E6FA',
        paddingTop: 20
    },
    ctnSection: {
        display: 'flex',
        backgroundColor: '#fff',
        boxShadow: '0px 10px 20px rgba(114, 125, 196, 0.5)',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        padding: 20,
        borderRadius: 20
    },
    ctnIcon: {
        marginRight: 40,
        '& > img': {
            width: 70,
            height: 60,
            objectFit: 'contain'
        }
    },
    ctnMidInput: {
        flexGrow: 1,
        paddingRight: 20,
    },
    ctnRightInput: {
        minWidth: '20%'
    },
    ctnGray: {
        maxWidth: '90%',
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
    ctnDate: {
        background: '#F1F1F1',
        height: 44,
        borderRadius: 8,
        paddingLeft: 12,
        paddingRight: 12,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& > img': {
            width: 18,
            height: 18,
            objectFit :'contain'
        },
    },
    containerDate: {
        '& > .react-datepicker-wrapper > .react-datepicker__input-container > input':{
            width: '100%',
            height: 44,
            background: 'transparent',
            border: 0,
            fontFamily: 'Public Sans,sans-serif',
            fontSize: 14,
            outline: 'none'
        }
    },
    availWrapper: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputGray: {
        flexDirection: 'row',
        alignItems: 'center',
        display: 'flex',
        background: '#F1F1F1',
        height: 44,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 8,
        marginRight: 40
    },
    leftWrapper :{
        display: 'flex',
        '& > img': {
            width: 22,
            height: 22,
            objectFit: 'contain',
            marginRight: 12
        }
    },
    midWrapper: {
        marginLeft: 24,
        marginRight: 24,
        '& > span': {
            fontWeight: 'bold'
        }
    },
    altDateWrapper: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 30,
        '& > img': {
            width: 20,
            height: 20,
            objectFit :'contain',
            marginLeft: 14
        }
    },
    ctnDefineAudience: {
        background: 'rgb(45, 49, 151, 0.1)',
        marginLeft: 20,
        marginRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 20,
        marginBottom: 20
    },

    ctnSectionTarget: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        boxShadow: '0px 10px 20px rgba(114, 125, 196, 0.5)',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        padding: 20,
        borderRadius: 20
    },
    ctnIconTarget: {
        marginRight: 40,
        '& > img': {
            width: 100,
            height: 100,
            objectFit: 'contain'
        }
    },
    ctnInputBudget: {
        display :'flex',
        alignItems: 'center',
        height: '100%'
    },
    ctnTotal: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #667C8B',
        paddingRight: 120,
        marginRight: 120
    },
    ctnHorizontalRow: {
        marginLeft: 120,
        marginRight: 120,
        backgroundColor: '#000',
        width: 1,
        height: '100%'
    },
    ctnDesc: {
        display: 'flex',
        flexDirection: 'column'
    },
    ctnAudience: {
        position: 'relative'
    },
    ctnTitle: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    rowTitle: {
        height: '2px',
        background: '#fff',
        flexGrow: 1,
    },
    cardAudience: {
        backgroundColor: '#fff',
        boxShadow: '0px 10px 20px rgba(114, 125, 196, 0.5)',
        width: 280,
        marginLeft: 20,
        padding: 20,
        borderRadius: 20,
        marginBottom: 40,
        paddingTop: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    headerAudience: {
        backgroundColor: '#7589FA',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '200px',
        paddingTop: 12,
        paddingBottom: 12,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    ctnDescAudience: {
        marginTop: 20
    },
    ctnPrice: {
        width: '100%',
        border: '1px solid #122D46',
        paddingTop: 12,
        paddingBottom: 12,
        borderRadius: 12
    },
    inputCollectionCard: {
        display: 'flex',
        backgroundColor: '#fff',
        boxShadow: '0px 10px 20px rgba(114, 125, 196, 0.5)',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        padding: 20,
        borderRadius: 20,
        flexDirection: 'column'
    },
    ctnInputCollectionPageWrapper: {
        width: '100%',
        display: 'flex',
    },
    ctnInputCollection: {
        marginBottom: 24,
    },
    ctnLeftCollection: {
        width: '50%',
        paddingRight: 40,
        display: 'flex',
        flexDirection: 'column'
    },
    rowTitleWrapper:{
        display: 'flex',
        justifyContent :'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    leftTitle: {
        display: 'flex',
        alignItems: 'center',
        '& > img': {
            width: 16,
            height: 16,
            objectFit: 'contain',
            marginLeft: 8
        }
    },
    inputCollectionWrapper: {
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
    inputCollectionIcon: {
        display: 'flex',
        alignItems: 'center',
        background: '#F1F1F1',
        height: 44,
        borderRadius: 8,
        paddingLeft: 12,
        marginBottom: 8,
        '& > img': {
            width: 25,
            height: 25,
            objectFit: 'contain'
        },
        '& > input': {
            fontFamily: 'Public Sans,sans-serif',
            border: 0,
            width: '100%',
            height: 44,
            background: '#F1F1F1',
            paddingLeft: 12,
            paddingRight: 12,
            outline: 'none'
        }
    },
    textAreaCollection: {
        '& > textarea': {
            border: 0,
            height: 160,
            width: '100%',
            background: '#F1F1F1',
            borderRadius: 8,
            paddingLeft: 12,
            paddingRight: 12,
            fontFamily: 'Public Sans,sans-serif',
            paddingTop: 20,
            paddingBottom: 20
        }
    },
    ctnRightCollection: {
        width: '50%'
    },
    ctnSelectAudience: {
        borderTop: '1px solid #C9D3D8',
        paddingTop: 20,
        marginTop: 4
    },
    ctnAudienceItem: {
        height: 44,
        background: '#F1F1F1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },
    btnCreateAd: {
        display: 'flex',
        backgroundColor: '#fff',
        boxShadow: '0px 10px 20px rgba(114, 125, 196, 0.5)',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        padding: 20,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        '& > img': {
            width: 44,
            height: 44,
            objectFit: 'contain',
            marginRight: 12
        }
    },
    setupAirdropWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        paddingBottom: 40
    },
    btnSetupAirdrop: {
        height: 44,
        borderRadius: 12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 100,
        paddingRight: 100,
        background: '#7089FF',
        cursor: 'pointer'
    },
    datepickerStyle: {
        overflow: 'hidden',
        width: 0,
        height: 0,
        position: 'absolute'
    }
}))

export default useStyles