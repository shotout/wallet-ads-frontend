import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useStyles from './styles'
// @mui
import {
  MenuItem,
  TextField,
} from '@mui/material';
import CardAudience from '../card-audience';

const pricetagIcon = '/assets/pricetag_icon.png'
const purpleAsk = '/assets/purple_ask.png'
const redAsk = '/assets/red_ask.png'

const listAirdropReceived = [
  '1-5',
  '6-10',
  '11-15'
]


export default function DefineAudience({ selectedAudience, initialData, onAdd = () => {} }){
    const [activeAudience, setActiveAudience] = useState(null)
    const [formValues, setFormValues] = useState(null)

    useEffect(() => {
        if(activeAudience !== selectedAudience){
            setActiveAudience(selectedAudience)
            setFormValues({
                ...initialData,
                optimized: true
            })
        }
    }, [selectedAudience])

    const onChangeBudget = (event) => {
        setFormValues({
            ...formValues,
            budgetAds: event.target.value
        })
    }

    const handleChangeBalanceTarget = (event, stateName) => {
        setFormValues({
            ...formValues,
            balancedTargeting: {
                ...formValues.balancedTargeting,
                [stateName]: event.target.value
            }
        })
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
                <Typography variant="body2">
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
                        <Typography variant="body2">
                            +Cryptocurrencies used
                        </Typography>
                        <img src={purpleAsk} alt="ask" />
                    </div>
                    <div className={styles.ctnInputSelect}>
                        <TextField
                            select
                            fullWidth
                            placeholder="Select..."
                            variant="outlined"
                            value={formValues.balancedTargeting.cryptoCurrency}
                            onChange={(target) => {handleChangeBalanceTarget(target, 'cryptoCurrency')}}
                            >
                        {['ETH', 'BNB', 'SOL'].map((option) => (
                            <MenuItem className={styles.txtOption} key={option} value={option}>
                            {option}
                            </MenuItem>
                        ))}
                        </TextField>
                    </div>
                </div>
                <div className={styles.ctnRightTarget}>
                    <div className={styles.ctnTitleInput}>
                        <Typography variant="body2">
                            +Account age
                        </Typography>
                        <img src={purpleAsk} alt="ask" />
                    </div>
                    <div className={styles.ctnRowInput}>
                        <div className={styles.ctnGrayInput}>
                            <input value={formValues.balancedTargeting.year} onChange={(target) => {handleChangeBalanceTarget(target, 'year')}} placeholder='-' type={'text'} />
                            <Typography variant="body1"  color={'#AAA4A4'}>
                                Years
                            </Typography>
                        </div>
                        <div className={styles.ctnGrayInput}>
                            <input value={formValues.balancedTargeting.months} onChange={(target) => {handleChangeBalanceTarget(target, 'months')}} placeholder='-' type={'text'} />
                            <Typography variant="body1"  color={'#AAA4A4'}>
                                Months
                            </Typography>
                        </div>
                        <div className={styles.ctnGrayInput}>
                            <input value={formValues.balancedTargeting.day} onChange={(target) => {handleChangeBalanceTarget(target, 'day')}}  placeholder='-' type={'text'} />
                            <Typography variant="body1"  color={'#AAA4A4'}>
                                Days
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
                        <Typography variant="body2">
                            +Airdrop Received
                        </Typography>
                        <img src={purpleAsk} alt="ask" />
                    </div>
                    <div className={styles.ctnInputSelect}>
                        <TextField
                            select
                            fullWidth
                            placeholder="Select..."
                            variant="outlined"
                            value={formValues.balancedTargeting.airdropReceived}
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
                <div className={styles.ctnRight30}>
                    <div className={styles.ctnTitleInput}>
                        <Typography variant="body2">
                            + Wallet Type
                        </Typography>
                        <img src={purpleAsk} alt="ask" />
                    </div>
                    <div className={styles.ctnInputSelect}>
                        <TextField
                            select
                            fullWidth
                            placeholder="Select..."
                            variant="outlined"
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
                        <img src={purpleAsk} alt="ask" />
                    </div>
                    <div className={styles.ctnInputSelect}>
                        <TextField
                            select
                            fullWidth
                            placeholder="Select..."
                            variant="outlined"
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
            <div className={`${styles.ctnInputTarget} ${styles.borderRed}`}>
                <div className={styles.ctnDetailInput}>
                    <div className={styles.inputSectionLeft}>
                        <div className={styles.ctnTitleInput}>
                            <Typography variant="body2">
                                +Amount of transaction
                            </Typography>
                            <img src={redAsk} alt="ask" />
                        </div>
                        <div className={styles.ctnInputSelect}>
                            <TextField
                                select
                                fullWidth
                                placeholder="Select..."
                                variant="outlined"
                                value={formValues.detailTargeting ? formValues.detailTargeting.transactionAmount || '' : ''}
                                onChange={(target) => {handleChangeDetailTarget(target, 'transactionAmount')}}
                                >
                            {['1-5', '6-10', '10-20'].map((option) => (
                                <MenuItem className={styles.txtOption} key={option} value={option}>
                                {option}
                                </MenuItem>
                            ))}
                            </TextField>
                        </div>
                    </div>
                    <div className={styles.inputSectionLeft}>
                        <div className={styles.ctnTitleInput}>
                            <Typography variant="body2">
                                +Trading Volume
                            </Typography>
                            <img src={redAsk} alt="ask" />
                        </div>
                        <div className={styles.ctnInputSelect}>
                            <TextField
                                select
                                fullWidth
                                placeholder="Select..."
                                variant="outlined"
                                value={formValues.detailTargeting ? formValues.detailTargeting.tradingVolume || '' : ''}
                                onChange={(target) => {handleChangeDetailTarget(target, 'tradingVolume')}}
                                >
                            {['USD100 - 1,000', 'USD1000 - 2,000', 'USD2000 - 3,000'].map((option) => (
                                <MenuItem className={styles.txtOption} key={option} value={option}>
                                {option}
                                </MenuItem>
                            ))}
                            </TextField>
                        </div>
                    </div>
                </div>
                <div className={styles.ctnDetailInput}>
                    <div className={styles.inputSectionLeft}>
                        <div className={styles.ctnTitleInput}>
                            <Typography variant="body2">
                                +Available credit in wallet
                            </Typography>
                            <img src={redAsk} alt="ask" />
                        </div>
                        <div className={styles.ctnInputSelect}>
                            <TextField
                                select
                                fullWidth
                                placeholder="Select..."
                                variant="outlined"
                                value={formValues.detailTargeting ? formValues.detailTargeting.availableCredit || '' : ''}
                                onChange={(target) => {handleChangeDetailTarget(target, 'availableCredit')}}
                                >
                            {['USD100 - 1,000', 'USD1000 - 2,000', 'USD2000 - 3,000'].map((option) => (
                                <MenuItem className={styles.txtOption} key={option} value={option}>
                                {option}
                                </MenuItem>
                            ))}
                            </TextField>
                        </div>
                    </div>
                    <div className={styles.inputSectionLeft}>
                        <div className={styles.ctnTitleInput}>
                            <Typography variant="body2">
                                +NFT Purchases
                            </Typography>
                            <img src={redAsk} alt="ask" />
                        </div>
                        <div className={styles.inputCollectionWrapper}>
                            <input 
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
            <div className={styles.ctnCard}>
                <div className={styles.ctnHeader}>
                    <div className={styles.ctnLeftHeader}>
                        <span>+</span>
                    </div>
                    <div className={styles.ctnHeaderTitle}>
                        <Typography variant="h6" marginBottom={0}>
                            OPTIMIZED TARGETING
                        </Typography>
                        <Typography variant="subtitle2" color="#90B272">
                            Price: USD0.06 per airdrop
                        </Typography>
                    </div>
                    <div className={styles.ctnHeaderDesc}>
                    <Typography variant="body1" color="#808080">
                        The audience consists of a broad mix of users, optimized by our algorithm. 
                    </Typography>
                    </div>
                </div>
            </div>
        )
    }

    function renderBalance(){
        return (
            <div className={styles.ctnCard}>
                <div className={styles.ctnHeader}>
                    <div className={`${styles.ctnLeftHeader} ${styles.ctnPurple}`}>
                        <span>+</span>
                    </div>
                    <div className={styles.ctnHeaderTitle}>
                        <Typography variant="h6" marginBottom={0}>
                            BALANCED TARGETING
                        </Typography>
                        <Typography variant="subtitle2" color="#8C65CC">
                            +Price: USD0.02 per airdrop
                        </Typography>
                    </div>
                    <div className={styles.ctnHeaderDesc}>
                        <Typography variant="body1" color="#808080">
                        Select more detailed targeting options to reach your audience.
                        </Typography>
                    </div>
                </div>
                {renderInputTargeting()}
                {renderInputAirdop()}
            </div>
        )
    }

    function renderDetail(){
        return (
            <div className={styles.ctnCard}>
                <div className={styles.ctnHeader}>
                    <div className={`${styles.ctnLeftHeader} ${styles.ctnRed}`}>
                        <span>+</span>
                    </div>
                    <div className={styles.ctnHeaderTitle}>
                        <Typography variant="h6" marginBottom={0}>
                            DETAIL TARGETING
                        </Typography>
                        <Typography variant="subtitle2" color="#AD4061">
                            +Price: USD0.02 per airdrop
                        </Typography>
                    </div>
                    <div className={styles.ctnHeaderDesc}>
                        <Typography variant="body1" color="#808080">
                            Select more detailed targeting options to reach your audience.
                        </Typography>
                    </div>
                </div>
                {renderDetailInput()}
            </div>
        )
    }

    function renderLeftContent(){
        return (
            <div className={styles.ctnLeftContent}>
                {renderOptimizeTargeting()}
                {renderBalance()}
                {renderDetail()}
            </div>
        )
    }

    function renderContentSummary(){
        return (
            <div className={styles.ctnContentSummary}>
                <div className={styles.ctnSectionSummary}>
                    <Typography variant="body2" fontWeight={'bold'} textAlign='center'>
                        +Optimized Targeting
                    </Typography>
                    <Typography variant="body2" marginTop={1} textAlign='center' color='#7684AF'>
                        The audience consists of a broad mix of users, optimized by our algorithm. 
                    </Typography>
                </div>
            </div>
        )
    }
    
    function renderRightContent(){
        return (
            <div className={styles.ctnRightContent}>
                <CardAudience onChangeBudget={event => {onChangeBudget(event)}} isEdit onAdd={() => {onAdd(formValues)}} data={formValues} label="Summary" />
            </div>
        )
    }

    function renderContent(){
        return (
            <div className={styles.ctnMainContent}>
                {renderLeftContent()}
                {renderRightContent()}
            </div>
        )
    }

    if(formValues === null){
        return null
    }

    return (
        <div className={styles.ctnRoot}>
            <Typography variant="h6" marginBottom={2} textAlign="center">
                {`Define Audience ${selectedAudience + 1}`}
            </Typography>
            {renderContent()}
        </div>
    )
}