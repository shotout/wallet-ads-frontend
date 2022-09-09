import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    ctnHeaderWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 0,
        paddingBottom: 20,
        borderBottom: '1px solid #fff',
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        '& > img':{
            width: 220,
            height: 50,
            objectFit: 'contain'
        },
    },
    rightHeader: {
        display: 'flex',
        alignItems: 'center',
    },
    ctnIconHeader: {
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        background: '#fff',
        marginLeft: 20,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        '& > img': {
            width: 30,
            height: 30,
            objectFit: 'contain'
        },
        '& > #notification': {
            width: 18,
            height: 18,
            objectFit: 'contain'
        },
        '& > #avatar': {
            objectFit: 'cover'
        },
    },
    ctnLogout:{
        background: '#fff',
        height: 30,
        borderRadius: 30 / 2,
        paddingLeft: 20,
        paddingRight: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        cursor: 'pointer',
        '& > div':{
            marginLeft: 8,
            width: 15,
            height: 18,
        }
    }
}))