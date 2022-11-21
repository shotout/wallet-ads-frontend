import React from 'react';
import useStyles from './styles';
import { BACKEND_URL } from '../../helpers/constants';
import { Divider, Typography } from '@mui/material';
import CheckboxAds from '../checkbox';

export default function AdsCard({ item, audienceData }) {
  const styles = useStyles();

  // const [description, setDescription] = React.useState(JSON.string())

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
    let contents = null;
    try {
      contents = JSON.parse(item.description);
    } catch (error) {
      contents = item.description;
    }

    return (
      <div className={styles.adtextContainer}>
        {typeof contents === 'object' &&
          contents.map((v, i) => (
            <div key={`adtext-${i}`} style={{ marginBottom: 5 }}>
              <Typography fontSize={18} fontWeight={600}>
                Ad text {i + 1}:
              </Typography>
              <Typography fontWeight={400} color={'#000000'} textAlign={'justify'}>
                {v.adtext}
              </Typography>
              {contents.length > 1 && <Divider />}
            </div>
          ))}
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

        {renderAdText()}
        <div className={styles.ctnDivider}>{''}</div>
        <Typography fontSize={18} fontWeight={600} marginBottom={2}>
          Audiences seeing this ad:
        </Typography>
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
