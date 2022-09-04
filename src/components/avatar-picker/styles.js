import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    ctnRoot:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ctnAvatar:{
        marginTop: 20,
        position: 'relative',
        '& > img':{
            width: 120,
            height: 120,
            objectFit: 'cover',
            borderRadius: 120 / 2,
            overflow: 'hidden'
        },
        cursor:'pointer'
    },
    ctnOption: {
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& > div':{
            cursor:'pointer',
            marginLeft: 4,
            marginRight: 4,
            '& > img':{
                width: 30,
                height: 30,
                objectFit: 'contain'
            }
        }
    }
}))