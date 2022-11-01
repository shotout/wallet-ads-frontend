import React, { useEffect, useState, Fragment } from 'react';
import Page from '../../components/Page';
import Layout from '../../layouts';
import HeaderUser from '../../components/header-user';
import useStyles from './styles';
import { Grid, Popover, Typography, Box } from '@mui/material';
import { getCampaignItem, getAudienceByCampaignID, getListCampaign } from '../../utils/requests';
import { getUserData } from '../../helpers/auth';
import { dateToUnix } from '../../helpers/dateHelper';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DefaultButton from '../../components/default-button';
import FormControl from '@mui/material/FormControl';
import ChartBar from '../../components/chart-bar';

Overview.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

const url = process.env.BACKEND_URL;

const downloadIcon = '/assets/svg/download.svg';
const iconShort = '/assets/short_icon.png';
const banner = '/assets/Banner.png';
const askIcon = '/assets/ask_icon.png';

const impressionText =
  'These results may not include all Impression data. Statistical modeling may be used to provide more complete measurement when Impression data may be missing or partial.';

export default function Overview({ content, listCampaign }) {
  const styles = useStyles();

  const [hover, setHover] = useState(null);
  const [activePopover, setActivePopover] = useState(null);
  const [listContent, setContent] = useState({
    sortItem: 'a-z',
    content: content.data || [],
  });
  const [listCampaigns, setListCampaigns] = useState({
    content: listCampaign || [],
  });
  const [campaignID, setCapmapaignID] = useState();
  const [campaignName, setCapmapaignName] = useState();
  const [listAudience, setListAudience] = useState({
    sortItem: 'a-z',
    content: [],
  });
  const [chartDatas, setChartDatas] = useState({
    labels: [],
    airdrops: [],
    linkClicks: [],
  });

  useEffect(() => {
    initFunction(listCampaign);
  }, []);

  const initFunction = async (val) => {
    handleGetAudience(val[0].id, val[0].name);
  };

  const handleGetAudience = async (id, name) => {
    const labels = [];
    const airdrops = [];
    const linkClicks = [];
    const res = await getAudienceByCampaignID(id);
    setCapmapaignID(id);
    setCapmapaignName(name);
    setListAudience({ ...listAudience, content: res.data });
    res.data.audiences.forEach((element) => {
      labels.push(element.name);
      airdrops.push(element.ads.count_airdrop);
      linkClicks.push(element.ads.count_click);
    });
    setChartDatas({ labels: labels, airdrops: airdrops, linkClicks: linkClicks });
  };

  function renderPopover(type, content) {
    return (
      <Popover
        id={type}
        open={Boolean(hover) && activePopover === type}
        anchorEl={hover}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onClose={handleHoverClose}
        disableRestoreFocus
        sx={{
          pointerEvents: 'none',
        }}
        className={styles.ctnPopover}
      >
        <Box sx={{ p: 2, maxWidth: 260 }}>
          <Typography variant="body2" sx={{ color: '#fff' }} textAlign="center">
            {content || ''}
          </Typography>
        </Box>
      </Popover>
    );
  }

  const handleSort = (parent, type, child) => {
    if (parent === 'campaign') {
      if (listContent.sortItem === 'a-z') {
        setContent({
          sortItem: 'z-a',
          content: listContent.content.sort((a, b) => a.toString().localeCompare(b.name)),
        });
      }
      if (listContent.sortItem === 'z-a') {
        setContent({
          sortItem: 'a-z',
          content: listContent.content.sort((a, b) => b.toString().localeCompare(a.name)),
        });
      }
    } else {
      console.log('here');
      if (listAudience.sortItem === 'a-z') {
        setListAudience({
          sortItem: 'z-a',
          content: listAudience.content?.audiences.sort((a, b) => b.name - a.name),
        });
      }
      if (listAudience.sortItem === 'z-a') {
        setListAudience({
          sortItem: 'a-z',
          content: listAudience.content?.audiences.sort((a, b) => a.name - b.name),
        });
      }
    }
  };

  const handleHoverOpen = (event, popoverName) => {
    setHover(event.currentTarget);
    setActivePopover(popoverName);
  };

  const handleHoverClose = () => {
    setHover(null);
  };

  const handleChangeSelect = async (e) => {
    const campName = listCampaigns.content.filter((val) => val.id === e.target.value);
    handleGetAudience(e.target.value, campName[0].name);
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
          <Typography
            variant="body1"
            fontWeight={'bold'}
            onClick={() => handleSort('campaign', 'name')}
            sx={{ cursor: 'pointer' }}
          >
            Campaign
          </Typography>
          <div className={styles.ctnIconShort} onClick={() => handleSort('campaign', 'name')}>
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
          <div className={styles.leftTitle}>
            <Typography variant="body1" fontWeight={'bold'}>
              Impressions
            </Typography>
            <img
              onMouseEnter={(event) => {
                handleHoverOpen(event, 'logo_text_banner');
              }}
              onMouseLeave={handleHoverClose}
              src={askIcon}
              alt="ask"
            />
            {renderPopover('logo_text_banner', impressionText)}
          </div>
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
                  defaultValue={campaignID}
                  defaultChecked={campaignID}
                  value={campaignID}
                  displayEmpty
                  onChange={handleChangeSelect}
                  className={styles.ctnSelect}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  {listCampaigns.content.map((v, i) => (
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

  function renderListItemAudienceOverview() {
    if (listCampaigns.content.length === 0) {
      return (
        <div className={styles.ctnItem}>
          <Typography variant="h4" color="#B3B3B3" marginY={4} textAlign={'center'}>
            No Audience available
          </Typography>
        </div>
      );
    }
    return (
      <div className={styles.ctnItem}>
        <Grid container spacing={3}>
          {listAudience.content.audiences?.map((item) => (
            <Fragment key={item.id.toString()}>
              <Grid item md={2} sm={12} display="flex" alignItems={'center'}>
                <Typography variant="body1">{item.name}</Typography>
              </Grid>
              <Grid item md={2.5} sm={12} alignItems={'center'}>
                <div className={styles.statusContainer}>
                  <img src={`${url + item.ads.image.url}`} />
                  <Typography variant="body1">{item.ads.name}</Typography>
                </div>
              </Grid>
              <Grid item md={1.5} sm={12} display="flex" alignItems={'center'}>
                <Typography variant="body1">{item.ads.count_airdrop ?? '-'}</Typography>
              </Grid>
              <Grid item md={1.5} sm={12} display="flex" alignItems={'center'}>
                <Typography variant="body1">{item.ads.count_impression ?? '-'}</Typography>
              </Grid>
              <Grid item md={1.5} sm={12} display="flex" alignItems={'center'}>
                <Typography variant="body1">{item.ads.count_view ?? '-'}</Typography>
              </Grid>
              <Grid item md={1.5} sm={12} display="flex" alignItems={'center'}>
                <Typography variant="body1">{item.ads.count_click ?? '-'}</Typography>
              </Grid>
              <Grid item md={1.5} sm={12} display="flex" alignItems={'center'}>
                <Typography variant="body1">{item.ads.count_mint ?? '-'}</Typography>
              </Grid>
            </Fragment>
          ))}
        </Grid>
      </div>
    );
  }

  function renderListTitleAudienceOverview() {
    return (
      <Grid container spacing={3}>
        <Grid item md={2} sm={12} display="flex">
          <Typography
            variant="body1"
            fontWeight={'bold'}
            onClick={() => handleSort('audience', 'name')}
            sx={{ cursor: 'pointer' }}
          >
            Audience
          </Typography>
          <div className={styles.ctnIconShort} onClick={() => handleSort('audience', 'name')}>
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
          <div className={styles.leftTitle}>
            <Typography variant="body1" fontWeight={'bold'}>
              Impressions
            </Typography>
            <img
              onMouseEnter={(event) => {
                handleHoverOpen(event, 'logo_text_banner');
              }}
              onMouseLeave={handleHoverClose}
              src={askIcon}
              alt="ask"
            />
            {renderPopover('logo_text_banner', impressionText)}
          </div>
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

  function renderChartBar() {
    return (
      <Grid container spacing={3} marginTop={2}>
        <Grid item md={6} sm={12}>
          <div className={styles.ctnCard}>
            <div className={styles.ctnTitle}>
              <Typography variant="h6">{campaignName} - Airdrops</Typography>
            </div>
            <ChartBar labels={chartDatas.labels} datas={chartDatas.airdrops} />
          </div>
        </Grid>
        <Grid item md={6} sm={12}>
          <div className={styles.ctnCard}>
            <div className={styles.ctnTitle}>
              <Typography variant="h6">{campaignName} - Link Clicks</Typography>
            </div>
            <ChartBar labels={chartDatas.labels} datas={chartDatas.linkClicks} />
          </div>
        </Grid>
      </Grid>
    );
  }

  function renderContentAucienceOverview() {
    return (
      <div className={styles.ctnContent}>
        <div className={styles.ctnCard}>
          {renderTitleAudienceOverview()}
          {renderListTitleAudienceOverview()}
          {renderListItemAudienceOverview()}
        </div>
        <div>{renderChartBar()}</div>
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
    <Page title="Overview" description="Overview">
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
  const listCampaign = await getListCampaign(context);

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
      listCampaign: listCampaign.data || [],
    }, // will be passed to the page component as props
  };
}
