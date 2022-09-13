import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    ctnWrapper:{
        display: 'flex',
        height: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        maxWidth: 260,
        '& > img':{
            width: 120,
            height: 120,
            objectFit: 'contain',
            marginBottom: 20
        }
    },
    txtDesc:{
        '& > b':{
            fontWeight: 800
        }
    }
}))