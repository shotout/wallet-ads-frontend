import { Typography } from '@mui/material';
import React, { useState } from 'react';
import useStyles from './styles'

const pricetagIcon = '/assets/pricetag_icon.png'


export default function DefineAudience(){
    const styles = useStyles()

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