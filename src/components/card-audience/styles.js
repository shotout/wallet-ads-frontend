import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    ctnAudience: {
        position: 'relative',
        marginRight: 20
    },
    cardAudience: {
        backgroundColor: '#fff',
        boxShadow: '0px 10px 20px rgba(114, 125, 196, 0.5)',
        width: 280,
        height: '100%',
        marginLeft: 20,
        padding: 20,
        borderRadius: 20,
        marginBottom: 40,
        paddingTop: 0,
        display: 'flex',
        // justifyContent: 'center',
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
    }
}))