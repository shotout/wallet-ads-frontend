import React, { useEffect, useState } from 'react';
import useStyles from './styles'
// @mui
import {
  MenuItem,
  TextField,
  Select,
  Typography,
  Checkbox,
  ListItemText,
  Grid,
  Popover,
  Box
} from '@mui/material';
import CardAudienceSummary from '../card-audience-summary';
import FilePicker from '../file-picker';
import SvgIconStyle from '../SvgIconStyle';

const questionObj = {
    availability: "To keep the users' wallets clean and to deliver high-quality advertisement, the ad will be auto-deletes from the users' wallets after a certain amount of time. ",
    cryptocurrencies_used: "Target users that own specific cryptocurrencies. If you select several cryptocurrencies, you will target all users that own at least one of the chosen cryptocurrencies.",
    account_age: "Target users whose cryptowallet accounts already exist for a certain amount of time.",
    available_credit_in_wallet: "Target users who have a certain amount of credit in their wallet (daily updated equivalent in USD)",
    trading_volume: "Target users who already traded assets and cryptocurrencies of a certain trading volume.",
    airdrops_received: "Target users who already received a certain amount of airdrops.",
    amount_of_transaction: "Target users who made a certain amount of transactions within a certain timeframe.",
    nft_Purchases: "Target users who made purchases of a certain Creator or NFT. You can freely add several creators or NFTs here by separating them with a comma.",
    upload_audience: "If you have a list of wallet addresses that you would like to target, you can upload it here. File format: .xlsx or .csv - max. file size 8mb.",
    collection_page_text: "Add a text for your collection page to describe what it is about.",
    add_social_media_link: "On your collection page, you can link to your social media pages. If you do not have an account on one of the pages, just leave the field empty.",
    ad_name: "This is the name of your advertisement.",
    media: "Upload an ad image. This will become the NFT that will be sent to the users. Format: png/jpg ",
    ad_text: "This will be the description that shows along with your wallet ad.",
    choose_audience: "If you create several audiences and several ads, you can decide here which of your audiences should see which ad.",
    collection_page_name: "Name of the Collection page under which your ad will be listed. This could be your brand name or artist name.",
    logo_text: 'Upload a banner for the collection page. Recommended size: 350x350px Format: png/jpg.',
    logo_text_banner: 'Upload a banner for the collection page. Recommended size: 400x350px Format: png/jpg.',
}

const targetIcon = '/assets/svg/target_background.svg'
const askSvg = '/assets/svg/ask.svg'

const listAirdropReceived = [
    'Select...',
  '0',
  '1-5',
  '6-10',
  '>10'
]

const listAmountTransaction = [
'-',
  '0',
  'Min. 1',
  'Min. 5',
  'Min. 10'
]

const listAvailableCredit = [
    'Select...',
    'USD0',
    'Min. USD1',
    'Min. USD100',
    'Min. USD1,000',
    'Min. USD100,000'
]


export default function DefineAudience({ selectedAudience, initialData, onAdd = () => {} }){
    const [activeAudience, setActiveAudience] = useState(null)
    const [formValues, setFormValues] = useState(null)
    const [activePopover, setActivePopover] = useState(null);
    const [hover, setHover] = useState(null);

    useEffect(() => {
        if(activeAudience !== selectedAudience){
            setActiveAudience(selectedAudience)
            setFormValues({
                ...initialData,
                optimized: true,
                selectedCategory: initialData.optimized && initialData.selectedCategory ? initialData.selectedCategory : 'optimized'
            })
        }
    }, [selectedAudience])

    const handleHoverOpen = (event, popoverName) => {
      setHover(event.currentTarget);
      setActivePopover(popoverName)
    };
     
    const handleHoverClose = () => {
      setHover(null);
    };

    const handleSubmitAudience = () => {
        if(formValues.balancedTargeting && formValues.balancedTargeting.cryptoCurrency){
            onAdd({
                ...formValues,
                balancedTargeting: {
                    ...formValues.balancedTargeting,
                    cryptoCurrency: formValues.balancedTargeting.cryptoCurrency.filter(item => item !== 'Select...')
                }
            })
        }else{
            onAdd(formValues)
        }
    }

    const onChangeBasicValue = (stateName, value) => {
        setFormValues({
            ...formValues,
            [stateName]: value
        })
    }

    const handleInputFile = (value) => {
      const file = value[0]
      if(file.name.includes("xlsx") || file.name.includes("csv")){
            setFormValues({
                ...formValues,
                selectedCategory: 'upload',
                audienceFile: Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            })
      }
    }
    const removeFile = () => {
        setFormValues({
            ...formValues,
            audienceFile: null
        })
    }

    const checkIsCategoryActive = (categoryName, isBackground) => {
        if(categoryName !== formValues.selectedCategory){
            if(isBackground){
                return styles.bgUnactive
            }
            return styles.txtUnActive
        }
        return ''
    }

    function renderPopover(type, content){
      return(
          <Popover
            id={type}
            open={Boolean(hover) && activePopover === type}
            anchorEl={hover}
            anchorOrigin={{
            vertical: 'left',
            horizontal: 'center',
            }}
            transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
            }}
            onClose={handleHoverClose}
            disableRestoreFocus
            sx={{
            pointerEvents: 'none',
            }}
            className={styles.ctnPopover}
        >
            <Box sx={{ p: 2, maxWidth: 260 }}>
                <Typography variant="body2" sx={{ color: '#fff' }} textAlign="center">
                    {content || ''}
                </Typography>
            </Box>
        </Popover>
      )
    }

    const isCategorySelected = (categoryName) => {
        if(categoryName === formValues.selectedCategory){
            return true
        }
        return false
    }

    const getCategoryColor = (categoryName, additionalParam) => {
        if(categoryName !== formValues.selectedCategory){
            return '#808080'
        }
        return additionalParam || ''
    }

    const handleChangeBalanceTarget = (event, stateName) => {
        if(stateName === 'year' || stateName === 'months' || stateName === 'day' ){
            if(isNaN(event.target.value)){
                event.preventDefault();
                return true
            }
            if(stateName === 'year'){
                setFormValues({
                    ...formValues,
                    balancedTargeting: {
                        ...formValues.balancedTargeting,
                        [stateName]: event.target.value
                    }
                })
            }
            if(stateName === 'months'){
                if(Number(event.target.value) > 12){
                    event.preventDefault()
                }else{
                    setFormValues({
                        ...formValues,
                        balancedTargeting: {
                            ...formValues.balancedTargeting,
                            [stateName]: event.target.value
                        }
                    })
                }
            }
            if(stateName === 'day'){
                if(Number(event.target.value) > 31){
                    event.preventDefault()
                }else{
                    setFormValues({
                        ...formValues,
                        balancedTargeting: {
                            ...formValues.balancedTargeting,
                            [stateName]: event.target.value
                        }
                    })
                }
            }
        }else if(stateName === 'cryptoCurrency'){
            const {
                target: { value },
            } = event;
            setFormValues({
                ...formValues,
                balancedTargeting: {
                    ...formValues.balancedTargeting,
                    cryptoCurrency:  typeof value === 'string' ? value.split(',') : value
                }
            })
        } else{

            setFormValues({
                ...formValues,
                balancedTargeting: {
                    ...formValues.balancedTargeting,
                    [stateName]: event.target.value
                }
            })
        }
        return true
    }

    const handleChangeDetailTarget = (event, stateName) => {
        setFormValues({
            ...formValues,
            detailTargeting: {
                ...formValues.detailTargeting,
                [stateName]: event.target.value
            }
        })
    }

    const styles = useStyles()

    function renderComingSoon(){
        return (
            <div className={styles.comingSoon}>
                <Typography variant="body2" color={getCategoryColor('detail-targeting')}>
                    Coming soon
                </Typography>
            </div>
        )
    }

    function renderInputTargeting(){
        return (
            <div className={styles.ctnInputTarget}>
                <div className={styles.ctnLeftInputTarget}>
                    <div className={styles.ctnTitleInput}>
                        <Typography variant="body2" color={getCategoryColor('detail-targeting')}>
                            +Cryptocurrencies used
                        </Typography>
                        <div className={styles.askCtn} onMouseEnter={(event) => {handleHoverOpen(event, 'cryptocurrencies_used')}} onMouseLeave={handleHoverClose}>
                            {renderPopover('cryptocurrencies_used', questionObj.cryptocurrencies_used)}
                            <SvgIconStyle src={askSvg} sx={{ width: 1, height: 1, color: getCategoryColor('detail-targeting', '#8C65CC') }} />
                        </div>
                    </div>
                    <div className={styles.ctnInputMultipleSelect}>
                        <Select
                            multiple
                            select
                            fullWidth
                            placeholder="Select..."
                            variant="outlined"
                            sx={{
                                // height: 44,
                                // backgroundColor: 'red'
                            }}
                            disabled={!isCategorySelected('detail-targeting')}
                            value={formValues.balancedTargeting.cryptoCurrency ? formValues.balancedTargeting.cryptoCurrency : ['Select...']}
                            onChange={(target) => {handleChangeBalanceTarget(target, 'cryptoCurrency')}}
                            renderValue={(selected) => {
                                if(selected.length === 1 && selected[0] === 'Select...'){
                                    return selected.join(', ')
                                }
                                return selected.filter(item => item !== 'Select...').join(', ')
                                
                            }}
                            >
                        {['Select...','BTC', 'ETH', 'USDT', 'USDC', 'BNB', 'BUSD', 'XRP', 'ADA', 'SOL', 'DOT'].map((option) => {
                            if(option === 'Select...'){
                                return null
                            }
                            return(
                                <MenuItem className={styles.txtOption} key={option} value={option}>
                                    <Checkbox
                                        sx={{
                                            '&.Mui-checked': {
                                                color: '#8C65CC'
                                            },
                                        }}
                                        checked={formValues.balancedTargeting && formValues.balancedTargeting.cryptoCurrency && formValues.balancedTargeting.cryptoCurrency.indexOf(option) > -1} />
                                    <ListItemText primary={option} />
                                </MenuItem>
                            )
                        })}
                        </Select>
                    </div>
                </div>
                <div className={styles.ctnRightTarget}>
                    <div className={styles.ctnTitleInput}>
                        <Typography variant="body2" color={getCategoryColor('detail-targeting')}>
                            +Account age
                        </Typography>
                        <div className={styles.askCtn} onMouseEnter={(event) => {handleHoverOpen(event, 'account_age')}} onMouseLeave={handleHoverClose}>
                            {renderPopover('account_age', questionObj.account_age)}
                            <SvgIconStyle src={askSvg} sx={{ width: 1, height: 1, color: getCategoryColor('detail-targeting', '#8C65CC') }} />
                        </div>
                    </div>
                    <div className={styles.ctnRowInput}>
                        <div className={`${styles.ctnGrayInput} ${!formValues.balancedTargeting.year ? styles.ctnGrayInputDisable : {}}`}>
                            <input
                                disabled={!isCategorySelected('detail-targeting')}
                                value={formValues.balancedTargeting.year}
                                onChange={(target) => {handleChangeBalanceTarget(target, 'year')}} placeholder='-' type={'text'} />
                            <Typography variant="body2">
                                {isNaN(formValues.balancedTargeting.year) || (Number(formValues.balancedTargeting.year) <= 1) ? 'Year' : 'Years'}
                            </Typography>
                        </div>
                        <div className={`${styles.ctnGrayInput} ${!formValues.balancedTargeting.months ? styles.ctnGrayInputDisable : {}}`}>
                            <input
                                disabled={!isCategorySelected('detail-targeting')}
                                value={formValues.balancedTargeting.months} onChange={(target) => {handleChangeBalanceTarget(target, 'months')}}
                                placeholder='-' type={'text'} />
                            <Typography variant="body2">
                                {isNaN(formValues.balancedTargeting.months) || (Number(formValues.balancedTargeting.months) <= 1) ? 'Month' : 'Months'}
                            </Typography>
                        </div>
                        <div className={`${styles.ctnGrayInput} ${!formValues.balancedTargeting.day ? styles.ctnGrayInputDisable : {}}`}>
                            <input
                                disabled={!isCategorySelected('detail-targeting')}
                                value={formValues.balancedTargeting.day}
                                onChange={(target) => {handleChangeBalanceTarget(target, 'day')}}  placeholder='-' type={'text'} />
                            <Typography variant="body2">
                                {isNaN(formValues.balancedTargeting.day) || (Number(formValues.balancedTargeting.day) <= 1) ? 'Day' : 'Days'}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    function renderInputAirdop(){
        return (
            <div className={styles.ctnInputTarget}>
                <div className={styles.ctnLeftInputTarget}>

                <div className={styles.ctnTitleInput}>
                            <Typography variant="body2" color={getCategoryColor('detail-targeting')}>
                                +Available credit in wallet
                            </Typography>
                            <div className={styles.askCtn} onMouseEnter={(event) => {handleHoverOpen(event, 'available_credit_in_wallet')}} onMouseLeave={handleHoverClose}>
                                {renderPopover('available_credit_in_wallet', questionObj.available_credit_in_wallet)}
                                <SvgIconStyle src={askSvg} sx={{ width: 1, height: 1, color: getCategoryColor('detail-targeting', '#8C65CC') }} />
                            </div>
                        </div>
                        <div className={styles.ctnInputSelect}>
                            <TextField
                                select
                                fullWidth
                                placeholder="Select..."
                                variant="outlined"
                                disabled={!isCategorySelected('detail-targeting')}
                                value={formValues.detailTargeting ? formValues.detailTargeting.availableCredit || 'Select...' : 'Select...'}
                                onChange={(target) => {handleChangeDetailTarget(target, 'availableCredit')}}
                                >
                            {listAvailableCredit.map((option) => (
                                <MenuItem className={styles.txtOption} key={option} value={option}>
                                {option}
                                </MenuItem>
                            ))}
                            </TextField>
                        </div>
                </div>
                <div className={styles.ctnLeftBalance}>
                    <div className={styles.ctnTitleInput}>
                            <Typography variant="body2" color={getCategoryColor('detail-targeting')}>
                                +Trading Volume
                            </Typography>
                            <div className={styles.askCtn} onMouseEnter={(event) => {handleHoverOpen(event, 'trading_volume')}} onMouseLeave={handleHoverClose}>
                                {renderPopover('trading_volume', questionObj.trading_volume)}
                                <SvgIconStyle src={askSvg} sx={{ width: 1, height: 1, color: getCategoryColor('detail-targeting', '#8C65CC') }} />
                            </div>
                        </div>
                        <div className={styles.ctnInputSelect}>
                            <TextField
                                select
                                fullWidth
                                disabled={!isCategorySelected('detail-targeting')}
                                placeholder="Select..."
                                variant="outlined"
                                value={formValues.detailTargeting ? formValues.detailTargeting.tradingVolume || 'Select...' : 'Select...'}
                                onChange={(target) => {handleChangeDetailTarget(target, 'tradingVolume')}}
                                >
                            {listAvailableCredit.map((option) => (
                                <MenuItem className={styles.txtOption} key={option} value={option}>
                                {option}
                                </MenuItem>
                            ))}
                            </TextField>
                        </div>
                </div>
                <div className={styles.ctnLeftBalance}>
                        <div className={styles.ctnTitleInput}>
                            <Typography variant="body2" color={getCategoryColor('detail-targeting')}>
                                +Airdrops Received
                            </Typography>
                            <div className={styles.askCtn} onMouseEnter={(event) => {handleHoverOpen(event, 'airdrops_received')}} onMouseLeave={handleHoverClose}>
                                {renderPopover('airdrops_received', questionObj.airdrops_received)}
                                <SvgIconStyle src={askSvg} sx={{ width: 1, height: 1, color: getCategoryColor('detail-targeting', '#8C65CC') }} />
                            </div>
                        </div>
                        <div className={styles.ctnInputSelect}>
                            <TextField
                                select
                                disabled={!isCategorySelected('detail-targeting')}
                                fullWidth
                                variant="outlined"
                                value={formValues.balancedTargeting.airdropReceived || 'Select...'}
                                onChange={(target) => {handleChangeBalanceTarget(target, 'airdropReceived')}}
                                >
                            {listAirdropReceived.map((option) => (
                                <MenuItem className={styles.txtOption} key={option} value={option}>
                                {option}
                                </MenuItem>
                            ))}
                            </TextField>
                        </div>
                </div>
            </div>
        )
    }
    function renderComingSoonInput(){
        return (
            <div className={styles.ctnInputTarget}>
                <div className={styles.ctnLeftInputTarget}>
                    <div className={styles.ctnTitleInput}>
                        <Typography variant="body2">
                            +Add lookalike wallets
                        </Typography>
                        <div className={styles.askCtn}>
                            <SvgIconStyle src={askSvg} sx={{ width: 1, height: 1, color: getCategoryColor('detail-targeting', '#8C65CC') }} />
                        </div>
                    </div>
                    <div className={styles.ctnInputSelect}>
                        <TextField
                            // select
                            fullWidth
                            placeholder=""
                            variant="outlined"
                            disabled={!isCategorySelected('detail-targeting')}
                            // value={formValues.balancedTargeting.airdropReceived}
                            // onChange={(target) => {handleChangeBalanceTarget(target, 'airdropReceived')}}
                            >
                        {[].map((option) => (
                            <MenuItem className={styles.txtOption} key={option} value={option}>
                            {option}
                            </MenuItem>
                        ))}
                        </TextField>
                    </div>
                    {renderComingSoon()}
                </div>
                <div className={styles.ctnRight30}>
                    <div className={styles.ctnTitleInput}>
                        <Typography variant="body2">
                            + Wallet Type
                        </Typography>
                        <div className={styles.askCtn}>
                            <SvgIconStyle src={askSvg} sx={{ width: 1, height: 1, color: getCategoryColor('detail-targeting', '#8C65CC') }} />
                        </div>
                    </div>
                    <div className={styles.ctnInputSelect}>
                        <TextField
                            select
                            fullWidth
                            placeholder="Select..."
                            variant="outlined"
                            disabled={!isCategorySelected('detail-targeting')}
                            // value={formValues.balancedTargeting.airdropReceived}
                            // onChange={(target) => {handleChangeBalanceTarget(target, 'airdropReceived')}}
                            >
                        {['...Select'].map((option) => (
                            <MenuItem className={styles.txtOption} key={option} value={option}>
                            {option}
                            </MenuItem>
                        ))}
                        </TextField>
                    </div>
                    {renderComingSoon()}
                </div>
                <div className={styles.ctnRight30}>
                    <div className={styles.ctnTitleInput}>
                        <Typography variant="body2">
                            + Location
                        </Typography>
                        <div className={styles.askCtn}>
                            <SvgIconStyle src={askSvg} sx={{ width: 1, height: 1, color: getCategoryColor('detail-targeting', '#8C65CC') }} />
                        </div>
                    </div>
                    <div className={styles.ctnInputSelect}>
                        <TextField
                            select
                            fullWidth
                            placeholder="Select..."
                            variant="outlined"
                            disabled
                            // value={formValues.balancedTargeting.airdropReceived}
                            // onChange={(target) => {handleChangeBalanceTarget(target, 'airdropReceived')}}
                            >
                        {['...Select'].map((option) => (
                            <MenuItem className={styles.txtOption} key={option} value={option}>
                            {option}
                            </MenuItem>
                        ))}
                        </TextField>
                    </div>
                    {renderComingSoon()}
                </div>
            </div>
        )
    }

    function renderDetailInput(){
        return (
            <div className={styles.ctnInputTarget}>
                <div className={styles.ctnDetailInput}>
                    <div className={styles.inputSectionLeft}>
                        <div className={styles.ctnTitleInput}>
                            <Typography variant="body2" color={getCategoryColor('detail-targeting')}>
                                +Amount of transactions
                            </Typography>
                            <div className={styles.askCtn} onMouseEnter={(event) => {handleHoverOpen(event, 'amount_of_transaction')}} onMouseLeave={handleHoverClose}>
                                {renderPopover('amount_of_transaction', questionObj.amount_of_transaction)}
                                <SvgIconStyle src={askSvg} sx={{ width: 1, height: 1, color: getCategoryColor('detail-targeting', '#8C65CC') }} />
                            </div>
                        </div>
                        <div className={styles.amountInputWrapper}>
                            <div className={`${styles.ctnInputSelectAmount} ${!isCategorySelected('detail-targeting') ? styles.grayArrowBg : {}}`}>
                                <TextField
                                    select
                                    fullWidth
                                    variant="outlined"
                                    disabled={!isCategorySelected('detail-targeting')}
                                    value={formValues.detailTargeting ? formValues.detailTargeting.transactionAmount || '-' : '-'}
                                    onChange={(target) => {handleChangeDetailTarget(target, 'transactionAmount')}}
                                    >
                                {listAmountTransaction.map((option) => (
                                    <MenuItem className={styles.txtOption} key={option} value={option}>
                                    {option}
                                    </MenuItem>
                                ))}
                                </TextField>
                            </div>
                            <div className={`${styles.ctnInputRawAmount} ${checkIsCategoryActive('detail-targeting')}`}>
                                <span>within</span>
                            </div>
                            <div className={`${styles.ctnInputRawAmount} ${!formValues.detailTargeting.amountDays ? styles.ctnGrayInputDisable : {}}`}>
                                <input 
                                    disabled={!isCategorySelected('detail-targeting')}
                                    value={formValues.detailTargeting ? formValues.detailTargeting.amountDays || '' : ''}
                                    onChange={(target) => {handleChangeDetailTarget(target, 'amountDays')}}
                                    placeholder='-' type="text" id="campaign" name="campaign" />
                            </div>
                            <div className={`${styles.ctnInputRawAmount} ${checkIsCategoryActive('detail-targeting')} ${styles.bdRightAmount}`}>
                                <span>days</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.ctnDetailInput} ${styles.noPdLeft}`}>
                    <div className={styles.inputSectionLeft}>
                        <div className={styles.ctnTitleInput}>
                            <Typography variant="body2" color={getCategoryColor('detail-targeting')}>
                                +NFT Purchases
                            </Typography>
                            <div className={styles.askCtn} onMouseEnter={(event) => {handleHoverOpen(event, 'nft_Purchases')}} onMouseLeave={handleHoverClose}>
                                {renderPopover('nft_Purchases', questionObj.nft_Purchases)}
                                <SvgIconStyle src={askSvg} sx={{ width: 1, height: 1, color: getCategoryColor('detail-targeting', '#8C65CC') }} />
                            </div>
                        </div>
                        <div className={styles.inputCollectionWrapper}>
                            <input 
                                disabled={!isCategorySelected('detail-targeting')}
                                value={formValues.detailTargeting ? formValues.detailTargeting.creatorName || '' : ''}
                                onChange={(target) => {handleChangeDetailTarget(target, 'creatorName')}}
                                placeholder='Add creator here' type="text" id="campaign" name="campaign" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function renderOptimizeTargeting(){
        return (
            <div
                onClick={() => {
                    if(formValues.selectedCategory !== 'optimized'){
                        onChangeBasicValue('selectedCategory','optimized')
                    }
                }}
                className={styles.ctnCard}>
                <div className={styles.ctnHeader}>
                    <div className={styles.ctnBgBtn}>
                        <SvgIconStyle src={targetIcon} sx={{ width: 1, height: 1, bgcolor: getCategoryColor('optimized', '#90B272') }} />
                    </div>
                    <div className={styles.ctnLeftHeader} onClick={() => {onChangeBasicValue('selectedCategory','optimized')}}>
                        <div id="ctn-title">
                            <span>+</span>
                        </div>
                    </div>
                    <div className={styles.ctnHeaderTitle}>
                        <Typography variant="h6" color={getCategoryColor('optimized')} marginBottom={0}>
                            OPTIMIZED TARGETING
                        </Typography>
                        <Typography variant="subtitle2" color={getCategoryColor('optimized', "#90B272")}>
                            Price: USD0.039 per airdrop
                        </Typography>
                    </div>
                    <div className={styles.ctnHeaderDesc}>
                        <Typography variant="body1" color="#808080">
                            The audience consists of a broad mix of users, optimized by our algorithm. 
                        </Typography>
                    </div>
                    <div className={`${styles.ctnStandar} ${checkIsCategoryActive('optimized', true)}`}>
                        <Typography variant="body2" fontSize={12} color="#fff">
                            Standard
                        </Typography>
                    </div>
                </div>
            </div>
        )
    }

    function renderBalance(){
        return (
            <div
                className={styles.ctnCard}
                onClick={() => {
                    // if(formValues.selectedCategory !== 'detail-targeting'){
                    //     onChangeBasicValue('selectedCategory','detail-targeting')
                    // }
                }}>
                <div className={styles.ctnHeader}>
                    <div className={styles.ctnBgBtn}>
                        <SvgIconStyle src={targetIcon} sx={{ width: 1, height: 1, bgcolor: getCategoryColor('detail-targeting', '#8C65CC') }} />
                    </div>
                    <div className={styles.ctnLeftHeader}>
                        <div id="ctn-title">
                            <span>+</span>
                        </div>
                    </div>
                    <div className={styles.ctnHeaderTitle}>
                        <Typography variant="h6" color={getCategoryColor('detail-targeting')} marginBottom={0}>
                            DETAILED TARGETING
                        </Typography>
                        <Typography variant="subtitle2" color={getCategoryColor('detail-targeting', "#8C65CC")}>
                            Price: USD0.079 per sendout
                        </Typography>
                    </div>
                    <div className={styles.ctnHeaderDesc}>
                        <Typography variant="body1" color="#808080">
                        Select more detailed targeting options to reach your audience
                        </Typography>
                    </div>
                </div>
                {renderInputTargeting()}
                {renderInputAirdop()}
                {renderDetailInput()}
                {renderComingSoonInput()}
                <div className={styles.ctnComingSoon}>
                    <Typography variant="h3" color="#808080" textAlign={"center"}>
                        Coming soon
                    </Typography>
                </div>
            </div>
        )
    }

    function renderDetail(){
        return (
            <div
                onClick={() => {
                    if(formValues.selectedCategory !== 'upload'){
                        onChangeBasicValue('selectedCategory','upload')
                    }
                }}
                className={styles.ctnCard}>
                <div className={styles.ctnHeader}>
                    <div className={styles.ctnBgBtn}>
                        <SvgIconStyle src={targetIcon} sx={{ width: 1, height: 1, bgcolor: getCategoryColor('upload', '#AD4061') }} />
                    </div>
                    <div className={styles.ctnLeftHeader} onClick={() => {onChangeBasicValue('selectedCategory','upload')}}>
                        <div id="ctn-title">
                            <span>+</span>
                        </div>
                    </div>
                    <div className={styles.ctnHeaderTitle}>
                        <div className={styles.ctnRowTitle}>
                            <Typography variant="h6" color={getCategoryColor('upload')} marginBottom={0}>
                                UPLOAD YOUR OWN AUDIENCE
                            </Typography>
                            <div className={styles.askCtn} onMouseEnter={(event) => {handleHoverOpen(event, 'upload_audience')}} onMouseLeave={handleHoverClose}>
                                {renderPopover('upload_audience', questionObj.upload_audience)}
                                <SvgIconStyle src={askSvg} sx={{ width: 1, height: 1, color: getCategoryColor('upload', '#AD4061') }} />
                            </div>
                        </div>
                        <Typography variant="subtitle2" color={getCategoryColor('upload', "#AD4061")}>
                            Price: USD0.019 per sendout
                        </Typography>
                    </div>
                    <div className={styles.ctnHeaderDesc}>
                        <Typography variant="body1" color="#808080">
                            Upload your own file with wallet addresses to create an audience
                        </Typography>
                    </div>
                </div>
                <div className={`${styles.ctnInputTarget} ${styles.borderRed}`}>
                    <FilePicker btnStyle={checkIsCategoryActive('upload', true)} onDelete={removeFile} typeScreen={'logo'} file={formValues.audienceFile} label="Upload File" onDrop={(value) => {handleInputFile(value)}} />
                    
                <div className={styles.ctnRightAudience}>
                    <div className={styles.ctnTitleInput}>
                        <Typography variant="body2">
                            +Add lookalike wallets
                        </Typography>
                        <div className={styles.askCtn}>
                            <SvgIconStyle src={askSvg} sx={{ width: 1, height: 1, color: getCategoryColor('detail-targeting', '#8C65CC') }} />
                        </div>
                    </div>
                    <div className={styles.ctnInputSelect}>
                        <TextField
                            // select
                            fullWidth
                            placeholder=""
                            variant="outlined"
                            disabled={!isCategorySelected('detail-targeting')}
                            // value={formValues.balancedTargeting.airdropReceived}
                            // onChange={(target) => {handleChangeBalanceTarget(target, 'airdropReceived')}}
                            >
                        {[''].map((option) => (
                            <MenuItem className={styles.txtOption} key={option} value={option}>
                            {option}
                            </MenuItem>
                        ))}
                        </TextField>
                    </div>
                    {renderComingSoon()}
                </div>
                </div>
            </div>
        )
    }

    function renderLeftContent(){
        return (
            <div className={styles.ctnLeftContent}>
                {renderOptimizeTargeting()}
                {renderDetail()}
                {renderBalance()}
            </div>
        )
    }
    
    function renderRightContent(){
        return (
            <div className={styles.ctnRightContent}>
                <CardAudienceSummary onChangeBudget={event => {onChangeBasicValue('budgetAds',event.target.value)}} isEdit onAdd={handleSubmitAudience} data={formValues} label="Summary" />
            </div>
        )
    }

    function renderContent(){
        return (
            <div className={styles.ctnMainContent}>
                <Grid container spacing={2}>
                    <Grid item md={9}xs={12} className={styles.ctnSectionAd}>
                        {renderLeftContent()}
                    </Grid>
                    <Grid item md={3}xs={12} className={styles.ctnSectionAd}>
                        {renderRightContent()}
                    </Grid>
                </Grid>
            </div>
        )
    }

    if(formValues === null){
        return null
    }

    return (
        <div className={styles.ctnRoot} id="create-audience">
            <Typography variant="h6" marginBottom={2} textAlign="center">
                {`Define Audience ${selectedAudience + 1}`}
            </Typography>
            {renderContent()}
        </div>
    )
}