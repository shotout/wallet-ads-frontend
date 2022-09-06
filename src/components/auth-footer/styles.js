import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    ctnRoot:{
        background: '#7089FF',
        display: 'flex',
        alignItems: 'center',
        padding: '10px 100px',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    ctnLink: {
        '& > a':{
            color: '#fff',
            textDecoration: 'none',
            marginRight: 30,
            fontWeight: 'bold',
            fontSize: 15
        }
    }
}))