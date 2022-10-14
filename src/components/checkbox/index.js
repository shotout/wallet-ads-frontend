import React, { useState } from 'react';
import useStyles from './styles';

const checklistIcon = '/assets/checklist.png';

export default function CheckboxAds({ isActive = false, onChange, disabled }) {
  const styles = useStyles();

  const handleChangeStatus = () => {
    if (typeof onChange === 'function') onChange();
  };

  return (
    <div className={`${styles.ctnCheckbox}  ${disabled ? styles.ctnDisableCheckBox : {}}`} onClick={handleChangeStatus}>
      {isActive ? <img src={checklistIcon} alt="checklist" /> : <div className={styles.checboxUnselect} />}
    </div>
  );
}
