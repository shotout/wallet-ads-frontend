import { Typography } from '@mui/material';
import React from 'react';
import useStyles from './styles';

export default function CollectionPreview({ label, bannerSource, logoSource, formValues }) {
  const styles = useStyles();

  function renderProfile() {
    if (logoSource) {
      return <img src={logoSource} alt="logo" className={styles.logoImage} />;
    }
    return <div className={styles.ctnLogo} />;
  }

  function renderBanner() {
    return (
      <div className={styles.ctnBanner}>
        <div className={styles.bannerItem}>
          {bannerSource ? (
            <img src={bannerSource} alt="banner-source" />
          ) : (
            <Typography variant="h6" color={'#fff'}>
              {/* Banner image 1400 x 350 */}
            </Typography>
          )}
        </div>

        {renderProfile()}
      </div>
    );
  }

  function renderDesc() {
    return (
      <div className={styles.ctnDesc}>
        <Typography variant="h6">{formValues.ads_page_name || 'Your page name'}</Typography>
        <Typography variant="body1">{formValues.ads_page_description || 'Your page description'}</Typography>
      </div>
    );
  }

  return (
    <div className={styles.ctnRoot}>
      {renderBanner()}
      {renderDesc()}
    </div>
  );
}
