import { Typography } from '@mui/material';
import React from 'react';
import Iconify from '../Iconify';
import useStyles from './styles'
import _ from 'lodash'
import { calculateAirdropPerUser, getAudiencePrice } from '../../helpers/calculator';
import SvgIconStyle from '../SvgIconStyle';

const triangleIcon = '/assets/triangle.png'
const pricetagIcon = '/assets/pricetag_icon.png'
const headerCard = '/assets/svg/header_card.svg'

export default function CardAudience({ showArrow, label, selectedPage, isSomeAudienceActive, data = undefined, onPressCard, isEdit, onAdd, onChangeBudget = () => {} }){
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
                                {`+ Airdrop Received: ${target.airdropReceived}`}
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
                                    {`+ Creator name: ${detail.creatorName}`}
                                </Typography>
                            )}
                        </div>
            )
        }
    }

    function renderPrice(){
        return (
            <div className={styles.ctnPriceInput}>
                <span>
                    USD
                </span>
                <input name="budget" maxLength={5} value={`${data.budgetAds}`} onChange={onChangeBudget} type="text"  />
            </div>
        )
    }

    function renderContent(){
        const target = data.balancedTargeting
        if(data.selectedCategory === 'detail-targeting'){
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
        if(data.selectedCategory === 'optimized'){
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
        if(data.selectedCategory === 'upload'){
            return (
                <div className={styles.ctnDescAudience}>
                    {data.audienceFile && (
                        <Typography variant="span" textAlign={'center'} marginBottom={0.2}>
                        {`+ Audience: ${data.audienceFile.name}`}
                    </Typography>
                    )}
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
                    <div className={styles.headerAudience}>
                        <div className={styles.ctnWrapper}>
                            <SvgIconStyle src={headerCard} sx={{ width: 1, height: 1, bgcolor: !selectedPage && isSomeAudienceActive ? '#757474' : '#7589FA' }} />
                        </div>
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
                    {showArrow && (
                        <div className={styles.ctnArrow}>
                            <img src={triangleIcon} alt="arrow" />
                        </div>
                    )}
            
            </div>
        </div>
    )
}