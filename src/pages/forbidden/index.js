import { Box, Typography } from '@mui/material';
import React from 'react';
import AuthFooter from '../../components/auth-footer';
import useStyles from './styles';

const disableAsset = '/assets/disable.png'

export default function NoMobile(){
    const styles = useStyles()
    return (
        <Box
            sx={{
                display: 'flex',
                height: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                padding: '20px'
            }}>
            <div className={styles.ctnWrapper}>
                <img src={disableAsset} alt="disable"  />
                <Typography variant='subtitle1' className={styles.txtDesc} textAlign="center">
                    To enter the <b>WALLETADS Campaign Dashboard</b>, please use a desktop device for the best experience. Thank you!
                </Typography>
            </div>
            <AuthFooter />
        </Box>
    )
}