import { Typography, Grid } from '@mui/material';
import React from 'react';
import useStyles from './styles';

const discordIcon = '/assets/svg/discord.svg';
const telegramIcon = '/assets/telegram.png';
const mediumIcon = '/assets/svg/medium.svg';
const websiteIcon = '/assets/svg/world.svg';

export default function CollectionPreview({ label, bannerSource, logoSource, formValues }) {
  const styles = useStyles();

  function renderProfile() {
    if (logoSource) {
      return <img src={logoSource} alt="logo" className={styles.logoImage} loading="lazy" />;
    }
    return <div className={styles.ctnLogo} />;
  }

  function renderBanner() {
    return (
      <div className={styles.ctnBanner}>
        <div className={styles.bannerItem}>
          <img src={bannerSource} alt="banner-source" loading="lazy" />
        </div>

        {renderProfile()}
      </div>
    );
  }

  function renderDesc() {
    return (
      <div className={styles.ctnDesc}>
        <div className={styles.titleWithSocial}>
          <Typography variant="h6">{formValues.ads_page_name || 'Collection page name'}</Typography>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {formValues?.ads_page_website && (
              <div className={styles.ctnSocial}>
                <img src={websiteIcon} alt="discord" />
              </div>
            )}
            {formValues?.ads_page_discord && (
              <div className={styles.ctnSocial}>
                <img src={discordIcon} alt="discord" />
              </div>
            )}
            {formValues?.ads_page_medium && (
              <div className={styles.ctnSocial}>
                <img src={mediumIcon} alt="discord" />
              </div>
            )}
            {formValues?.ads_page_telegram && (
              <div className={styles.ctnSocial}>
                <img src={telegramIcon} alt="discord" />
              </div>
            )}
            {/* {formValues?.ads_page_telegram && <div className={styles.ctnSocial}>|</div>} */}
          </div>
        </div>

        {/* <Grid style={{ width: '40%', paddingLeft: 50 }}>
          <Typography fontSize={20} fontWeight={700} marginBottom={3}>
            Your social media links:
          </Typography>
          {formValues?.ads_page_website && (
            <div className={styles.ctnSocial}>
              <img src={websiteIcon} alt="discord" />
              <Typography fontSize={15} fontWeight={400}>
                {formValues?.ads_page_website}
              </Typography>
            </div>
          )}
          {formValues?.ads_page_discord && (
            <div className={styles.ctnSocial}>
              <img src={discordIcon} alt="discord" />
              <Typography fontSize={15} fontWeight={400}>
                {formValues?.ads_page_discord}
              </Typography>
            </div>
          )}
          {formValues?.ads_page_medium && (
            <div className={styles.ctnSocial}>
              <img src={mediumIcon} alt="discord" />
              <Typography fontSize={15} fontWeight={400}>
                {formValues?.ads_page_medium}
              </Typography>
            </div>
          )}
          {formValues?.ads_page_telegram && (
            <div className={styles.ctnSocial}>
              <img src={telegramIcon} alt="discord" />
              <Typography fontSize={15} fontWeight={400}>
                {formValues?.ads_page_telegram}
              </Typography>
            </div>
          )}
        </Grid> */}
        <Typography variant="body1">{formValues.ads_page_description || 'Your collection page text here'}</Typography>
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
