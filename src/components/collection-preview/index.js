import { Typography } from '@mui/material';
import React from 'react';
import useStyles from './styles';

const whiteCameraIcon = '/assets/camera_icon.png'

export default function CollectionPreview({ label }){
    const styles = useStyles()

    function renderProfile(){
        return (
            <div className={styles.ctnLogo} />
        )
    }

    function renderBanner(){
        return (
            <div className={styles.ctnBanner}>
                <div className={styles.bannerItem}>
                    <Typography variant="h6" color={'#fff'}>Banner image 1400 x 400</Typography>
                </div>

            {renderProfile()}
            </div>
        )
    }

    function renderDesc(){
        return (
            <div className={styles.ctnDesc}>
                <Typography variant="h6">Collection page name</Typography>
                <Typography variant="body1">Your collection page text here</Typography>
            </div>
        )
    }

    return (
        <div className={styles.ctnRoot}>
            {renderBanner()}
            {renderDesc()}
        </div>
    )
}