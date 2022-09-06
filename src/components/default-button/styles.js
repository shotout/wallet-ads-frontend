import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    ctnBtn:{
        width: '100%',
        background: '#7089FF',
        height: 44,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: 8,
        cursor: 'pointer',
        "& > span":{
            textAlign: 'center',
            color: '#fff',
            fontFamily: 'Public Sans,sans-serif',
            fontSize: 16,
            fontWeight: 'bold'
        },
        '& > .MuiCircularProgress-colorPrimary':{
            color: '#fff'
        }
    },
}))