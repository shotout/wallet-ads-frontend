import React, { useState, useEffect } from 'react';
import { Grid, Popover, Typography, Divider } from '@mui/material';
import useStyles from './styles';
import CardAudience from '../card-audience';
import { makeId } from '../../utils/general';
import { parsePriceToCategory } from '../../helpers/calculator';
import { BACKEND_URL } from '../../helpers/constants';
import CollectionPreview from '../../components/collection-preview-modal';
import AdsCard from '../ads-card';
import Iconify from '../Iconify';
import { normalizeCurrency } from '../../../src/helpers/currency';

const discordIcon = '/assets/svg/discord.svg';
const telegramIcon = '/assets/telegram.png';
const mediumIcon = '/assets/svg/medium.svg';
const websiteIcon = '/assets/svg/world.svg';
const tokenIcon = '/assets/svg/ic_token.svg';

export default function CampaignModal({ isVisible, data, close }) {
  const styles = useStyles();
  const [audienceForm, setAudienceForm] = useState(null);
  const [bannerCollection, setBannerCollection] = useState(null);
  const [logoCollection, setLogoCollection] = useState(null);
  const [formValues, setFormValues] = useState(null);
  const [totalBudget, setTotalBudget] = useState(0);

  useEffect(() => {
    console.log(data);
    const adsPage = data?.ads_page;
    const adsLogo = adsPage?.images.find((item) => item.type === 'ads_logo');
    const adsBanner = adsPage?.images.find((item) => item.type === 'ads_banner');
    const audienceArr = data?.audiences.map((item) => {
      const targeting = item.detail_target;
      return {
        id: item.id,
        audienceId: makeId(),
        optimized: parsePriceToCategory(item.price_airdrop) !== null,
        selectedCategory: parsePriceToCategory(item.price_airdrop),
        budgetAds: (item.price || '').toString(),
        detailTargeting: {
          availableCredit: normalizeInitialData(targeting.available_credit_wallet),
          tradingVolume: normalizeInitialData(targeting.trading_volume),
          transactionAmount: normalizeInitialData(targeting.amount_transaction),
          amountDays: normalizeInitialData(targeting.amount_transaction_day),
          creatorName: normalizeInitialData(targeting.nft_purchases),
        },
        balancedTargeting: {
          cryptoCurrency: normalizeInitialData(targeting.cryptocurrency_used),
          year: normalizeInitialData(targeting.account_age_year),
          months: normalizeInitialData(targeting.account_age_month),
          day: normalizeInitialData(targeting.account_age_day),
          airdropReceived: normalizeInitialData(targeting.airdrops_received),
        },
        audienceFile: item.file,
        name: item.name,
      };
    });
    setLogoCollection({
      preview: adsLogo && adsLogo.url ? `${BACKEND_URL}${adsLogo.url}` : null,
    });
    setBannerCollection({
      preview: adsBanner && adsBanner.url ? `${BACKEND_URL}${adsBanner.url}` : null,
    });
    setAudienceForm(audienceArr);
    setFormValues({
      ads_page_name: adsPage?.name,
      ads_page_description: adsPage?.description,
      ads_page_website: adsPage?.website,
      ads_page_discord: adsPage?.discord,
      ads_page_medium: adsPage?.medium,
      ads_page_telegram: adsPage?.telegram,
      ads_page_token_name: adsPage?.token_name,
      ads_page_token_symbol: adsPage?.token_symbol,
    });

    const getTotalBudgetAds = sumArr(data?.audiences, 'price');

    setTotalBudget(getTotalBudgetAds);
  }, [data]);

  const sumArr = (arr, val) => {
    return data?.audiences
      .map((item) => item[val])
      .reduce((a, b) => {
        return a + b;
      });
  };

  function normalizeInitialData(value) {
    if (value === '0' || value === 0) {
      return null;
    }
    return value;
  }

  function sectionTitle(title) {
    return (
      <div style={{ marginLeft: 25 }}>
        <Typography fontSize={20} fontWeight={800} marginBottom={3}>
          {title}
        </Typography>
      </div>
    );
  }

  function renderHeader() {
    return (
      <div className={styles.ctnHeader}>
        <Typography textAlign={'center'} fontSize={20} fontWeight={700}>
          {data?.name}
        </Typography>
        <div className={styles.ctnClose}>
          <Iconify icon={'ant-design:close-outlined'} width={24} height={24} onClick={close} />
        </div>
      </div>
    );
  }

  function renderCampainNameSection() {
    return (
      <Grid container className={styles.section1}>
        <Grid style={{ width: '45%', padding: 10 }}>
          <div className={styles.ctnTextLayout1}>
            <Typography fontSize={18} fontWeight={400}>
              Campaign Name:
            </Typography>
            <Typography fontSize={18} fontWeight={800}>
              {data?.name}
            </Typography>
          </div>
          <div className={styles.ctnTextLayout1}>
            <Typography fontSize={18} fontWeight={400}>
              Start Date:
            </Typography>
            <Typography fontSize={18} fontWeight={800}>
              {data?.start_date}
            </Typography>
          </div>
        </Grid>
        <Grid style={{ width: '45%', padding: 10 }}>
          <div className={styles.ctnTextLayout1}>
            <Typography fontSize={18} fontWeight={400}>
              Total Budget:
            </Typography>
            <Typography fontSize={18} fontWeight={800}>
              USD{normalizeCurrency(totalBudget)}
            </Typography>
          </div>
          <div className={styles.ctnTextLayout1}>
            <Typography fontSize={18} fontWeight={400}>
              Availability:
            </Typography>
            <Typography fontSize={18} fontWeight={800}>
              {data?.availability} days
            </Typography>
          </div>
        </Grid>
      </Grid>
    );
  }

  function renderCardAudience() {
    return (
      <div>
        {sectionTitle('Audiences:')}
        <div className={styles.ctnRowAudience}>
          <Grid container spacing={2}>
            {audienceForm?.map((item, index) => (
              <Grid
                item
                md={4}
                lg={3}
                sm={6}
                xs={6}
                className={styles.ctnSectionAd}
                key={item.audienceId}
                id={`card-audience-${index}`}
              >
                <CardAudience key={index.toString()} data={item} readOnly={true} label={item.name} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    );
  }

  function renderCollection() {
    return (
      <div>
        <Grid container className={styles.section2}>
          <Grid style={{ width: '60%' }}>
            <Typography fontSize={20} fontWeight={700} marginBottom={3}>
              Collection Page:
            </Typography>
            <CollectionPreview
              fromModal={true}
              formValues={formValues}
              logoSource={
                logoCollection === null
                  ? null
                  : typeof file === 'string'
                  ? logoCollection
                  : logoCollection.preview || null
              }
              bannerSource={
                bannerCollection === null
                  ? null
                  : typeof file === 'string'
                  ? bannerCollection
                  : bannerCollection.preview || null
              }
            />
          </Grid>
          <Grid style={{ width: '40%', paddingLeft: 50 }}>
            <Grid container display={'flex'} flexDirection={'column'}>
              <Grid height={250}>
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
              </Grid>
              {formValues?.ads_page_token_name && (
                <Grid>
                  <Typography fontSize={20} fontWeight={700} marginBottom={1}>
                    Token Tracker
                  </Typography>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {formValues?.ads_page_token_name && (
                      <div className={styles.ctnSocial}>
                        <img src={tokenIcon} alt="discord" />
                        <Typography fontSize={15} fontWeight={400} color={'#7089FF'}>
                          {formValues?.ads_page_token_name} ({formValues?.ads_page_token_symbol})
                        </Typography>
                      </div>
                    )}
                  </div>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

  function renderAdsCard() {
    return (
      <div className={styles.ctnRowAudience}>
        {sectionTitle('Ads used in this campaign:')}
        <Grid container spacing={2}>
          {data?.ads.map((item, index) => (
            <Grid
              item
              md={3}
              lg={3}
              sm={12}
              xs={12}
              className={styles.ctnSectionAd}
              key={item.id}
              id={`ads-card-${index}`}
            >
              <AdsCard item={item} audienceData={data?.audiences} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }

  function renderContent() {
    return (
      <div className={styles.modalWrapper}>
        {renderCampainNameSection()}
        <Divider variant="middle" style={{ marginBottom: 10 }} />
        {renderCardAudience()}
        <Divider variant="middle" />
        {renderCollection()}
        <Divider variant="middle" style={{ marginBottom: 10, marginTop: 20 }} />
        {renderAdsCard()}
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
