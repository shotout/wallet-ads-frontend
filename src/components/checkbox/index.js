import React, { useState } from 'react';
import useStyles from './styles'

const checklistIcon = '/assets/checklist.png'

export default function CheckboxAds(){
    const [checboxStatus, setCheckboxStatus] = useState(true)
    const styles = useStyles()

    const handleChangeStatus = () => {
        setCheckboxStatus(!checboxStatus)
    }

    return (
        <div className={styles.ctnCheckbox} onClick={handleChangeStatus}>
            {checboxStatus ? (
                <img src={checklistIcon} alt="checklist" />
            ) : (
                <div className={styles.checboxUnselect} />
                )}
        </div>
    )
}