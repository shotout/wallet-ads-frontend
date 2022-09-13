import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    ctnWrapper:{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
    },
    ctnPopover:{
        background: 'rgba(0,0,0,0.3)',
        '& > .MuiPaper-root':{
            maxWidth: 820,
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
    },
    ccStyle:{
        width: 200,
        objectFit: 'contain'
    },
    ctnCreditCardLeft:{
        background: '#7089FF',
    },
    ctnDescWrapper:{
        padding: '80px 80px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputWrapper:{
        marginTop: 20,
        '& > .MuiFormControl-root':{
            '& > .MuiOutlinedInput-root':{
                backgroundColor: '#fff',
                // '& > .Mui-focused':{
                '& > .MuiOutlinedInput-notchedOutline':{
                    // border: 'none'
                }
            },
            '& > .MuiInputLabel-root.Mui-focused':{
                // color: '#7089FF !important',
            }
        },
        '& > input':{
            height: 44,
            color: '#212B36',
            boxSize: 'none',
            borderRadius: 8,
            border: '1px solid rgba(145, 158, 171, 0.32)',
            outline: 'none',
            paddingLeft: 16,
            fontFamily: 'Muli',
            fontSize: '1rem',
            width: '100%'

        }
    },
    errorAmount:{
        '& > input':{
            borderColor: '#FF4842 !important'
        }
    },
    btnWrapper:{
        '& > div':{
            marginTop: 20
        },
        '& > div:first-child':{
            marginTop: 40
        },
        '& > div:last-child':{
            background: '#000'
        }
    },
    ctnRedBox:{
        marginTop: 20,
        background: '#AD4061',
        padding: 12,
        borderRadius: 12,
    }
}))