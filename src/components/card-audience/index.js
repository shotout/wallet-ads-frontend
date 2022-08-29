import { Typography } from '@mui/material';
import React from 'react';
import Iconify from '../Iconify';
import useStyles from './styles'

const triangleIcon = '/assets/triangle.png'

export default function CardAudience({ label, typeScreen }){
    const styles = useStyles()

    function renderContent(){
        if(typeScreen === 'empty-audience'){
            return  (
                <div className={styles.ctnEmptyAudience}>
                    <Iconify icon={'ant-design:plus-circle-outlined'} color="#C9D3D8" width={80} height={80} />
                    <Typography variant="h5" textAlign={'center'} marginTop={1} color="#C9D3D8">
                        Create audience
                    </Typography>
                    {label === 'Audience 3:' && (
                        <div className={styles.ctnArrow}>
                            <img src={triangleIcon} alt="arrow" />
                        </div>
                    )}
                </div>
            )
        }
        if(typeScreen === 'filled-audience'){
            return (
                <div className={styles.ctnDescAudience}>
                    <div className={styles.descFilledWrapper}>
                        <Typography variant="span" textAlign={'center'} marginBottom={0.2}>
                            + Wallet-type: Coinbase
                        </Typography>
                        <Typography variant="span" textAlign={'center'} marginBottom={0.2}>
                            + Cryptocurrencies: BTC
                        </Typography>
                        <Typography variant="span" textAlign={'center'} paragraph>
                            + Amount of transactions 10-20
                        </Typography>
                    </div>
                    <div className={styles.ctnPrice}>
                        <Typography variant="h5" textAlign={'center'} >
                            USD500
                        </Typography>
                    </div>
                    <Typography variant="span" textAlign={'center'} paragraph>
                        USD2 per airdrop
                    </Typography>
                    <div className={styles.ctnAmount}>
                        <Typography variant="h6" color={'#7589FA'} textAlign={'center'}>
                        3000 users
                        </Typography>
                        <Typography variant="span" textAlign={'center'} paragraph>
                        In this audience will receive airdrops
                        </Typography>
                    </div>
                </div>
            )
        }
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
                <div className={styles.ctnAmount}>
                    <Typography variant="h6" color={'#7589FA'} textAlign={'center'}>
                    8,333 users
                    </Typography>
                    <Typography variant="span" textAlign={'center'} paragraph>
                    In this audience will receive airdrops
                    </Typography>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.ctnAudience}>
                <div className={styles.cardAudience}>
                    <div className={styles.headerAudience}>
                        <Typography variant="h5" textAlign={'center'} color={'#fff'}>
                            {label}
                        </Typography>
                    </div>
                    {renderContent()}
            
            </div>
        </div>
    )
}