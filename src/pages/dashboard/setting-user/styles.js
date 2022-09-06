import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    ctnRoot: {
        position: 'relative',
        background: '#fff'
    },
    ctnWrapper: {
        maxWidth: '1366px',
        margin: 'auto',
        backgroundColor: '#E4E6FA',
        padding: 20,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 20,
        marginLeft: 20,
        marginRight: 20,
        boxShadow: '0px 10px 20px rgba(114, 125, 196, 0.5)',
    },
    ctnContent:{
        background: '#D0D4EF',
        padding: 20,
        borderRadius: 20,
    },
    ctnCard:{
        background: '#fff',
        padding: 20,
        borderRadius: 20,
        boxShadow: '0px 10px 20px rgba(114, 125, 196, 0.5)'
    },
    ctnTitle:{
        paddingBottom: 12,
        marginBottom: 20,
        borderBottom: '1px solid #BDBDBD'
    },
    inputWrapper:{
        '& > .MuiFormControl-root':{
            '& > .MuiOutlinedInput-root':{
                backgroundColor: '#F1F1F1',
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
    ctnProfilePicture:{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
}))