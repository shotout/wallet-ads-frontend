import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    ctnAudience: {
        position: 'relative',
    },
    cardAudience: {
        backgroundColor: '#fff',
        boxShadow: '0px 10px 20px rgba(114, 125, 196, 0.5)',
        width: 320,
        height: '100%',
        marginLeft: 20,
        padding: 20,
        borderRadius: 20,
        marginBottom: 40,
        paddingTop: 0,
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        // cursor: 'pointer',
        // minHeight: 400,
    },
    headerAudience: {
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '230px',
        paddingBottom: 12,
        height: 52,
        position: 'absolute',
        top: '0px',
        '& > h5':{
            zIndex: 99
        },
        overflow: 'hidden'
    },
    ctnWrapper: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: -6,
        objectFit: 'contain'
    },
    ctnDescAudience: {
        marginTop: 20,
        padding: '0px 8px'
    },
    ctnPrice: {
        width: '100%',
        border: '1px solid #122D46',
        height: 60,
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ctnPriceInput: {
        width: '100%',
        border: '1px solid #122D46',
        height: 60,
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginTop: 10,
        '& > span': {
            textAlign: 'left',
            fontSize: '1.25rem',
            fontWeight: '700',
            paddingLeft: 30,
        },
        '& > input': {
            borderRadius: 12,
            fontFamily: 'Public Sans,sans-serif',
            border: 0,
            height: '100%',
            width: 80,
            outline: 'none',
            textAlign: 'left',
            fontSize: '1.25rem',
            fontWeight: '700'
        }
    },
    descFilledWrapper: {
        display: 'flex',
        flexDirection: 'column'
    },
    ctnEmptyAudience: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ctnArrow: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: -38,
        '& > img':{
            width: 60,
            height: 30,
            objetFit: 'contain'
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
    ctnGrayHeader: {
        background: '#757474',
    },
    ctnRowItem: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 4,
        "& > div": {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            flexGrow: 1,
            marginLeft: 16
        }
    },
    txtUnderline: {
        textDecoration: 'underline'
    }
}))