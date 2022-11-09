import React, { useEffect, useState, Fragment } from 'react';
import Page from '../../components/Page';
import Layout from '../../layouts';
import HeaderUser from '../../components/header-user';
import useStyles from './styles';
import { Grid, Popover, Typography, Box } from '@mui/material';
import {
  getCampaignItem,
  getAudienceByCampaignID,
  getListCampaign,
  getCampaignDetail,
  exportAudienceByCampaignID,
} from '../../utils/requests';
import { getUserData } from '../../helpers/auth';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DefaultButton from '../../components/default-button';
import FormControl from '@mui/material/FormControl';
import ChartBar from '../../components/chart-bar';
import CampaignModal from './../../../src/components/campaign-modal';
import { routes } from '../../helpers/routes';
import { useRouter } from 'next/router';

Overview.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

const url = process.env.BACKEND_URL;
const iconShort = '/assets/short_icon.png';
const banner = '/assets/Banner.png';
const askIcon = '/assets/ask_icon.png';

const impressionText =
  'These results may not include all Impression data. Statistical modeling may be used to provide more complete measurement when Impression data may be missing or partial.';

export default function Overview({ content, listCampaign, ctx }) {
  const styles = useStyles();
  const router = useRouter();
  const [hover, setHover] = useState(null);
  const [campaignModal, setCampaignModal] = useState(false);
  const [activePopover, setActivePopover] = useState(null);
  const [listContent, setContent] = useState({
    sortItem: true,
    content: content.data || [],
  });
  const [listCampaigns, setListCampaigns] = useState({
    content: listCampaign || [],
  });
  const [campaignID, setCapmapaignID] = useState();
  const [campaignName, setCapmapaignName] = useState();
  const [listAudience, setListAudience] = useState({
    sortItem: true,
    content: [],
  });
  const [chartDatas, setChartDatas] = useState({
    labels: [],
    airdrops: [],
    linkClicks: [],
  });
  const [totalAudienceOverview, setTotalAudienceOverview] = useState({
    airdrops: 0,
    linkClicks: 0,
    impressions: 0,
    views: 0,
    mints: 0,
  });
  const [totalCampainOverview, setTotalCampaignOverview] = useState({
    airdrops: 0,
    linkClicks: 0,
    impressions: 0,
    views: 0,
    mints: 0,
  });
  const [pagination, setPagination] = useState({
    data: content.links,
    currentPage: content.current_page,
  });
  const [campaignDetails, setCampaignDetails] = useState(null);

  useEffect(() => {
    console.log(content);
    initFunction(listCampaign);
  }, []);

  const initFunction = async (val) => {
    handleGetAudience(val[0].id, val[0].name);
    sumCampainOverview(content.data);
  };

  const handleGetAudience = async (id, name) => {
    const labels = [];
    const airdrops = [];
    const linkClicks = [];
    const res = await getAudienceByCampaignID(id);
    setCapmapaignID(id);
    setCapmapaignName(name);
    setListAudience({ ...listAudience, content: res.data });
    console.log(res);
    res.data.audiences.forEach((element) => {
      labels.push(element.name);
      airdrops.push(element.ads.count_airdrop);
      linkClicks.push(element.ads.count_click);
    });
    const totalAirDrop = sumArr(res.data.audiences, 'count_airdrop', true);
    const totalClick = sumArr(res.data.audiences, 'count_click', true);
    const totalImpression = sumArr(res.data.audiences, 'count_impression', true);
    const totalMint = sumArr(res.data.audiences, 'count_mint', true);
    const totalView = sumArr(res.data.audiences, 'count_view', true);
    setTotalAudienceOverview({
      airdrops: totalAirDrop,
      linkClicks: totalClick,
      impressions: totalImpression,
      views: totalView,
      mints: totalMint,
    });
    setChartDatas({ labels: labels, airdrops: airdrops, linkClicks: linkClicks });
  };

  const sumCampainOverview = (val) => {
    const totalAirDrop = sumArr(val, 'count_airdrop', false);
    const totalClick = sumArr(val, 'count_click', false);
    const totalImpression = sumArr(val, 'count_impression', false);
    const totalMint = sumArr(val, 'count_mint', false);
    const totalView = sumArr(val, 'count_view', false);
    setTotalCampaignOverview({
      airdrops: totalAirDrop,
      linkClicks: totalClick,
      impressions: totalImpression,
      views: totalView,
      mints: totalMint,
    });
  };

  const sumArr = (arr, val, nested) => {
    return arr
      .map((item) => (nested ? item.ads[val] : item[val]))
      .reduce((a, b) => {
        return a + b;
      });
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

  const handleSort = (parent, number, child, identifier) => {
    if (parent === 'campaign') {
      setContent({
        sortItem: !listContent.sortItem,
        content: listContent.content.sort((a, b) =>
          listContent.sortItem
            ? number
              ? a[identifier] - b[identifier]
              : a.toString().localeCompare(b.name)
            : number
            ? b[identifier] - a[identifier]
            : b.toString().localeCompare(a.name)
        ),
      });
    } else {
      console.log('here');

      // setListAudience({
      //   sortItem: !listAudience.sortItem,
      //   content: listAudience.content?.audiences?.sort((a, b) =>
      //     listAudience.sortItem
      //       ? number
      //         ? a[identifier] - b[identifier]
      //         : a.toString().localeCompare(b.name)
      //       : number
      //       ? b[identifier] - a[identifier]
      //       : b.toString().localeCompare(a.name)
      //   ),
      // });
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
          <Typography variant="body1" fontWeight={'bold'} sx={{ cursor: 'pointer' }}>
            Campaign
          </Typography>
          <div className={styles.ctnIconShort} onClick={() => handleSort('campaign', false, '', 'name')}>
            <img src={iconShort} alt="ic-short" />
          </div>
        </Grid>
        <Grid item md={1.5} sm={12}>
          <Typography variant="body1" fontWeight={'bold'} alignItems={'center'}>
            Status
          </Typography>
        </Grid>
        <Grid item md={1.5} sm={12} display="flex">
          <Typography variant="body1" fontWeight={'bold'}>
            Airdrops
          </Typography>
          <div className={styles.ctnIconShort} onClick={() => handleSort('campaign', true, '', 'count_airdrop')}>
            <img src={iconShort} alt="ic-short" />
          </div>
        </Grid>
        <Grid item md={2} sm={12} display="flex">
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
          <div className={styles.ctnIconShort} onClick={() => handleSort('campaign', true, '', 'count_impression')}>
            <img src={iconShort} alt="ic-short" />
          </div>
        </Grid>
        <Grid item md={2} sm={12} display="flex">
          <Typography variant="body1" fontWeight={'bold'}>
            Views
          </Typography>
          <div className={styles.ctnIconShort} onClick={() => handleSort('campaign', true, '', 'count_view')}>
            <img src={iconShort} alt="ic-short" />
          </div>
        </Grid>
        <Grid item md={2} sm={12} display="flex">
          <Typography variant="body1" fontWeight={'bold'}>
            Link clicks
          </Typography>
          <div className={styles.ctnIconShort} onClick={() => handleSort('campaign', true, '', 'count_click')}>
            <img src={iconShort} alt="ic-short" />
          </div>
        </Grid>
        <Grid item md={1} sm={12} display="flex">
          <Typography variant="body1" fontWeight={'bold'}>
            Mints
          </Typography>
          <div className={styles.ctnIconShort} onClick={() => handleSort('campaign', true, '', 'count_mint')}>
            <img src={iconShort} alt="ic-short" />
          </div>
        </Grid>
      </Grid>
    );
  }

  const openCampaignModal = async (id) => {
    const res = await getCampaignDetail(ctx, id);
    setCampaignDetails(res.data);
    setCampaignModal(!campaignModal);
  };

  function renderListItemCampaignOverview() {
    if (content.data.length === 0) {
      return (
        <div className={styles.ctnItem}>
          <Typography variant="h4" color="#B3B3B3" marginY={4} textAlign={'center'}>
            No Campaign available
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
                <Typography variant="body1" style={{ cursor: 'pointer' }} onClick={() => openCampaignModal(item.id)}>
                  {item.name}
                </Typography>
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

  function renderPagination() {
    return (
      <div className={styles.paginationContainer}>
        {pagination.data?.map((v, i) => (
          <span
            key={`paginate-${i}`}
            className={v.active ? styles.isPaginateActive : null}
            onClick={() => getAnotherPage(v)}
          >
            {v.label.replace('&laquo;', '').replace('&raquo;', '')}
          </span>
        ))}
      </div>
    );
  }

  const getAnotherPage = async (page) => {
    if (!page.url) return;
    const pageIdentity = page.label.replace('&laquo;', '').replace('&raquo;', '');
    const pageParams = {
      ' Previous': pagination.currentPage - 1,
      'Next ': pagination.currentPage + 1,
    };
    const pages = await getCampaignItem(null, pageParams[pageIdentity] ?? page.label);

    setContent({
      ...content,
      content: pages.data.data,
    });
    await sumCampainOverview(pages.data.data);
    setPagination({ data: pages.data.links, currentPage: pages.data.current_page });
  };

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
                eventName={'Export to excel'}
                onClick={() => {
                  exportAudienceByCampaignID(listAudience.content?.campaign?.id);
                }}
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
          {listAudience.content?.audiences?.map((item) => (
            <Fragment key={item.id.toString()}>
              <Grid item md={2} sm={12} display="flex" alignItems={'center'}>
                <Typography variant="body1">{item.name}</Typography>
              </Grid>
              <Grid item md={2.5} sm={12} alignItems={'center'}>
                <div className={styles.statusContainer}>
                  <img src={`${url + item?.ads?.image.url}`} />
                  <Typography variant="body1">{item?.ads?.name}</Typography>
                </div>
              </Grid>
              <Grid item md={1.5} sm={12} display="flex" alignItems={'center'}>
                <Typography variant="body1">{item?.ads?.count_airdrop ?? '-'}</Typography>
              </Grid>
              <Grid item md={2} sm={12} display="flex" alignItems={'center'}>
                <Typography variant="body1">{item?.ads?.count_impression ?? '-'}</Typography>
              </Grid>
              <Grid item md={1.5} sm={12} display="flex" alignItems={'center'}>
                <Typography variant="body1">{item?.ads?.count_view ?? '-'}</Typography>
              </Grid>
              <Grid item md={1.5} sm={12} display="flex" alignItems={'center'}>
                <Typography variant="body1">{item?.ads?.count_click ?? '-'}</Typography>
              </Grid>
              <Grid item md={1} sm={12} display="flex" alignItems={'center'}>
                <Typography variant="body1">{item?.ads?.count_mint ?? '-'}</Typography>
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
          <Typography variant="body1" fontWeight={'bold'} sx={{ cursor: 'pointer' }}>
            Audience
          </Typography>
          <div className={styles.ctnIconShort} onClick={() => handleSort('audience', false, '', 'name')}>
            <img src={iconShort} alt="ic-short" />
          </div>
        </Grid>
        <Grid item md={2.5} sm={12}>
          <Typography variant="body1" fontWeight={'bold'}>
            Ad creative
          </Typography>
        </Grid>
        <Grid item md={1.5} sm={12} display="flex">
          <Typography variant="body1" fontWeight={'bold'}>
            Airdrops
          </Typography>
          <div className={styles.ctnIconShort} onClick={() => handleSort('audience', true, '', 'count_airdrop')}>
            <img src={iconShort} alt="ic-short" />
          </div>
        </Grid>
        <Grid item md={2} sm={12} display="flex">
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
          <div className={styles.ctnIconShort} onClick={() => handleSort('audience', true, '', 'count_impression')}>
            <img src={iconShort} alt="ic-short" />
          </div>
        </Grid>
        <Grid item md={1.5} sm={12} display="flex">
          <Typography variant="body1" fontWeight={'bold'}>
            Views
          </Typography>
          <div className={styles.ctnIconShort} onClick={() => handleSort('audience', true, '', 'count_view')}>
            <img src={iconShort} alt="ic-short" />
          </div>
        </Grid>
        <Grid item md={1.5} sm={12} display="flex">
          <Typography variant="body1" fontWeight={'bold'}>
            Link clicks
          </Typography>
          <div className={styles.ctnIconShort} onClick={() => handleSort('audience', true, '', 'count_click')}>
            <img src={iconShort} alt="ic-short" />
          </div>
        </Grid>
        <Grid item md={1} sm={12} display="flex">
          <Typography variant="body1" fontWeight={'bold'}>
            Mints
          </Typography>
          <div className={styles.ctnIconShort} onClick={() => handleSort('audience', true, '', 'count_mint')}>
            <img src={iconShort} alt="ic-short" />
          </div>
        </Grid>
      </Grid>
    );
  }

  function renderTotalAudienceOverview() {
    return (
      <>
        <div className={styles.ctnTitle} />
        <Grid container spacing={3}>
          <Grid item md={2} sm={12} display="flex">
            <Typography variant="body1" fontWeight={'bold'}>
              Total
            </Typography>
          </Grid>
          <Grid item md={2.5} sm={12}>
            <Typography variant="body1" fontWeight={'bold'}>
              {''}
            </Typography>
          </Grid>
          <Grid item md={1.5} sm={12}>
            <Typography variant="body1" fontWeight={'bold'}>
              {totalAudienceOverview.airdrops ?? 0}
            </Typography>
          </Grid>
          <Grid item md={2} sm={12}>
            <Typography variant="body1" fontWeight={'bold'}>
              {totalAudienceOverview.impressions ?? 0}
            </Typography>
          </Grid>
          <Grid item md={1.5} sm={12}>
            <Typography variant="body1" fontWeight={'bold'}>
              {totalAudienceOverview.views ?? 0}
            </Typography>
          </Grid>
          <Grid item md={1.5} sm={12}>
            <Typography variant="body1" fontWeight={'bold'}>
              {totalAudienceOverview.linkClicks ?? 0}
            </Typography>
          </Grid>
          <Grid item md={1} sm={12}>
            <Typography variant="body1" fontWeight={'bold'}>
              {totalAudienceOverview.mints ?? 0}
            </Typography>
          </Grid>
        </Grid>
        <div className={styles.ctnTitle} />
      </>
    );
  }

  function renderTotalCampaignOverview() {
    return (
      <>
        <div className={styles.ctnTitle} />
        <Grid container spacing={3}>
          <Grid item md={2} sm={12} display="flex">
            <Typography variant="body1" fontWeight={'bold'}>
              Total
            </Typography>
          </Grid>
          <Grid item md={1.5} sm={12}>
            <Typography variant="body1" fontWeight={'bold'}>
              {''}
            </Typography>
          </Grid>
          <Grid item md={1.5} sm={12}>
            <Typography variant="body1" fontWeight={'bold'}>
              {totalCampainOverview.airdrops ?? 0}
            </Typography>
          </Grid>
          <Grid item md={2} sm={12}>
            <Typography variant="body1" fontWeight={'bold'}>
              {totalCampainOverview.impressions ?? 0}
            </Typography>
          </Grid>
          <Grid item md={2} sm={12}>
            <Typography variant="body1" fontWeight={'bold'}>
              {totalCampainOverview.views ?? 0}
            </Typography>
          </Grid>
          <Grid item md={2} sm={12}>
            <Typography variant="body1" fontWeight={'bold'}>
              {totalCampainOverview.linkClicks ?? 0}
            </Typography>
          </Grid>
          <Grid item md={1} sm={12}>
            <Typography variant="body1" fontWeight={'bold'}>
              {totalCampainOverview.mints ?? 0}
            </Typography>
          </Grid>
        </Grid>
        <div className={styles.ctnTitle} />
      </>
    );
  }

  function renderContentCampaignOverview() {
    return (
      <div className={styles.ctnContent2}>
        <div className={styles.ctnCard}>
          {renderTitleCampaignOverview()}
          {renderListTitleCampaignOverview()}
          {renderListItemCampaignOverview()}
          {renderTotalCampaignOverview()}
          {renderPagination()}
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
          {renderTotalAudienceOverview()}
        </div>
        <div>{renderChartBar()}</div>
      </div>
    );
  }

  function renderBanner() {
    return (
      <div className={styles.bannerContainer}>
        <img
          src={banner}
          style={{ cursor: 'pointer' }}
          alt="banner"
          onClick={() => router.push(routes.createCampaign)}
        />
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
      <CampaignModal isVisible={campaignModal} data={campaignDetails} close={() => setCampaignModal(false)} />
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

  const res = await getCampaignItem(context, 1);
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
      // ctx: context,
    }, // will be passed to the page component as props
  };
}
