import { Typography } from '@mui/material';
import React, { useState } from 'react';
import useStyles from './styles'
// @mui
import {
  MenuItem,
  TextField,
} from '@mui/material';

const pricetagIcon = '/assets/pricetag_icon.png'
const purpleAsk = '/assets/purple_ask.png'
const redAsk = '/assets/red_ask.png'


export default function DefineAudience(){
    const styles = useStyles()

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
                            value={"ETH"}
                            placeholder="Select..."
                            variant="outlined"
                            // onChange={handleChangeCurrency}
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
                            <input placeholder='-' type={'text'} />
                            <Typography variant="body1"  color={'#AAA4A4'}>
                                Years
                            </Typography>
                        </div>
                        <div className={styles.ctnGrayInput}>
                            <input placeholder='-' type={'text'} />
                            <Typography variant="body1"  color={'#AAA4A4'}>
                                Months
                            </Typography>
                        </div>
                        <div className={styles.ctnGrayInput}>
                            <input placeholder='-' type={'text'} />
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
                            value={"1-5"}
                            placeholder="Select..."
                            variant="outlined"
                            // onChange={handleChangeCurrency}
                            >
                        {['1-5', '6-10', '10-20'].map((option) => (
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
                                value={"1-5"}
                                placeholder="Select..."
                                variant="outlined"
                                // onChange={handleChangeCurrency}
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
                                value={"1-5"}
                                placeholder="Select..."
                                variant="outlined"
                                // onChange={handleChangeCurrency}
                                >
                            {['1-5', '6-10', '10-20'].map((option) => (
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
                                value={"1-5"}
                                placeholder="Select..."
                                variant="outlined"
                                // onChange={handleChangeCurrency}
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
                                +NFT Purchases
                            </Typography>
                            <img src={redAsk} alt="ask" />
                        </div>
                        <div className={styles.inputCollectionWrapper}>
                            <input placeholder='Add creator here' type="text" id="campaign" name="campaign" />
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
                            +Price: USD0.06 per airdrop
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
                            OPTIMIZED TARGETING
                        </Typography>
                        <Typography variant="subtitle2" color="#AD4061">
                            +Price: USD0.06 per airdrop
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
                <div className={styles.ctnSectionSummary}>
                    <div className={styles.ctnPriceTag}>
                        <img src={pricetagIcon} alt="pricetag" />
                        <Typography variant="body2" fontWeight={'bold'} color="#7089FF">
                            USD0.06 per airdrop
                        </Typography>
                    </div>
                    <div className={styles.btnAddAudience}>
                        <Typography variant="body1" fontWeight={'bold'} color="#fff" textAlign={'center'}>
                            Add audience
                        </Typography>
                    </div>
                </div>
            </div>
        )
    }
    
    function renderRightContent(){
        return (
            <div className={styles.ctnRightContent}>
                <div className={styles.ctnSummary}>
                    <div className={styles.ctnHeaderSummary}>
                        <Typography variant="subtitle1"textAlign="center" color="#fff">
                            Summary
                        </Typography>
                    </div>
                    {renderContentSummary()}
                </div>
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

    return (
        <div className={styles.ctnRoot}>
            <Typography variant="h6" marginBottom={2} textAlign="center">
                Define Audience 3
            </Typography>
            {renderContent()}
        </div>
    )
}