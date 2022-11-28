import React, { useEffect } from 'react';
import { Popover, Typography } from '@mui/material';
import useStyles from './styles';
import Iconify from '../Iconify';

export default function CampaignModal({ isVisible, data, close }) {
  const styles = useStyles();

  useEffect(() => {
    console.log(data);
  }, [data]);

  function renderHeader() {
    return (
      <div className={styles.ctnHeader}>
        <Typography fontSize={20} fontWeight={700}>
          {data?.title}
        </Typography>
        <div className={styles.ctnClose}>
          <Iconify icon={'ant-design:close-outlined'} width={24} height={24} onClick={close} />
        </div>
      </div>
    );
  }

  function renderImage() {
    return (
      <div>
        <img src={data?.img} alt="img-ads" className={styles.imgModal} loading="lazy" />
      </div>
    );
  }

  function renderDesc() {
    return (
      <Typography fontSize={18} fontWeight={400} marginTop={2}>
        {data?.desc}
      </Typography>
    );
  }

  function renderContent() {
    return (
      <div className={styles.modalWrapper}>
        {renderImage()} {renderDesc()}
      </div>
    );
  }

  return (
    <Popover
      id={'success-campaign'}
      open={Boolean(isVisible)}
      //   anchorEl={isVisible ? isVisible.sessionId : null}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      onClose={close}
      className={styles.ctnPopover}
      style={{ '&::WebkitScrollbar': { display: 'none' } }}
    >
      {renderHeader()}
      {renderContent()}
    </Popover>
  );
}
