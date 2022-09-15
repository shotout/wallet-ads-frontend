import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    ctnRoot:{
        position: 'relative'
    },
    ctnContent:{
        maxWidth: 1024,
        minHeight: '100vh',
        margin: 'auto',
        padding: 30,
        paddingBottom: 120
    },
    ctnHeader:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 40
    },
    ctnLeft:{
        display: 'flex',
        alignItems: 'center',
        '& > h6:first-child':{
            marginRight: 20,
            paddingRight: 20,
            borderRight: '1px solid #B3B3B3'
        },
        '& > h6':{
            cursor: 'pointer',
        },
    },
    ctnRight: {
        '& > a > img': {
            width: 220,
            height: 50,
            objectFit: 'contain'
        }
    },
    ctnDesc: {
        '& > div':{
            width: '100%',
            '& > table':{
                width: '100%',
                border: '1px solid #000',
                borderCollapse: 'collapse',
                '& > tbody':{
                    width: '100%',
                    '& > tr':{
                        border: '1px solid #000',
                        '& > td':{
                            border: '1px solid #000',
                            textAlign: 'center'
                        },
                    },
                }
            },
        }
    }
}))