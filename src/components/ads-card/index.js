import React from 'react';
import useStyles from './styles';
import { BACKEND_URL } from '../../helpers/constants';
import { Typography } from '@mui/material';
import CheckboxAds from '../checkbox';

export default function AdsCard({ item, audienceData }) {
  const styles = useStyles();

  const audenceDatas = audienceData.filter((audience) => audience.ads_id === item.id);
  console.log(audenceDatas.name);

  function renderImage() {
    return (
      <div className={styles.cardBanner}>
        <img src={`${BACKEND_URL}/${item.image.url}`} />
      </div>
    );
  }

  function renderAdText() {
    return (
      <div className={styles.adtextContainer}>
        <Typography fontWeight={400} textAlign={'justify'}>
          {item.description}
        </Typography>
      </div>
    );
  }

  function renderAudience() {
    return (
      <div>
        {audenceDatas.map((v, i) => (
          <div key={`aud-${i}`} className={styles.audienceContainer}>
            <CheckboxAds isActive={true} />
            <Typography>{v.name}</Typography>
          </div>
        ))}
      </div>
    );
  }

  function renderContent() {
    return (
      <div>
        <Typography fontSize={18} fontWeight={600}>
          {item.name}
        </Typography>
        {renderImage()}
        <Typography fontSize={18} fontWeight={600}>
          Ad text:
        </Typography>
        {renderAdText()}
        {renderAudience()}
      </div>
    );
  }

  return (
    <div className={styles.ctnAds}>
      <div className={styles.cardAds}>{renderContent()}</div>
    </div>
  );
}
