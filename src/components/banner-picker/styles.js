import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    ctnBanner: {
        position: 'relative',
        cursor: 'pointer'
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
    },
    ctnBannerContent: {
        background: '#D9D9D9',
        paddingTop: '28%',
        position: 'relative',
        width: '100%',
    },
    bannerItem: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        top: '0px',
        '& > img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        }
    },
    bannerOptionWrapper: {
        position: 'absolute',
        top: 12,
        right: 12,
        display: 'flex',
        alignItems: 'center'
    },
    ctnIcon: {
        marginLeft: 12,
        '& > img':{
            width: 32,
            height: 32,
            objectFit: 'contain'
        }
    },

    logoImg: {
        background:'#D9D9D9',
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 20
    },
    ctnRowLogo: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    leftRow: {
        display: 'flex',
        alignItems: 'center'
    },
    ctnLogoRight:{
        display: 'flex',
        alignItems: 'center'
    }
}))

export default useStyles