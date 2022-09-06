import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    ctnRoot: {
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        backgroundImage: 'url("/assets/auth_bg.png")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right',
    },
    ctnHeader: {
        marginTop: 30,
        marginLeft: 100,
        marginBottom: 30,
        '& > img':{
            width: 220,
            height: 50,
            objectFit: 'contain'
        },
    },
    ctnInput: {
        marginLeft: 100,
        maxWidth: 720,
        width: '100%',
        boxShadow: '0px 10px 20px rgba(114, 125, 196, 0.5)',
        borderRadius: 28,
        padding: 20,
        background: '#E4E6FA',
        marginBottom: 80
    },
    ctnTitle: {
        marginBottom: 40
    },
    ctnForm:{
        marginBottom: 30
    },
    inputWrapper:{
        '& > .MuiFormControl-root':{
            '& > .MuiOutlinedInput-root':{
                backgroundColor: '#fff',
                // '& > .Mui-focused':{
                '& > .MuiOutlinedInput-notchedOutline':{
                    border: 'none'
                }
            },
            '& > .MuiFormLabel-root':{
                // fontSize: 14
            },
            '& > .MuiInputLabel-root.Mui-focused':{
                color: '#7089FF !important',
            }
        }
    },
    btnStyle: {
        height: 44,
        backgroundColor: '#7089FF',
        maxWidth: 320,
        margin:'auto',
        width: '100%',
        color: '#fff',
        '& span':{
            backgroundColor: '#7089FF !important',
        }
    },
    ctnDirectRegister:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 20,
        '& > span':{
            fontFamily: 'Public Sans,sans-serif',
            marginRight: 6,
        },
        '& > div':{
            cursor: 'pointer',
            '& > a':{
                fontFamily: 'Public Sans,sans-serif',
                color: '#7089FF',
                textDecoration:' underline'
            },
        }
    },
    ctnSuccess:{
        maxWidth: 500,
        margin: 'auto',
        padding: '40px 0px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& > img':{
            width: 100,
            height: 96,
            objectFit: 'contain',
        }
    }
}))