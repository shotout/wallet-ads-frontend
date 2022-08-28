import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    ctnBanner: {
        position: 'relative',
    },
    btnPicker: {
        backgroundColor: '#7089FF',
        height: 54,
        borderRadius: 12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& > img': {
            width: 26,
            height: 26,
            objectFit: 'contain',
            marginRight: 12
        }
    }
}))

export default useStyles