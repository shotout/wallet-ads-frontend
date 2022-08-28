import { Typography } from '@mui/material';
import React from 'react';
import useStyles from './styles';

const whiteCameraIcon = '/assets/camera_icon.png'

export default function BannerPicker({ label }){
    const styles = useStyles()

    return (
        <div className={styles.ctnBanner}>
            <div className={styles.btnPicker}>
                <img src={whiteCameraIcon} alt="camera" />
                <Typography variant="subtitle1" color={'#fff'}>
                    {label}
                </Typography>
            </div>
        </div>
    )
}