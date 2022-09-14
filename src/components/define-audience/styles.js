import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    ctnRoot: {
        background: '#F1F1F1',
        boxShadow: '0px 10px 20px rgba(114, 125, 196, 0.5)',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        padding: 20,
        borderRadius: 20
    },
    ctnMainContent:{
        display: 'flex',
        alignItems: 'center'
    },
    ctnLeftContent: {
        display: 'flex',
        flexDirection:'column',
        flexGrow: 1
    },
    ctnCard: {
        background: '#fff',
        boxShadow: '0px 10px 20px rgba(114, 125, 196, 0.5)',
        marginRight: 20,
        marginBottom: 20,
        padding: 20,
        paddingLeft: 0,
        paddingRight: 0,
        borderRadius: 20,
        minHeight: 98,
        position: 'relative',
        overflow: 'hidden'
    },
    ctnHeader: {
        display: 'flex',
        // alignItems: 'center',
        position: 'relative'
    },
    ctnLeftHeader: {
        cursor: 'pointer',
        paddingLeft: 10,
        '& > #ctn-title':{
            position: 'relative',
            '& > span': {
                color: '#fff',
                fontSize: 40,
                fontWeight: '600',
                zIndex: 99,
                position: 'absolute',
                top: -3
            },
        },
        // marginRight: 20,
        position: 'relative',
    },
    ctnBgBtn: {
        position: 'absolute',
        left: -16,
        height: 70,
        width: 70,
        top: -6,
        '& > span':{
            zIndex: 1
        }
    },
    ctnHeaderTitle: {
        display: 'flex',
        flexDirection: 'column',
        paddingRight: 10,
        marginRight: 30,
        paddingLeft: 40,
        borderRight: '1px solid #6C6B86',
        // width: '40%'
        flexGrow: 1
    },
    ctnHeaderDesc: {
        width: '45%',
        paddingRight: 20,
    },
    ctnRightContent: {
        width: '100%',
        marginRight: 22
    },
    ctnPurple: {
        background: '#8C65CC'
    },
    ctnRed: {
        background: '#AD4061'   
    },
    ctnSummary: {
        background: '#fff',
        boxShadow: '0px 10px 20px rgba(114, 125, 196, 0.5)',
        padding: 20,
        borderRadius: 20,
        paddingTop: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ctnHeaderSummary: {
        backgroundColor: '#7589FA',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '200px',
        paddingTop: 8,
        paddingBottom: 8,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    ctnSectionSummary: {
        marginTop: 20
    },
    ctnPriceTag: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& > img': {
            width: 22,
            height: 22,
            objectFit: 'contain',
            marginRight: 8
        }
    },
    btnAddAudience: {
        height: 44,
        borderRadius: 44 / 2,
        paddingRight: 22,
        paddingLeft: 22,
        background: '#71CE62',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
        cursor: 'pointer'
    },
    ctnInputTarget: {
        display: 'flex',
        marginTop: 20,
        paddingTop: 20,
        marginLeft: 20,
        marginRight: 20,
        borderTop: '1px solid #8C65CC'
    },
    ctnLeftInputTarget: {
        width: '40%',
        paddingRight: 56,
        paddingLeft: 20,
        position: 'relative',
        '& > div':{
            maxWidth: 244
        }
    },
    ctnRightAudience: {
        width: 330,
        paddingRight: 56,
        paddingLeft: 20,
        position: 'relative',
    },
    ctnRightTarget: {
        width: '60%',
        paddingRight: 30,
        // paddingLeft: 20,
    },
    ctnRight30: {
        width: '30%',
        paddingRight: 30,
        paddingLeft: 20,
        position: 'relative'
    },
    ctnLeftBalance: {
        width: 200,
        paddingRight: 20,
        position: 'relative'
    },
    ctnInputSelect: {
        marginTop: 8,
        '& > div': {
            '& > div': {
                height: '38px !important',
                background: '#F1F1F1 !important',
                '& > .MuiOutlinedInput-notchedOutline':{
                    border: 'none !important'
                },
                '& > .MuiSelect-select':{
                    fontSize: '15px !important'
                }
            },
        }
    },
    ctnTitleInput:{
        display: 'flex',
        position: 'relative',
        '& > div': {
            width: 20,
            height: 14,
            objectFit: 'contain',
            marginLeft: 2
        }
    },
    ctnRowInput: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    ctnGrayInput: {
        marginTop: 8,
        background: '#F1F1F1',
        height: 38,
        borderRadius: 8,
        overflow: 'hidden',
        marginRight: 20,
        display: 'flex',
        alignItems: 'center',
        paddingRight: 20,
        width: 140,
        '& > input': {
            fontFamily: 'Public Sans,sans-serif',
            border: 0,
            height: 30,
            background: '#fff',
            margin: '7px 4px 7px 6px',
            outline: 'none',
            width: 38,
            textAlign: 'center',
            marginRight: 12,
            fontSize: 15
        },
        '& > p':{
            color: '#000'
        }
    },
    ctnGrayInputDisable: {
        '& > input': {
            background: '#F1F1F1 !important'
        },
        '& > p':{
            color: '#AAA4A4 !important'
        }
    },
    borderRed: {
        borderTopColor: '#AD4061',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    ctnDetailInput: {
        paddingLeft: 20,
        width: '40%',
        paddingRight: 20,
    },
    inputSectionLeft: {
        marginBottom: 20,
    },
    inputCollectionWrapper: {
        marginTop: 8,
        '& > input': {
            fontFamily: 'Public Sans,sans-serif',
            border: 0,
            height: 38,
            width: '100%',
            background: '#F1F1F1',
            borderRadius: 8,
            paddingLeft: 12,
            paddingRight: 12,
            fontSize: 15
        }
    },
    comingSoon: {
        background: 'rgba(252, 252, 252,0.8)',
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 30,
        paddingLeft: 20,
        top: 0
    },
    bgUnactive: {
        background: '#808080 !important'
    },
    txtUnActive: {
        color: '#808080 !important'
    },
    ctnStandar: {
        position: 'absolute',
        background: '#90B272',
        right: 0,
        top: -20,
        padding: '2px 16px 0px 16px',
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 12
    },
    ctnRowTitle:{
        '& > div': {
            width: 20,
            height: 16,
            objectFit: 'contain',
            marginLeft: 4
        },
        display: 'flex',
        // alignItems: 'center',
        flexWrap: 'wrap'
    },
    amountInputWrapper: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 8,
    },
    ctnInputSelectAmount: {
        '& > div': {
            '& > div': {
                height: '38px !important',
                background: '#F1F1F1 !important',
                width: 80,
                borderTopRightRadius: '0px',
                borderBottomRightRadius: '0px',
                '& > .MuiSvgIcon-root':{
                    background: '#8C65CC',
                    color: '#fff',
                    height: 38,
                    width: 20,
                    right: '0px !important',
                    top: '0px !important',
                },
                '& > .MuiOutlinedInput-notchedOutline':{
                    border: 'none !important'
                },
                '& > .MuiSelect-select':{
                    textAlign: 'center !important',
                    paddingRight: '26px !important',
                    fontSize: '15px !important'
                }
            },
        }
    },
    grayArrowBg:{
        '& > div': {
            '& > div': {
                '& > .MuiSvgIcon-root':{
                    background: '#808080 !important',
                },
            },
        }
    },
    ctnInputRawAmount: {
        height: '38px',
        background: '#F1F1F1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        '& > span':{
            fontSize: 15,
            paddingLeft: 12,
            paddingRight: 12,
            fontFamily: 'Public Sans,sans-serif',
            textAlign: 'center',
        },
        '& > input': {
            fontFamily: 'Public Sans,sans-serif',
            border: 0,
            height: 30,
            background: '#fff',
            margin: '7px 4px 7px 6px',
            outline: 'none',
            width: 38,
            textAlign: 'center',
            marginRight: 12,
            fontSize: 14
        }
    },
    noPdLeft: {
        paddingLeft: '0px !important'
    },
    bdRightAmount: {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        paddingRight: 8
    },
    ctnInputMultipleSelect:{
        marginTop: 8,
        '& > div':{
            width:'100%',
            height: '38px !important',
            background: '#F1F1F1 !important',
            '& > .MuiOutlinedInput-notchedOutline':{
                border: 'none !important'
            },
            '& > .MuiSelect-select':{
                fontSize: '15px !important',
            }
        }
    },
    ctnPopover:{
        '& > .MuiPaper-root':{
            background: 'rgba(0, 0, 0,0.9)'
        }
    },
    askCtn: {
        cursor: 'pointer'
    },
    ctnComingSoon:{
        width: '100%',
        height: '100%',
        background: 'rgba(252, 252, 252,0.9)',
        position: 'absolute',
        top: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems:' center'
    }
}))