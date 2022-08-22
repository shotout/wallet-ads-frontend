import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    ctnRoot: {
        position: 'relative',
        backgroundColor: '#E4E6FA',
        height: '100vh',
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
            border: 0,
            height: 30,
            width: '100%',
            background: '#F1F1F1',
            borderRadius: 8,
            paddingLeft: 12,
            paddingRight: 12
        }
    },
    ctnDate: {
        background: '#F1F1F1',
        height: 30,
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
        height: 30,
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
    }
}))

export default useStyles