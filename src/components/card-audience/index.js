import { Typography } from '@mui/material';
import React from 'react';
import Iconify from '../Iconify';
import useStyles from './styles'
import _ from 'lodash'

const triangleIcon = '/assets/triangle.png'
const pricetagIcon = '/assets/pricetag_icon.png'

export default function CardAudience({ label, selectedPage, data = undefined, onPressCard, isEdit, onAdd }){
    const styles = useStyles()

    function renderContent(){
        const target = data.balancedTargeting
        if(!_.isEmpty(data) && target.cryptoCurrency && target.year && target.months && target.day && target.airdropReceived){
            return (
                <div className={styles.ctnDescAudience}>
                    <div className={styles.descFilledWrapper}>
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
                    <div className={styles.ctnPrice}>
                        <Typography variant="h5" textAlign={'center'} >
                            USD500
                        </Typography>
                    </div>
                    <Typography variant="span" textAlign={'center'} paragraph>
                        USD2 per airdrop
                    </Typography>
                    {!isEdit && (
                        <div className={styles.ctnAmount}>
                            <Typography variant="h6" color={'#7589FA'} textAlign={'center'}>
                            3000 users
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
                    <div className={styles.ctnPrice}>
                        <Typography variant="h5" textAlign={'center'} >
                            USD500
                        </Typography>
                    </div>
                    <Typography variant="span" textAlign={'center'} paragraph>
                    USD1 per airdrop
                    </Typography>
                    {!isEdit && (
                        <div className={styles.ctnAmount}>
                            <Typography variant="h6" color={'#7589FA'} textAlign={'center'}>
                            8,333 users
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
                                        USD0.06 per airdrop
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