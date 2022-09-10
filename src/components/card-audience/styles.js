import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    ctnAudience: {
        position: 'relative',
        height: '97%',
    },
    cardAudience: {
        backgroundColor: '#fff',
        boxShadow: '0px 10px 20px rgba(114, 125, 196, 0.5)',
        width: '100%',
        height: '100%',
        marginLeft: 20,
        padding: 20,
        borderRadius: 20,
        marginBottom: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: 400,
        paddingTop: 0,
        overflow: 'hidden'
    },
    ctnCursor: {
        cursor: 'pointer',
    },
    headerAudience: {
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '98%',
        paddingBottom: 12,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        top: '-1px',
        '& > h5':{
            zIndex: 99
        },
        overflow: 'hidden',
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
        position: 'relative',
        '& > $ctnAudienceWrapper':{
            scrollbarWidth: 'none'
        },
        '& > $ctnAudienceWrapper::-webkit-scrollbar':{
            display: 'none'
        },
    },
    ctnPrice: {
        width: '100%',
        border: '1px solid #122D46',
        height: 60,
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    ctnPriceInput: {
        // width: '100%',
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
            fontFamily: 'Public Sans,sans-serif',
        },
        '& > input': {
            borderRadius: 12,
            fontFamily: 'Public Sans,sans-serif',
            border: 0,
            height: '100%',
            maxWidth: 90,
            outline: 'none',
            textAlign: 'left',
            fontSize: '1.25rem',
            fontWeight: '700'
        }
    },
    descFilledWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
        position: 'relative'
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
        bottom: -50,
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
    ctnEdit: {
        position: 'absolute',
        cursor: 'pointer',
        right: -12,
        width: 20,
        height: 20,
        top: 30
    },
    inputPriceWrapper:{
        marginBottom: 6,
        width: '100%'
    },
    ctnAudienceWrapper: {
        overflow: 'scroll',
        height: 140,
        flexDirection: 'column',
    },
    ctnDefaultContentWrapper: {
        // overflow: 'scroll',
        height: 140,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        display: 'flex'
    },
    txtCurrency:{
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 2,
        textAlign: 'center',
        overflow: 'hidden',
    },
    redBorder: {
        borderColor: '#AD4061',
    },
    ctnRedBorder: {
        border: '2px solid red',
    },
    borderTopError:{
        borderTop: '2px solid red',
    }
}))