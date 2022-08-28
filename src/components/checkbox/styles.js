import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    ctnCheckbox: {
        position: 'relative',
        marginRight: 12,
        width: 22,
        height: 22,
        '& > img': {
            width: 22,
            height: 22,
            objectFit: 'contain',
        }
    },
    checboxUnselect: {
        width: 22,
        height: 22,
        border: '1px solid #808080',
        borderRadius: 22 
    }
}))