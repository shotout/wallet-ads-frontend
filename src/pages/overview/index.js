import React, { useEffect, useState, Fragment } from 'react';
import Page from '../../components/Page';
import Layout from '../../layouts';
import HeaderUser from '../../components/header-user';
import useStyles from './styles';
import { Box, Grid, Popover, Typography } from '@mui/material';
import AuthFooter from '../../components/auth-footer';
import { getCampaignItem, getListCampaignDashboard } from '../../utils/requests';
import { getUserData } from '../../helpers/auth';
import { dateToUnix } from '../../helpers/dateHelper';

Overview.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

const downloadIcon = '/assets/svg/download.svg';
const iconShort = '/assets/short_icon.png';

export default function Overview({ content }) {
  const styles = useStyles();

  const [listContent, setContent] = useState({
    sortItem: 'a-z',
    content: content.data || [],
  });

  useEffect(() => {}, []);

  const handleSort = () => {
    if (listContent.sortItem === 'a-z') {
      setContent({
        sortItem: 'z-a',
        content: listContent.content.sort((a, b) => dateToUnix(b.invoice_date) - dateToUnix(a.invoice_date)),
      });
    }
    if (listContent.sortItem === 'z-a') {
      setContent({
        sortItem: 'a-z',
        content: listContent.content.sort((a, b) => dateToUnix(a.invoice_date) - dateToUnix(b.invoice_date)),
      });
    }
  };

  function renderTitleCampaignOverview() {
    return (
      <div className={styles.ctnTitle}>
        <Typography variant="h6">Campaign Overview</Typography>
      </div>
    );
  }

  function renderListTitleCampaignOverview() {
    return (
      <Grid container spacing={3}>
        <Grid item md={2} sm={12} display="flex">
          <Typography variant="body1" fontWeight={'bold'} onClick={handleSort} sx={{ cursor: 'pointer' }}>
            Campaign
          </Typography>
          <div className={styles.ctnIconShort} onClick={handleSort}>
            <img src={iconShort} alt="ic-short" />
          </div>
        </Grid>
        <Grid item md={1.5} sm={12}>
          <Typography variant="body1" fontWeight={'bold'}>
            Status
          </Typography>
        </Grid>
        <Grid item md={1.5} sm={12}>
          <Typography variant="body1" fontWeight={'bold'}>
            Airdrops
          </Typography>
        </Grid>
        <Grid item md={2} sm={12}>
          <Typography variant="body1" fontWeight={'bold'}>
            Impressions
          </Typography>
        </Grid>
        <Grid item md={2} sm={12}>
          <Typography variant="body1" fontWeight={'bold'}>
            Views
          </Typography>
        </Grid>
        <Grid item md={2} sm={12}>
          <Typography variant="body1" fontWeight={'bold'}>
            Link clicks
          </Typography>
        </Grid>
        <Grid item md={1} sm={12}>
          <Typography variant="body1" fontWeight={'bold'}>
            Mints
          </Typography>
        </Grid>
      </Grid>
    );
  }

  function renderListItemCampaignOverview() {
    if (content.data.length === 0) {
      return (
        <div className={styles.ctnItem}>
          <Typography variant="h4" color="#B3B3B3" marginY={4} textAlign={'center'}>
            No invoices available
          </Typography>
        </div>
      );
    }
    return (
      <div className={styles.ctnItem}>
        <Grid container spacing={3}>
          {listContent.content.map((item) => (
            <Fragment key={item.id.toString()}>
              <Grid item md={2} sm={12} display="flex">
                <Typography variant="body1">{item.name}</Typography>
              </Grid>
              <Grid item md={1.5} sm={12}>
                <Typography variant="body1">{item.status}</Typography>
              </Grid>
              <Grid item md={1.5} sm={12}>
                <Typography variant="body1">{item.count_airdrop ?? '-'}</Typography>
              </Grid>
              <Grid item md={2} sm={12}>
                <Typography variant="body1">{item.count_airdrop ?? '-'}</Typography>
              </Grid>
              <Grid item md={2} sm={12}>
                <Typography variant="body1">{item.count_airdrop ?? '-'}</Typography>
              </Grid>
              <Grid item md={2} sm={12}>
                <Typography variant="body1">{item.count_click ?? '-'}</Typography>
              </Grid>
              <Grid item md={1} sm={12}>
                <Typography variant="body1">{item.count_mint ?? '-'}</Typography>
              </Grid>
            </Fragment>
          ))}
        </Grid>
      </div>
    );
  }

  function renderTitleAudienceOverview() {
    return (
      <div className={styles.ctnTitle}>
        <Typography variant="h6">Audience Overview</Typography>
      </div>
    );
  }

  function renderListTitleAudienceOverview() {
    return (
      <Grid container spacing={3}>
        <Grid item md={1.8} sm={12} display="flex">
          <Typography variant="body1" fontWeight={'bold'} onClick={handleSort} sx={{ cursor: 'pointer' }}>
            Audience
          </Typography>
          <div className={styles.ctnIconShort} onClick={handleSort}>
            <img src={iconShort} alt="ic-short" />
          </div>
        </Grid>
        <Grid item md={2.4} sm={12}>
          <Typography variant="body1" fontWeight={'bold'}>
            Ad creative
          </Typography>
        </Grid>
        <Grid item md={2} sm={12}>
          <Typography variant="body1" fontWeight={'bold'}>
            Airdrops
          </Typography>
        </Grid>
        <Grid item md={1.8} sm={12}>
          <Typography variant="body1" fontWeight={'bold'}>
            Impressions
          </Typography>
        </Grid>
        <Grid item md={2} sm={12}>
          <Typography variant="body1" fontWeight={'bold'}>
            Views
          </Typography>
        </Grid>
        <Grid item md={2} sm={12}>
          <Typography variant="body1" fontWeight={'bold'}>
            Link clicks
          </Typography>
        </Grid>
        <Grid item md={2} sm={12}>
          <Typography variant="body1" fontWeight={'bold'}>
            Mints
          </Typography>
        </Grid>
      </Grid>
    );
  }

  function renderContentCampaignOverview() {
    return (
      <div className={styles.ctnContent2}>
        <div className={styles.ctnCard}>
          {renderTitleCampaignOverview()}
          {renderListTitleCampaignOverview()}
          {renderListItemCampaignOverview()}
        </div>
      </div>
    );
  }

  function renderContentAucienceOverview() {
    return (
      <div className={styles.ctnContent}>
        <div className={styles.ctnCard}>
          {renderTitleAudienceOverview()}
          {renderListTitleAudienceOverview()}
        </div>
      </div>
    );
  }

  return (
    <Page title="Campaign Creation" description="Create your campaign on WALLETADS now!">
      <div className={styles.ctnRoot}>
        <div className={styles.ctnWrapper}>
          <HeaderUser />
          {renderContentCampaignOverview()}
          {renderContentAucienceOverview()}
        </div>
      </div>
    </Page>
  );
}

export async function getServerSideProps(context) {
  const userData = getUserData(context);
  const UA = context.req.headers['user-agent'];
  const isMobile = Boolean(UA.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
  if (isMobile) {
    return {
      redirect: {
        permanent: false,
        destination: `/forbidden`,
      },
    };
  }

  const res = await getCampaignItem(context);

  if (!userData) {
    return {
      redirect: {
        permanent: false,
        destination: `/login`,
      },
    };
  }
  return {
    props: {
      userData,
      content: res.data || [],
    }, // will be passed to the page component as props
  };
}
