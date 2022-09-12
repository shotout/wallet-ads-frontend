import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    ctnWrapper:{
        position: 'relative',
        overflow: 'hidden',
        padding: 30,
        width: '100%',
    },
    ctnPopover:{
        background: 'rgba(0,0,0,0.3)',
        '& > .MuiPaper-root':{
            maxWidth: 680,
            background: '#fff'
        }
    },
    btnStyle:{
        marginTop: 12,
        height: 80,
        '& > span':{
            fontSize: 20
        }
    },
    btnBlack:{
        background: '#000 !important',
        '& > span':{
            color: '#fff'
        }
    },
    ctnClose:{
        position: 'absolute',
        top: 30,
        right: 20,
        cursor: 'pointer'
    }
}))