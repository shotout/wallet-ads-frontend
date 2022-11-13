/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, Fragment } from 'react';
import Page from '../../components/Page';
import Layout from '../../layouts';
import HeaderUser from '../../components/header-user';
import useStyles from './styles';
import { Grid, Popover, Typography, Box, Tooltip } from '@mui/material';
import {
  getCampaignItem,
  getAudienceByCampaignID,
  getListCampaign,
  getCampaignDetail,
  getListCampaignItem,
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
import { shortString } from '../../helpers/shortString';
import { useRouter } from 'next/router';
import { normalizeCurrency } from '../../helpers/currency';
import moment from 'moment';

Overview.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

const url = process.env.BACKEND_URL;
const iconShort = '/assets/short_icon.png';
const banner = '/assets/Banner.svg';
const button = '/assets/Button.svg';
const nextIcon = '/icons/ic_next.svg';
const prevIcon = '/icons/ic_prev.svg';
const nextActiveIcon = '/icons/ic_next_active.svg';
const prevActiveIcon = '/icons/ic_prev_active.svg';
const askIcon = '/assets/ask_icon.png';
const timerIcon = '/icons/ic_timer.svg';
const expandIcon = '/icons/ic_expand.svg';
const expandIconWhite = '/icons/ic_expand_white.svg';

const impressionText =
  'These results may not include all Impression data. Statistical modeling may be used to provide more complete measurement when Impression data may be missing or partial.';

export default function Overview({ content, listCampaign, paginations, ctx }) {
  const styles = useStyles();
  const router = useRouter();
  const [hover, setHover] = useState(null);
  const [hoverImage, setHoverImage] = useState(null);
  const [activePopoverImage, setActivePopoverImage] = useState(null);
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
    data: paginations,
    currentPage: content.current_page,
  });
  const [campaignDetails, setCampaignDetails] = useState(null);
  const [dataPopover, setDataPopover] = useState(null);
  useEffect(() => {
    // console.log(content);
    initFunction(listCampaign);
  }, []);

  const initFunction = async (val) => {
    const index = listCampaign.length;
    handleGetAudience(val[listCampaign.length - 1]?.id, val[listCampaign.length - 1]?.name);
    sumCampainOverview(content.data);
  };

  const handleGetAudience = async (id, name) => {
    const labels = [];
    const airdrops = [];
    const linkClicks = [];
    const res = await getAudienceByCampaignID(id);
    const res2 = await getCampaignDetail(ctx, id);
    setCapmapaignID(id);
    setCapmapaignName(name);
    setListAudience({ ...listAudience, content: res.data.audiences });
    console.log(res);
    console.log(res2);
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
    return (
      arr.length !== 0 &&
      arr
        .map((item) => (nested ? item?.ads[val] : item[val]))
        .reduce((a, b) => {
          return a + b;
        })
    );
  };

  const handleHoverOpen = (event, popoverName, data) => {
    console.log(data);
    event.preventDefault();
    setHover(event.currentTarget);
    setActivePopover(popoverName);
    setDataPopover(data);
  };

  const handleHoverClose = () => {
    setHover(null);
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
        className={type === 'banner_image' ? styles.ctnPopoverWhite : styles.ctnPopoverBlack}
      >
        <Box sx={{ p: 1, maxWidth: 260 }}>
          <Typography variant="body2" sx={{ color: '#fff' }} textAlign="center">
            {type === 'banner_image' && (
              <>
                <div className={styles.imageProver}>
                  <img src={dataPopover?.img} style={{ width: 180 }} />
                </div>
                <div className={styles.adtextContainer}>
                  <Typography variant="body1" color={'black'} textAlign={'justify'}>
                    {dataPopover?.desc}
                  </Typography>
                </div>
              </>
            )}
            {type === 'logo_text_banner' && (
              <>
                <Typography variant="body1" color={'#fff'} textAlign={'center'}>
                  {typeof dataPopover === 'object' ? '' : dataPopover}
                </Typography>
              </>
            )}
            {type === 'audience' && (
              <>
                <Typography variant="body1" color={'#fff'} textAlign={'center'}>
                  {dataPopover === '0.039' && (
                    <>
                      <Typography
                        variant="body1"
                        className={styles.desctTitle}
                        fontWeight="800"
                        color="#fff"
                        textAlign={'center'}
                      >
                        <b>+</b>
                        Optimized Targeting:
                      </Typography>
                      <Typography variant="span" textAlign={'center'}>
                        The audience consists of a broad mix of users, optimized by our algorithm.
                      </Typography>
                    </>
                  )}
                  {dataPopover === '0.019' && (
                    <>
                      <Typography
                        variant="body1"
                        className={styles.desctTitle}
                        fontWeight="800"
                        color="#fff"
                        textAlign={'center'}
                        marginBottom={2}
                      >
                        <b>+</b>
                        Your own audience:
                      </Typography>
                      <Typography ariant="span" textAlign={'center'}>
                        Your audience:
                      </Typography>
                    </>
                  )}
                </Typography>
              </>
            )}
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
      setListAudience({
        sortItem: !listAudience.sortItem,
        content: listAudience.content.sort((a, b) =>
          listAudience.sortItem
            ? number
              ? a[identifier] - b[identifier]
              : a.toString().localeCompare(b.name)
            : number
            ? b[identifier] - a[identifier]
            : b.toString().localeCompare(a.name)
        ),
      });
    }
  };

  const handleChangeSelect = async (e) => {
    const campName = listCampaigns.content.filter((val) => val.id === e.target.value);
    handleGetAudience(e.target.value, campName[0].name);
  };

  const openCampaignModal = async (id) => {
    const res = await getCampaignDetail(ctx, id);
    setCampaignDetails(res.data);
    setCampaignModal(!campaignModal);
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
    } else if (status === 2) {
      return (
        <div className={styles.statusContainer}>
          <div style={{ width: 6, height: 6, backgroundColor: '#FFAC00', borderRadius: 10, marginRight: 10 }} />
          <Typography>Running</Typography>
        </div>
      );
    } else {
      return (
        <div className={styles.statusContainer}>
          <div style={{ width: 6, height: 6, backgroundColor: '#FFAC00', borderRadius: 10, marginRight: 10 }} />
          <Typography>Finished</Typography>
        </div>
      );
    }
  };

  function renderEmptyData(text) {
    return (
      <div
        className={styles.ctnEmptyData}
        style={text === 'No data available' ? {} : { borderTop: '1px solid #BDBDBD' }}
      >
        <Typography fontSize={25} fontWeight={600} color={'#808080'} fontFamily={'Public Sans, sans-serif'} mb={3}>
          {text}
        </Typography>
        <div style={{ display: 'flex' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={timerIcon} style={{ marginRight: 10, opacity: 0.5, width: 15 }} />
              <Typography
                fontSize={16}
                fontWeight={500}
                color={'#808080'}
                fontFamily={'Public Sans, sans-serif'}
                textAlign={'center'}
              >
                Data might take 24h to show after your scheduled campaign start.
              </Typography>
            </div>
            <Typography
              onClick={() => router.push(routes.createCampaign)}
              fontSize={16}
              fontWeight={500}
              color={'#9EB5F2'}
              fontFamily={'Public Sans, sans-serif'}
              textAlign={'center'}
              style={{ cursor: 'pointer', marginTop: 10, textDecoration: 'underline' }}
            >
              Create a new campaign
            </Typography>
          </div>
        </div>
      </div>
    );
  }

  function renderListTitleCampaignOverview() {
    return (
      <Grid container spacing={3}>
        <Grid item md={1.5} sm={12} display="flex">
          <div style={{ display: 'flex' }} onClick={() => handleSort('campaign', false, '', 'name')}>
            <Typography variant="body1" fontWeight={'bold'} sx={{ cursor: 'pointer' }}>
              Campaign
            </Typography>
            <div className={styles.ctnIconShort}>
              <img src={iconShort} alt="ic-short" />
            </div>
          </div>
        </Grid>
        <Grid item md={1.5} sm={12} display="flex">
          <div style={{ display: 'flex' }} onClick={() => handleSort('campaign', false, '', 'name')}>
            <Typography variant="body1" fontWeight={'bold'} sx={{ cursor: 'pointer' }}>
              Scheduled
            </Typography>
            <div className={styles.ctnIconShort}>
              <img src={iconShort} alt="ic-short" />
            </div>
          </div>
        </Grid>
        <Grid item md={1.5} sm={12}>
          <Typography variant="body1" fontWeight={'bold'} alignItems={'center'}>
            Status
          </Typography>
        </Grid>
        <Grid item md={1.5} sm={12} display="flex">
          <div style={{ display: 'flex' }} onClick={() => handleSort('campaign', true, '', 'count_airdrop')}>
            <Typography variant="body1" fontWeight={'bold'} sx={{ cursor: 'pointer' }}>
              Airdrops
            </Typography>
            <div className={styles.ctnIconShort}>
              <img src={iconShort} alt="ic-short" />
            </div>
          </div>
        </Grid>
        <Grid item md={2} sm={12} display="flex">
          <div style={{ display: 'flex' }} onClick={() => handleSort('campaign', true, '', 'count_impression')}>
            <div className={styles.leftTitle}>
              <Typography variant="body1" fontWeight={'bold'} sx={{ cursor: 'pointer' }}>
                Impressions
              </Typography>
              <img
                onMouseEnter={(event) => {
                  handleHoverOpen(event, 'logo_text_banner', impressionText);
                }}
                onMouseLeave={handleHoverClose}
                src={askIcon}
                alt="ask"
              />
              {renderPopover('logo_text_banner', '')}
            </div>
            <div className={styles.ctnIconShort}>
              <img src={iconShort} alt="ic-short" />
            </div>
          </div>
        </Grid>
        <Grid item md={1.5} sm={12} display="flex">
          <div style={{ display: 'flex' }} onClick={() => handleSort('campaign', true, '', 'count_view')}>
            <Typography variant="body1" fontWeight={'bold'} sx={{ cursor: 'pointer' }}>
              Views
            </Typography>
            <div className={styles.ctnIconShort}>
              <img src={iconShort} alt="ic-short" />
            </div>
          </div>
        </Grid>
        <Grid item md={1.5} sm={12} display="flex">
          <div style={{ display: 'flex' }} onClick={() => handleSort('campaign', true, '', 'count_click')}>
            <Typography variant="body1" fontWeight={'bold'} sx={{ cursor: 'pointer' }}>
              Link clicks
            </Typography>
            <div className={styles.ctnIconShort}>
              <img src={iconShort} alt="ic-short" />
            </div>
          </div>
        </Grid>
        <Grid item md={1} sm={12} display="flex">
          <div style={{ display: 'flex' }} onClick={() => handleSort('campaign', true, '', 'count_mint')}>
            <Typography variant="body1" fontWeight={'bold'} sx={{ cursor: 'pointer' }}>
              Mints
            </Typography>
            <div className={styles.ctnIconShort}>
              <img src={iconShort} alt="ic-short" />
            </div>
          </div>
        </Grid>
      </Grid>
    );
  }

  function renderTotalCampaignOverview() {
    return (
      <>
        <div className={styles.ctnTitle} />
        <Grid container spacing={3}>
          <Grid item md={1.5} sm={12} display="flex">
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
              {''}
            </Typography>
          </Grid>
          <Grid item md={1.5} sm={12}>
            <Typography variant="body1" fontWeight={'bold'}>
              {normalizeCurrency(totalCampainOverview.airdrops) ?? 0}
            </Typography>
          </Grid>
          <Grid item md={2} sm={12}>
            <Typography variant="body1" fontWeight={'bold'}>
              {normalizeCurrency(totalCampainOverview.impressions) ?? 0}
            </Typography>
          </Grid>
          <Grid item md={1.5} sm={12}>
            <Typography variant="body1" fontWeight={'bold'}>
              {normalizeCurrency(totalCampainOverview.views) ?? 0}
            </Typography>
          </Grid>
          <Grid item md={1.5} sm={12}>
            <Typography variant="body1" fontWeight={'bold'}>
              {normalizeCurrency(totalCampainOverview.linkClicks) ?? 0}
            </Typography>
          </Grid>
          <Grid item md={1} sm={12}>
            <Typography variant="body1" fontWeight={'bold'}>
              {normalizeCurrency(totalCampainOverview.mints) ?? 0}
            </Typography>
          </Grid>
        </Grid>
        <div className={styles.ctnTitle} />
      </>
    );
  }

  function renderListItemCampaignOverview() {
    return (
      <div className={styles.ctnItem}>
        <Grid container spacing={3}>
          {listContent.content.map((item) => (
            <Fragment key={item.id.toString()}>
              <Grid item md={1.5} sm={12} display="flex">
                <Typography
                  variant="body1"
                  style={{ cursor: 'pointer', textDecoration: 'underline', whiteSpace: 'nowrap' }}
                  onClick={() => openCampaignModal(item.id)}
                  color={'#7089FF'}
                >
                  {shortString(item.name, 10)}
                </Typography>
              </Grid>
              <Grid item md={1.5} sm={12} alignItems={'center'}>
                <Typography variant="body1">{moment(new Date(item.start_date)).format('DD.MM.YYYY')}</Typography>
              </Grid>

              <Grid item md={1.5} sm={12} alignItems={'center'}>
                <Typography variant="body1">{renderStatus(item.status)}</Typography>
              </Grid>
              <Grid item md={1.5} sm={12}>
                <Typography variant="body1">{normalizeCurrency(item.count_airdrop) ?? '-'}</Typography>
              </Grid>
              <Grid item md={2} sm={12}>
                <Typography variant="body1">{normalizeCurrency(item.count_impression) ?? '-'}</Typography>
              </Grid>
              <Grid item md={1.5} sm={12}>
                <Typography variant="body1">{normalizeCurrency(item.count_view) ?? '-'}</Typography>
              </Grid>
              <Grid item md={1.5} sm={12}>
                <Typography variant="body1">{normalizeCurrency(item.count_click) ?? '-'}</Typography>
              </Grid>
              <Grid item md={1} sm={12}>
                <Typography variant="body1">{normalizeCurrency(item.count_mint) ?? '-'}</Typography>
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
        <img
          src={pagination.currentPage > 1 ? prevActiveIcon : prevIcon}
          style={pagination.currentPage > 1 ? { cursor: 'pointer' } : { cursor: 'not-allowed' }}
          onClick={() => {
            pagination.currentPage > 1 ? getAnotherPage({ label: 'Previous', url: 'http' }) : null;
          }}
        />
        {pagination.data?.map((v, i) => (
          <span
            key={`paginate-${i}`}
            className={v.active ? styles.isPaginateActive : null}
            onClick={() => (v.label === '...' ? null : getAnotherPage(v))}
          >
            {v.label}
          </span>
        ))}
        <img
          src={pagination.currentPage < pagination.data.length ? nextActiveIcon : nextIcon}
          style={
            pagination.currentPage < pagination.data.length
              ? { cursor: 'pointer', marginLeft: 20 }
              : { cursor: 'not-allowed', marginLeft: 20 }
          }
          onClick={() => {
            pagination.currentPage < pagination.data.length ? getAnotherPage({ label: 'Next', url: 'http' }) : null;
          }}
        />
      </div>
    );
  }

  const getAnotherPage = async (page) => {
    if (!page.url) return;
    const pageIdentity = page.label.replace('&laquo;', '').replace('&raquo;', '');

    const pageParams = {
      Previous: Number(pagination?.currentPage) - 1,
      Next: pagination?.currentPage + 1,
    };
    const pages = await getListCampaignItem(null, pageParams[pageIdentity] ?? page.label);
    setContent({
      ...content,
      content: pages.data.data,
    });
    const paginationa = pages.data.links.shift();
    const pagination2 = pages.data.links.pop();

    console.log(pages.data.current_page);

    await sumCampainOverview(pages.data.data);
    setPagination({ data: pages.data.links, currentPage: pages.data.current_page });
  };

  function renderContentCampaignOverview() {
    return (
      <div className={styles.ctnContent2}>
        <div className={styles.ctnCard}>
          {renderTitleCampaignOverview()}
          {renderListTitleCampaignOverview()}
          {content.data.length === 0 ? (
            renderEmptyData('No campaigns available')
          ) : (
            <>
              {renderListItemCampaignOverview()}
              {renderTotalCampaignOverview()}
              {renderPagination()}
            </>
          )}
        </div>
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
                  defaultValue={listCampaigns?.content[listCampaign.length - 1]?.id}
                  defaultChecked={listCampaigns?.content[listCampaign.length - 1]?.id}
                  value={campaignID}
                  displayEmpty
                  onChange={handleChangeSelect}
                  className={styles.ctnSelect}
                  inputProps={{ 'aria-label': 'Without label' }}
                  placeholder={content.data.length === 0 ? 'No campaign available' : ''}
                  disabled={content.data.length === 0}
                >
                  {listCampaigns.content
                    .map((v, i) => (
                      <MenuItem key={`list+${i}`} value={v.id}>
                        {v.name}
                      </MenuItem>
                    ))
                    .reverse()}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} sm={12}>
              <DefaultButton
                // isLoading={loadingSubmit}
                // onClick={validateSubmit}
                ctnBtnStyle={styles.btnExportToExcel}
                eventName={'Export to Excel'}
                onClick={() => {
                  exportAudienceByCampaignID(listAudience.content?.campaign?.id);
                }}
                label={'Export to Excel'}
                disabled={content.data.length === 0}
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
          <div style={{ display: 'flex' }} onClick={() => handleSort('audience', false, '', 'name')}>
            <Typography variant="body1" fontWeight={'bold'} sx={{ cursor: 'pointer' }}>
              Audience
            </Typography>
            <div className={styles.ctnIconShort}>
              <img src={iconShort} alt="ic-short" />
            </div>
          </div>
        </Grid>
        <Grid item md={2.5} sm={12}>
          <Typography variant="body1" fontWeight={'bold'}>
            Ad creative
          </Typography>
        </Grid>
        <Grid item md={1.5} sm={12} display="flex">
          <div style={{ display: 'flex' }} onClick={() => handleSort('audince', true, '', 'count_airdrop')}>
            <Typography variant="body1" fontWeight={'bold'} sx={{ cursor: 'pointer' }}>
              Airdrops
            </Typography>
            <div className={styles.ctnIconShort}>
              <img src={iconShort} alt="ic-short" />
            </div>
          </div>
        </Grid>
        <Grid item md={2} sm={12} display="flex">
          <div style={{ display: 'flex' }} onClick={() => handleSort('audience', true, '', 'count_impression')}>
            <div className={styles.leftTitle}>
              <Typography variant="body1" fontWeight={'bold'} sx={{ cursor: 'pointer' }}>
                Impressions
              </Typography>
              <img
                onMouseEnter={(event) => {
                  handleHoverOpen(event, 'logo_text_banner', impressionText);
                }}
                onMouseLeave={handleHoverClose}
                src={askIcon}
                alt="ask"
              />
              {renderPopover('logo_text_banner', '')}
            </div>
            <div className={styles.ctnIconShort}>
              <img src={iconShort} alt="ic-short" />
            </div>
          </div>
        </Grid>
        <Grid item md={1.5} sm={12} display="flex">
          <div style={{ display: 'flex' }} onClick={() => handleSort('audience', true, '', 'count_view')}>
            <Typography variant="body1" fontWeight={'bold'} sx={{ cursor: 'pointer' }}>
              Views
            </Typography>
            <div className={styles.ctnIconShort}>
              <img src={iconShort} alt="ic-short" />
            </div>
          </div>
        </Grid>
        <Grid item md={1.5} sm={12} display="flex">
          <div style={{ display: 'flex' }} onClick={() => handleSort('campaign', true, '', 'count_click')}>
            <Typography variant="body1" fontWeight={'bold'} sx={{ cursor: 'pointer' }}>
              Link clicks
            </Typography>
            <div className={styles.ctnIconShort}>
              <img src={iconShort} alt="ic-short" />
            </div>
          </div>
        </Grid>
        <Grid item md={1} sm={12} display="flex">
          <div style={{ display: 'flex' }} onClick={() => handleSort('campaign', true, '', 'count_mint')}>
            <Typography variant="body1" fontWeight={'bold'} sx={{ cursor: 'pointer' }}>
              Mints
            </Typography>
            <div className={styles.ctnIconShort}>
              <img src={iconShort} alt="ic-short" />
            </div>
          </div>
        </Grid>
      </Grid>
    );
  }

  function renderListItemAudienceOverview() {
    return (
      <div className={styles.ctnItem}>
        <Grid container spacing={3}>
          {listAudience.content.map((item) => (
            <Fragment key={item.id.toString()}>
              <Grid item md={2} sm={12} display="flex" alignItems={'center'}>
                <Typography
                  variant="body1"
                  onMouseEnter={(event) => {
                    handleHoverOpen(event, 'audience', item?.price_airdrop);
                  }}
                  onMouseLeave={handleHoverClose}
                  marginRight={1}
                >
                  {shortString(item.name, 20)}
                </Typography>
                <img src={expandIcon} />
                {renderPopover('audience', '')}
              </Grid>
              <Grid item md={2.5} sm={12} alignItems={'center'}>
                {renderPopover('banner_image', '')}
                <div
                  className={styles.statusContainer}
                  onMouseEnter={(event) => {
                    const data = {
                      img: `${url + item?.ads?.image.url}`,
                      desc: item.ads?.description,
                    };
                    // console.log(`${url + item?.ads?.image.url}`);
                    handleHoverOpen(event, 'banner_image', data);
                  }}
                  onMouseLeave={handleHoverClose}
                >
                  <div>
                    <img src={`${url + item?.ads?.image.url}`} loading="lazy" />
                  </div>
                  <img src={expandIconWhite} style={{ position: 'absolute', marginLeft: 25, marginBottom: 20 }} />
                  <Typography variant="body1" marginRight={1}>
                    {item?.ads?.name}
                  </Typography>
                  <img src={expandIcon} />
                </div>
              </Grid>
              <Grid item md={1.5} sm={12} display="flex" alignItems={'center'}>
                <Typography variant="body1">{normalizeCurrency(item?.ads?.count_airdrop) ?? '-'}</Typography>
              </Grid>
              <Grid item md={2} sm={12} display="flex" alignItems={'center'}>
                <Typography variant="body1">{normalizeCurrency(item?.ads?.count_impression) ?? '-'}</Typography>
              </Grid>
              <Grid item md={1.5} sm={12} display="flex" alignItems={'center'}>
                <Typography variant="body1">{normalizeCurrency(item?.ads?.count_view) ?? '-'}</Typography>
              </Grid>
              <Grid item md={1.5} sm={12} display="flex" alignItems={'center'}>
                <Typography variant="body1">{normalizeCurrency(item?.ads?.count_click) ?? '-'}</Typography>
              </Grid>
              <Grid item md={1} sm={12} display="flex" alignItems={'center'}>
                <Typography variant="body1">{normalizeCurrency(item?.ads?.count_mint) ?? '-'}</Typography>
              </Grid>
            </Fragment>
          ))}
        </Grid>
      </div>
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
              {normalizeCurrency(totalAudienceOverview.airdrops) ?? 0}
            </Typography>
          </Grid>
          <Grid item md={2} sm={12}>
            <Typography variant="body1" fontWeight={'bold'}>
              {normalizeCurrency(totalAudienceOverview.impressions) ?? 0}
            </Typography>
          </Grid>
          <Grid item md={1.5} sm={12}>
            <Typography variant="body1" fontWeight={'bold'}>
              {normalizeCurrency(totalAudienceOverview.views) ?? 0}
            </Typography>
          </Grid>
          <Grid item md={1.5} sm={12}>
            <Typography variant="body1" fontWeight={'bold'}>
              {normalizeCurrency(totalAudienceOverview.linkClicks) ?? 0}
            </Typography>
          </Grid>
          <Grid item md={1} sm={12}>
            <Typography variant="body1" fontWeight={'bold'}>
              {normalizeCurrency(totalAudienceOverview.mints) ?? 0}
            </Typography>
          </Grid>
        </Grid>
        <div className={styles.ctnTitle} />
      </>
    );
  }

  function renderChartBar() {
    return (
      <Grid container spacing={3} marginTop={2} style={{ position: 'relative' }}>
        {content.data.length === 0 ? (
          <Grid item md={12} sm={12} style={{ position: 'absolute', width: '100%', height: '100%' }}>
            <div
              className={styles.ctnCard}
              style={{ opacity: 0.9, height: '100%', display: 'flex', justifyContent: 'center' }}
            >
              {renderEmptyData('No data available')}
            </div>
          </Grid>
        ) : (
          ''
        )}
        <Grid item md={6} sm={12}>
          <div className={styles.ctnCard}>
            <div className={styles.ctnTitle}>
              <Typography variant="h6">{campaignName} - Airdrops</Typography>
            </div>
            <ChartBar labels={chartDatas.labels} datas={chartDatas.airdrops} title={'Airdrops'} />
          </div>
        </Grid>
        <Grid item md={6} sm={12}>
          <div className={styles.ctnCard}>
            <div className={styles.ctnTitle}>
              <Typography variant="h6">{campaignName} - Link Clicks</Typography>
            </div>
            <ChartBar labels={chartDatas.labels} datas={chartDatas.linkClicks} title={'Link Clicks'} />
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
          {content.data.length === 0 ? (
            renderEmptyData('No audiences available')
          ) : (
            <>
              {renderListItemAudienceOverview()}
              {renderTotalAudienceOverview()}
            </>
          )}
        </div>
        <div>{renderChartBar()}</div>
      </div>
    );
  }

  function renderBanner() {
    return (
      <div className={styles.bannerContainer}>
        <img src={banner} style={{ width: '100%', zIndex: 2 }} alt="banner" />
        <img
          src={button}
          style={{ cursor: 'pointer', width: '40%', zIndex: 1, marginTop: -10, marginBottom: 80 }}
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

  const res = await getListCampaignItem(context, 1);
  const listCampaign = await getListCampaign(context);

  const pagination = res.data.links.shift();
  const pagination2 = res.data.links.pop();

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
      // listCampaign: res.data.data.filter((v) => v.is_show === 1) || [],
      listCampaign: listCampaign.data || [],
      paginations: res.data.links,
      // ctx: context,
    }, // will be passed to the page component as props
  };
}
