import React, { useEffect, useState, Fragment } from 'react';
import Page from '../../components/Page';
import Layout from '../../layouts';
import HeaderUser from '../../components/header-user';
import useStyles from './styles';
import { Box, Grid, Popover, Typography } from '@mui/material';
import { getCampaignItem, getAudienceByCampaignID, getListCampaign } from '../../utils/requests';
import { getUserData } from '../../helpers/auth';
import { dateToUnix } from '../../helpers/dateHelper';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DefaultButton from '../../components/default-button';
import FormControl from '@mui/material/FormControl';

Overview.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

const downloadIcon = '/assets/svg/download.svg';
const iconShort = '/assets/short_icon.png';
const banner = '/assets/Banner.png';

export default function Overview({ content, listCampaign, ctx }) {
  const styles = useStyles();

  const [listContent, setContent] = useState({
    sortItem: 'a-z',
    content: content.data || [],
  });

  useEffect(() => {
    console.log(content);
  }, []);

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

  const handleChangeSelect = async (e) => {
    const res = await getAudienceByCampaignID(e.target.value);
    const listCampaign = await getListCampaign();
    console.log(listCampaign);
  };

  function renderTitleCampaignOverview() {
    return (
      <div className={styles.ctnTitle}>
        <Typography variant="h6">Campaign Overview</Typography>
      </div>
    );
  }

  const renderStatus = (status) => {
    if (status === 1) {
      return (
        <div className={styles.statusContainer}>
          <div style={{ width: 6, height: 6, backgroundColor: '#FFAC00', borderRadius: 10, marginRight: 10 }} />
          <Typography>In review</Typography>
        </div>
      );
    }
  };

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
          <Typography variant="body1" fontWeight={'bold'} alignItems={'center'}>
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
              <Grid item md={1.5} sm={12} alignItems={'center'}>
                <Typography variant="body1">{renderStatus(item.status)}</Typography>
              </Grid>
              <Grid item md={1.5} sm={12}>
                <Typography variant="body1">{item.count_airdrop ?? '-'}</Typography>
              </Grid>
              <Grid item md={2} sm={12}>
                <Typography variant="body1">{item.count_impression ?? '-'}</Typography>
              </Grid>
              <Grid item md={2} sm={12}>
                <Typography variant="body1">{item.count_view ?? '-'}</Typography>
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
      <>
        <div className={styles.ctnTitle}>
          <Typography variant="h6">Audience Overview</Typography>
        </div>
        <div className={styles.ctnTitle}>
          <Grid container>
            <Grid item md={6} sm={12} display="flex">
              <FormControl sx={{ m: 1, minWidth: '100%' }} size="small">
                <Select
                  displayEmpty
                  onChange={handleChangeSelect}
                  className={styles.ctnSelect}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  {listContent.content.map((v, i) => (
                    <MenuItem key={`list+${i}`} value={v.id}>
                      {v.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} sm={12}>
              <DefaultButton
                // isLoading={loadingSubmit}
                // onClick={validateSubmit}
                ctnBtnStyle={styles.btnExportToExcel}
                eventName={'Setup Airdrop'}
                // onClick={() => {
                //   setModalSuccess('cryptocurrency')
                // }}
                label={'Export to excel'}
              />
            </Grid>
          </Grid>
        </div>
      </>
    );
  }

  function renderListTitleAudienceOverview() {
    return (
      <Grid container spacing={3}>
        <Grid item md={2} sm={12} display="flex">
          <Typography variant="body1" fontWeight={'bold'} onClick={handleSort} sx={{ cursor: 'pointer' }}>
            Audience
          </Typography>
          <div className={styles.ctnIconShort} onClick={handleSort}>
            <img src={iconShort} alt="ic-short" />
          </div>
        </Grid>
        <Grid item md={2.5} sm={12}>
          <Typography variant="body1" fontWeight={'bold'}>
            Ad creative
          </Typography>
        </Grid>
        <Grid item md={1.5} sm={12}>
          <Typography variant="body1" fontWeight={'bold'}>
            Airdrops
          </Typography>
        </Grid>
        <Grid item md={1.5} sm={12}>
          <Typography variant="body1" fontWeight={'bold'}>
            Impressions
          </Typography>
        </Grid>
        <Grid item md={1.5} sm={12}>
          <Typography variant="body1" fontWeight={'bold'}>
            Views
          </Typography>
        </Grid>
        <Grid item md={1.5} sm={12}>
          <Typography variant="body1" fontWeight={'bold'}>
            Link clicks
          </Typography>
        </Grid>
        <Grid item md={1.5} sm={12}>
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

  function renderBanner() {
    return (
      <div className={styles.bannerContainer}>
        <img src={banner} alt="banner" />
      </div>
    );
  }

  return (
    <Page title="Campaign Creation" description="Create your campaign on WALLETADS now!">
      <div className={styles.ctnRoot}>
        <div className={styles.ctnWrapper}>
          <div className={styles.p20}>
            <HeaderUser />
          </div>
          {renderBanner()}
          <div className={styles.p20}>
            {renderContentCampaignOverview()}
            {renderContentAucienceOverview()}
          </div>
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
  // const listCampaign = await getListCampaign();

  // console.log(listCampaign);

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
      // listCampaign: listCampaign,
    }, // will be passed to the page component as props
  };
}
