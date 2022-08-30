import { Typography } from '@mui/material';
import React from 'react';
import Iconify from '../Iconify';
import useStyles from './styles'
import _ from 'lodash'
import { calculateAirdropPerUser, getAudiencePrice } from 'src/helpers/calculator';

const triangleIcon = '/assets/triangle.png'
const pricetagIcon = '/assets/pricetag_icon.png'

export default function CardAudience({ label, selectedPage, isSomeAudienceActive, data = undefined, onPressCard, isEdit, onAdd, onChangeBudget = () => {} }){
    const styles = useStyles()

    function renderBalancedTargeting(){
        const target = data.balancedTargeting
        return (
            <div className={styles.descFilledWrapper}>
                {isEdit && (
                    <Typography variant="span" fontWeight={'bold'} textAlign={'center'} marginBottom={1}>
                        Balanced Targeting
                    </Typography>
                )}
                        {target.cryptoCurrency && (
                            <Typography variant="span" textAlign={'center'} marginBottom={0.2}>
                                {`+ Cryptocurrencies: ${target.cryptoCurrency}`}
                            </Typography>
                        )}
                        {(target.year || target.months || target.day) && (
                            <Typography variant="span" textAlign={'center'} marginBottom={0.2}>
                                {`+ Account age: ${target.year ? `${target.year} Year ` : ''}${target.months ? `- ${target.months} Months ` : ''}${target.day ? `- ${target.day} Day` : ''}`}
                            </Typography>
                        )}
                        {target.airdropReceived && (
                            <Typography variant="span" textAlign={'center'} paragraph>
                                {`+ Amount of transactions ${target.airdropReceived}`}
                            </Typography>
                        )}
                    </div>
        )
    }

    function renderDetailTargeting(){
        const detail = data.detailTargeting
        if(detail && (detail.transactionAmount || detail.tradingVolume || detail.availableCredit || detail.creatorName) ){
            return (
                <div className={styles.descFilledWrapper}>
                    {isEdit && (
                        <Typography variant="span" fontWeight={'bold'} textAlign={'center'} marginBottom={1}>
                            Detail Targeting
                        </Typography>
                    )}
                            {detail.transactionAmount && (
                                <Typography variant="span" textAlign={'center'} marginBottom={0.2}>
                                    {`+ Amount of transactions: ${detail.transactionAmount}`}
                                </Typography>
                            )}
                            {detail.tradingVolume && (
                                <Typography variant="span" textAlign={'center'} marginBottom={0.2}>
                                    {`+ Trading volume: ${detail.tradingVolume}`}
                                </Typography>
                            )}
                            {detail.availableCredit && (
                                <Typography variant="span" textAlign={'center'} marginBottom={0.2}>
                                    {`+ Available credit in wallet: ${detail.availableCredit}`}
                                </Typography>
                            )}
                            {detail.creatorName && (
                                <Typography variant="span" textAlign={'center'} paragraph>
                                    {`+ Amount of transactions ${detail.creatorName}`}
                                </Typography>
                            )}
                        </div>
            )
        }
    }

    function renderPrice(){
        if(isEdit){
            return (
                <div className={styles.ctnPriceInput}>
                    <span>
                        USD
                    </span>
                    <input name="budget" maxLength={5} value={`${data.budgetAds}`} onChange={onChangeBudget} type="text"  />
                </div>
            )
        }
        return (
            <div className={styles.ctnPrice}>
                <Typography variant="h5" textAlign={'center'} >
                    USD{data.budgetAds}
                </Typography>
            </div>
        )
    }

    function renderContent(){
        const target = data.balancedTargeting
        if(!_.isEmpty(data) && (target.cryptoCurrency || target.year || target.months || target.day || target.airdropReceived || data.detailTargeting)){
            return (
                <div className={styles.ctnDescAudience}>
                    {renderBalancedTargeting()}
                    {renderDetailTargeting()}
                    {renderPrice()}
                    {!isEdit && (
                        <Typography variant="span" textAlign={'center'} paragraph>
                            {`USD${getAudiencePrice(data)} per airdrop `}
                        </Typography>
                    )}
                    {!isEdit && (
                        <div className={styles.ctnAmount}>
                            <Typography variant="h6" color={'#7589FA'} textAlign={'center'}>
                            {`${calculateAirdropPerUser(data)} users`}
                            </Typography>
                            <Typography variant="span" textAlign={'center'} paragraph>
                            In this audience will receive airdrops
                            </Typography>
                        </div>
                    )}
                </div>
            )
        }
        if(!_.isEmpty(data) && data.optimized){
            return (
                <div className={styles.ctnDescAudience}>
                    <Typography variant="span" textAlign={'center'} paragraph>
                    The audience consists of a broad mix of users, optimized by our algorithm.
                    </Typography>
                    {renderPrice()}
                    {!isEdit && (
                      <Typography variant="span" textAlign={'center'} paragraph>
                        {`USD${getAudiencePrice(data)} per airdrop `}
                      </Typography>  
                    )}
                    {!isEdit && (
                        <div className={styles.ctnAmount}>
                            <Typography variant="h6" color={'#7589FA'} textAlign={'center'}>
                            {`${calculateAirdropPerUser(data)} users`}
                            </Typography>
                            <Typography variant="span" textAlign={'center'} paragraph>
                            In this audience will receive airdrops
                            </Typography>
                        </div>
                    )}
                </div>
            )
        }
        return  (
            <div className={styles.ctnEmptyAudience}>
                <Iconify icon={'ant-design:plus-circle-outlined'} color="#C9D3D8" width={80} height={80} />
                <Typography variant="h5" textAlign={'center'} marginTop={1} color="#C9D3D8">
                    Create audience
                </Typography>
            </div>
        )
    }

    return (
        <div className={styles.ctnAudience}>
                <div className={styles.cardAudience} onClick={onPressCard}>
                    <div className={`${styles.headerAudience} ${!selectedPage && isSomeAudienceActive ? styles.ctnGrayHeader : {}}`}>
                        <Typography variant="h5" textAlign={'center'} color={'#fff'}>
                            {label}
                        </Typography>
                    </div>
                    {renderContent()}

                    {isEdit && (
                        <>
                            <div className={styles.ctnSectionSummary}>
                                <div className={styles.ctnPriceTag}>
                                    <img src={pricetagIcon} alt="pricetag" />
                                    <Typography variant="body2" fontWeight={'bold'} color="#7089FF">
                                        {`USD${getAudiencePrice(data)} per airdrop`}
                                    </Typography>
                                </div>
                            </div>
                            <div className={styles.btnAddAudience} onClick={onAdd}>
                                <Typography variant="body1" fontWeight={'bold'} color="#fff" textAlign={'center'}>
                                    Add audience
                                </Typography>
                            </div>
                            </>
                    )}
                    {selectedPage && (
                        <div className={styles.ctnArrow}>
                            <img src={triangleIcon} alt="arrow" />
                        </div>
                    )}
            
            </div>
        </div>
    )
}