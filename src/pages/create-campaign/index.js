/* eslint-disable jsx-a11y/alt-text */
import { Box, Divider, Grid, Popover, Typography, Collapse, Alert } from '@mui/material';
import useStyles from './styles';
import BannerPicker from '../../components/banner-picker';
import CollectionPreview from '../../components/collection-preview';
import CheckboxAds from '../../components/checkbox';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { getUserData, getDataAfterSave, setDataAfterSaveCookie } from '../../helpers/auth';
import DefineAudience from '../../components/define-audience';
import CardAudience from '../../components/card-audience';
import {
  calculateAirdropPerUser,
  checkIsFormMax,
  getAudiencePrice,
  getTotalBudget,
  getTotalUserGetAirdrop,
  parsePriceToCategory,
} from '../../helpers/calculator';
import Page from '../../components/Page';
import Layout from '../../layouts';
import HeaderUser from '../../components/header-user';
import {
  getPaymentDetails,
  getPaymentCC,
  createSession,
  handleAddCampaign,
  getCampaignDetail,
  handleEditCampaign,
  getProfilUser,
  cancelStripe,
  paymentChargeCard,
} from '../../utils/requests';
import DefaultButton from '../../components/default-button';
import moment from 'moment';
import SuccessAddCampaign from '../../components/success-add-campaign';
import AddPaymentMethod from '../../components/add-payment-method';
import LoadingPage from '../../components/loading-page';
import { BACKEND_URL } from '../../helpers/constants';
import { normalizeCurrency } from '../../helpers/currency';
import { getFutureDate } from '../../helpers/dateHelper';
import { routes } from '../../helpers/routes';
import { makeId } from '../../utils/general';
import SvgIconStyle from '../../components/SvgIconStyle';
import { trackGoal, GTMTracker } from '../../utils/tracker';
// import * as yup from 'yup';

const questionObj = {
  collection_page_text: 'Add a text for your collection page to describe what it is about.',
  add_social_media_link:
    'On your collection page, you can link to your social media pages. If you do not have an account on one of the pages, just leave the field empty.',
  ad_name: 'This is the name of your advertisement.',
  media:
    'Upload an asset for your ad which will become the NFT that will be sent to the users. File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 5 MB, max. 500x500 pixels.',
  ad_text: 'This will be the description that shows along with your wallet ad.',
  collection_page_name:
    'Name of the Collection page under which your ad will be listed. This could be your brand name or artist name.',
  logo_text: 'Upload a logo for the collection page. Recommended size: 350x350px',
  logo_text_banner: 'Upload a banner for the collection page. Recommended size: 1400x350px',
  errorAd: 'Please add more audience to check this field.',
  advanced_tracking: 'Optional: Add advanced settings for experienced users to fully customize your campaign.',
  token_tracker_name: 'Add the name of your token tracker.',
  token_symbol: 'Add the symbol of your token tracker.',
};

const informationObj = {
  profile:
    'The Profile & Collection page is similar to the profile page of your social media accounts - but for WALLETADS it is campaign specific. To guarantee the best deliverability, each of your WALLETADS campaigns will get a unique Profile and Collection page name.',
  adCreation:
    'Create the ad that you would like the users to see. Our system will convert your assets into an NFT and distribute it into the the users’ wallets - optimized by our advanced targeting system.',
};

// ----------------------------------------------------------------------

AddCampaign.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

const campaignIcon = '/assets/campaign.png';
const calendarIcon = '/assets/calendar.png';
const targetIcon = '/assets/targeting.png';
const totalBudgetIcon = '/assets/total_budget.png';
const blackCalendar = '/assets/black_calendar.png';
const addIcon = '/assets/add_icon.png';
const askIcon = '/assets/ask_icon.png';
const tokenTrackerImg = '/assets/tokentracker.jpg';
const rocket = '/assets/rocket.png';

const discordIcon = '/assets/discord.png';
const telegramIcon = '/assets/telegram.png';
const mediumIcon = '/assets/medium.png';
const websiteIcon = '/assets/website.png';
const deleteIcon = '/assets/svg/delete.svg';
const informationIcon = '/icons/ic_information.svg';
const expandOpenIcon = '/icons/ic_expandopen.svg';
const expandCloseIcon = '/icons/ic_expandclose.svg';
const rubishIcon = '/icons/ic_rubish.svg';
const addAdIcon = '/icons/ic_add.svg';
const iconPlus = '/assets/icon-plus.png';

export default function AddCampaign({ userData, content, params }) {
  const styles = useStyles();
  const initDecription = [
    {
      id: makeId(),
      adtext: '',
      isErr: false,
    },
  ];
  const initHeadlines = [
    {
      id: makeId(),
      adname: '',
      isErr: false,
    },
  ];
  const initialPicture = [
    { image: null, fe_id: [], name: '', description: initDecription, headlines: initHeadlines, adsId: makeId() },
  ];
  // const [errors, setErrors] = useState({});
  const [resGenerate, setResGenerate] = useState(null);
  const [entitiesData, setEntitiesData] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [dataPaymentCC, setDataPaymentCC] = useState(null);
  const [values, setValues] = useState(userData.data);
  const [checkAudienceMulti, setCheckAudienceMulti] = useState(true);
  const [hover, setHover] = useState(null);
  const [errAlert, setErrorAlert] = useState(null);
  const [activePopover, setActivePopover] = useState(null);
  const [activeErrorAlert, setActiveErrorAlert] = useState(null);
  const [bannerCollection, setBannerCollection] = useState(null);
  const [logoCollection, setLogoCollection] = useState(null);
  const [logoCollection2, setLogoCollection2] = useState(null);
  const [pictureData, setPicture] = useState(initialPicture);
  const [expandAdvanced, setExpandAdvanced] = useState(false);

  const [sampleAds, setSampleAds] = useState([
    {
      id: makeId(),
      sampleAd: '',
    },
    {
      id: makeId(),
      sampleAd: '',
    },
    {
      id: makeId(),
      sampleAd: '',
    },
  ]);
  const [formValues, setFormValues] = useState({
    campaign_name: '',
    campaign_start_date: new Date(getFutureDate(2)),
    campaign_end_date_type: '',
    campaign_end_day: '7',
    ads_page_name: '',
    ads_page_description: '',
    ads_page_website: '',
    ads_page_discord: '',
    ads_page_medium: '',
    ads_page_telegram: '',
    ads_page_token_name: '',
    ads_page_token_symbol: '',
  });
  const [selectedAudience, setSelectedAudience] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(null);
  const [showModalSuccess, setModalSuccess] = useState(false);
  const [formResp, setFormResp] = useState(null);
  const [emptyAudience, setEmptyAudience] = useState(true);
  const [isUpload, setIsUpload] = useState({
    logo: false,
    banner: false,
  });
  const [audienceForm, setAudienceForm] = useState([
    {
      audienceId: makeId(),
      optimized: false,
      selectedCategory: null,
      budgetAds: '',
      detailTargeting: { amountDays: '' },
      balancedTargeting: { cryptoCurrency: null, year: null, months: null, day: null, airdropReceived: null },
    },
    {
      audienceId: makeId(),
      optimized: false,
      selectedCategory: null,
      budgetAds: '',
      detailTargeting: { amountDays: '' },
      balancedTargeting: { cryptoCurrency: null, year: null, months: null, day: null, airdropReceived: null },
    },
    {
      audienceId: makeId(),
      optimized: false,
      selectedCategory: null,
      budgetAds: '',
      detailTargeting: { amountDays: '' },
      balancedTargeting: { cryptoCurrency: null, year: null, months: null, day: null, airdropReceived: null },
    },
    {
      audienceId: makeId(),
      optimized: false,
      selectedCategory: null,
      budgetAds: '',
      detailTargeting: { amountDays: '' },
      balancedTargeting: { cryptoCurrency: null, year: null, months: null, day: null, airdropReceived: null },
    },
  ]);
  const [errorBox, setErrorBox] = useState({
    errorAudience: false,
    errorAds: false,
    errorBoxCampaignName: false,
    errorBoxAvailability: false,
    errorCollection: false,
    errorAudienceNull: false,
    errorAdvanced: false,
    errorFirstAds: false,
  });
  const [showCreditCard, setShowCreditCard] = useState({
    isVisible: false,
    sessionId: null,
    campaignId: null,
    isPaymentLoading: false,
  });
  const [errorInput, setErrorInput] = useState({
    campaignName: null,
    collectionPageName: null,
    collectionLogo: null,
    collectionBanner: null,
    collectionDesc: null,
    collectionSocialMedia: null,
  });

  function normalizeInitialData(value) {
    if (value === '0' || value === 0) {
      return null;
    }
    return value;
  }

  function getAdsId(id) {
    const adsIdArr = [];
    content.audiences.forEach((aud, index) => {
      if (aud.ads_id === id) {
        adsIdArr.push(aud.selected_fe_id);
      }
    });
    return adsIdArr;
  }

  useEffect(async () => {
    var getUserD = getDataAfterSave();
    if (getUserD) {
      if (getUserD?.dataCampaign) {
        setFormValues({
          campaign_name: getUserD.dataCampaign.campaign_name,
          campaign_start_date: getUserD.dataCampaign.campaign_start_date
            ? new Date(getUserD.dataCampaign.campaign_start_date)
            : new Date(getFutureDate(2)),
          campaign_end_date_type: getUserD.dataCampaign.campaign_end_date_type,
          campaign_end_day: getUserD.dataCampaign.campaign_end_date_day,

          ads_page_name: getUserD.dataCampaign.ads_page_name,
          ads_page_description: getUserD.dataCampaign.ads_page_description,
          ads_page_website: getUserD.dataCampaign.ads_page_website,
          ads_page_discord: getUserD.dataCampaign.ads_page_discord,
          ads_page_medium: getUserD.dataCampaign.ads_page_medium,
          ads_page_telegram: getUserD.dataCampaign.ads_page_telegram,
          ads_page_token_name: getUserD.dataCampaign.ads_page_token_name,
          ads_page_token_symbol: getUserD.dataCampaign.ads_page_token_symbol,
        });
        setLogoCollection({
          preview: getUserD.dataCampaign?.preview ? getUserD.dataCampaign.preview : null,
        });

        const checkUser = await getProfilUser();
        try {
          const paymentDetails = await getPaymentDetails();
          if (checkUser.data.payment.payment_method == 1) {
            setPaymentDetails(paymentDetails);
          }
        } catch (err) {
          setPaymentDetails('paymentDetailsNull');
        }
        setPaymentMethod(checkUser.data.payment.payment_method);

        setTimeout(() => {
          setShowCreditCard(
            {
              ...showCreditCard,
              isVisible: true,
            },
            1000
          );
        });
      }
      if (getUserD?.dataAds) {
        setAudienceForm(getUserD.dataAds);
      }
      if (getUserD?.dataPic) {
        setPicture(getUserD.dataPic);
      }
      if (getUserD?.dataSample) {
        setSampleAds(getUserD.dataSample);
      }
    }
    if (params && params.redirect_status === 'succeeded') {
      if (getUserD) {
        let resGenerate = await formResGenerate();
        setResGenerate(resGenerate);
      }
      localStorage.removeItem('dataAfterSave');
      sessionStorage.removeItem('dataAfterSave');
    }
    if (params && params.status === 'success') {
      GTMTracker({
        event: 'campaign-creation-success',
      });
      setModalSuccess('credit-card');
    }
    if (content && params.status === 'fail') {
      cancelCreateCampaignId(content.id);
      window.scrollTo(0, document.body.scrollHeight);
      let sample = JSON.parse(content.sample_address);
      const adsPage = content.ads_page;
      const adsLogo = adsPage.images.find((item) => item.type === 'ads_logo');
      const adsBanner = adsPage.images.find((item) => item.type === 'ads_banner');

      setLogoCollection({
        preview: adsLogo && adsLogo.url ? `${BACKEND_URL}${adsLogo.url}` : null,
      });
      setBannerCollection({
        preview: adsBanner && adsBanner.url ? `${BACKEND_URL}${adsBanner.url}` : null,
      });

      const adCreation = content.ads.map((item) => ({
        ...item,
        fe_id: getAdsId(item.id),
        image: item.image.url ? `${BACKEND_URL}${item.image.url}` : null,
        description: JSON.parse(item.description),
        preview: item.image.url ? `${BACKEND_URL}${item.image.url}` : null,
        imageProps: item.image,
        adsId: makeId(),
      }));

      const newAudience = [];
      content.audiences.map((item) => {
        const checkIfExist = newAudience.some((v) => v.selected_fe_id === item.selected_fe_id);
        if (!checkIfExist) {
          newAudience.push(item);
        }
      });

      const audienceArr = newAudience.map((item) => {
        const targeting = item.detail_target;
        return {
          id: item.id,
          audienceId: item.selected_fe_id,
          selected_fe_id: item.selected_fe_id,
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
        };
      });
      setPicture(adCreation);
      setAudienceForm(audienceArr);
      setFormValues({
        campaign_name: content.name,
        campaign_start_date: content.start_date ? new Date(content.start_date) : new Date(getFutureDate(2)),
        campaign_end_date_type: content.type.toString(),
        campaign_end_day: content.type === 3 ? content.availability : '7',
        ads_page_name: adsPage.name,
        ads_page_description: adsPage.description,
        ads_page_website: adsPage.website,
        ads_page_discord: adsPage.discord,
        ads_page_medium: adsPage.medium,
        ads_page_telegram: adsPage.telegram,
        ads_page_token_name: adsPage.token_name,
        ads_page_token_symbol: adsPage.token_symbol,
      });

      const sampleAds = JSON.parse(content.sample_address);
      console.log('TYPE', sampleAds[0]);

      if (typeof sampleAds === 'object' && sampleAds[0] !== null) {
        setSampleAds([]); // reset ads to null
        sampleAds[0]?.map((v) => {
          setSampleAds((sampleAds) => [...sampleAds, { id: makeId(), sampleAd: v }]);
        });
        setSampleAds((sampleAds) => [...sampleAds, { id: makeId(), sampleAd: '' }]);
      }
      // console.log('TYPE', typeof sampleAds);
      // if (typeof sampleAds === 'object') {
      //   sampleAds.forEach((itemAds, indexAds) => {
      //     itemAds.forEach((sampleAds, indexSample) => {
      //       console.log(sampleAds);
      //       if (indexAds == indexSample) itemAds.sampleAd = sampleAds;
      //     });
      //   });
      // }
    }
  }, []);

  const cancelCreateCampaignId = async (campaign_id) => {
    await cancelStripe({
      campaign_id,
    });
  };

  const handleResetPage = () => {
    setModalSuccess(null);
    setHover(null);
    setActivePopover(null);
    setBannerCollection(null);
    setLogoCollection(null);
    setPicture([{ image: null, fe_id: [], name: '', description: initDecription, adsId: makeId() }]);
    setFormValues({
      campaign_name: '',
      campaign_start_date: new Date(getFutureDate(2)),
      campaign_end_date_type: '',
      campaign_end_day: '7',
      ads_page_name: '',
      ads_page_description: '',
      ads_page_website: '',
      ads_page_discord: '',
      ads_page_medium: '',
      ads_page_telegram: '',
      ads_page_token_name: '',
      ads_page_token_symbol: '',
    });
    setSelectedAudience(null);
    setLoadingSubmit(null);

    setAudienceForm([
      {
        audienceId: makeId(),
        optimized: false,
        selectedCategory: null,
        budgetAds: '',
        detailTargeting: { amountDays: '' },
        balancedTargeting: { cryptoCurrency: null, year: null, months: null, day: null, airdropReceived: null },
      },
      {
        audienceId: makeId(),
        optimized: false,
        selectedCategory: null,
        budgetAds: '',
        detailTargeting: { amountDays: '' },
        balancedTargeting: { cryptoCurrency: null, year: null, months: null, day: null, airdropReceived: null },
      },
      {
        audienceId: makeId(),
        optimized: false,
        selectedCategory: null,
        budgetAds: '',
        detailTargeting: { amountDays: '' },
        balancedTargeting: { cryptoCurrency: null, year: null, months: null, day: null, airdropReceived: null },
      },
      {
        audienceId: makeId(),
        optimized: false,
        selectedCategory: null,
        budgetAds: '',
        detailTargeting: { amountDays: '' },
        balancedTargeting: { cryptoCurrency: null, year: null, months: null, day: null, airdropReceived: null },
      },
    ]);
    setErrorBox({
      errorAudience: false,
      errorAds: false,
      errorBoxCampaignName: false,
      errorBoxAvailability: false,
      errorCollection: false,
      errorAudienceNull: false,
    });
    setShowCreditCard({
      ...showCreditCard,
      sessionId: null,
      campaignId: null,
      isVisible: false,
    });
  };

  const createCampaignId = async () => {
    let datas;

    if (content && params.status === 'fail') {
      formValues.campaign_start_date = moment(formValues.campaign_start_date).format('YYYY-MM-DD');
      // formValues.campaign_start_date = new Date(formValues.campaign_start_date);

      datas = formResp;
    } else {
      datas = formResp;
    }
    if (formResp == null) datas = resGenerate;

    // let i = 0;
    // console.log(params.id);
    let res = null;
    if (params.id) {
      res = await handleEditCampaign(datas, params.id);
    } else {
      res = await handleAddCampaign(datas);
    }

    return res;
  };

  const directStripe = async (params) => {
    const checkUser = await getProfilUser();

    const campaign = await createCampaignId();
    if (checkUser.data.customer_id) {
      try {
        const res = await paymentChargeCard({
          total_budget: getTotalBudget(audienceForm),
          campaign_name: campaign.data.name,
        });
        setShowCreditCard({
          ...showCreditCard,
          isPaymentLoading: true,
        });

        if (res) {
          localStorage.removeItem('dataAfterSave');
          sessionStorage.removeItem('dataAfterSave');
          // setModalSuccess('cryptocurrency');
          // setShowCreditCard({ ...showCreditCard, isPaymentLoading: false });
          setTimeout(() => {
            window.open(res.receipt_url, '_blank');
          }, 5000);

          setTimeout(() => {
            setShowCreditCard({ ...showCreditCard, isVisible: false });
            setModalSuccess('cryptocurrency');
          }, 4000);
        }
      } catch (err) {
        console.log(err);
        // alert('Sorry, Payment Failed !');
      }
      return;
    } else {
      setShowCreditCard({
        ...showCreditCard,
        isPaymentLoading: true,
      });
      const session = await createSession({
        promo: params,
        campaign_id: campaign.data.id,
        campaign_name: campaign.data.name,
        total_budget: getTotalBudget(audienceForm) * 100,
      });
      trackGoal({ id: 3, amount: getTotalBudget(audienceForm) });
      setShowCreditCard({ ...showCreditCard });
      window.location.href = session?.url;
    }
  };

  const getAudienceArr = () => {
    const campaignData = [];
    audienceForm.forEach((audience, index) => {
      if (audience.selectedCategory) {
        campaignData.push({
          id: audience.id,
          file: audience.audienceFile && audience.audienceFile ? audience.audienceFile : null,
          fe_id: index,
          selected_fe_id: audience.audienceId,
          price: audience.budgetAds ? audience.budgetAds.replace(',', '') : '',
          price_airdrop: audience.selectedCategory ? getAudiencePrice(audience).toString() : null,
          total_user: calculateAirdropPerUser(audience).toString(),

          detailed_targeting_cryptocurrency: audience.balancedTargeting.cryptoCurrency,
          detailed_targeting_year: audience.balancedTargeting.year,
          detailed_targeting_month: audience.balancedTargeting.months,
          detailed_targeting_day: audience.balancedTargeting.day,

          detailed_targeting_available_credit_wallet: audience.detailTargeting.availableCredit,
          detailed_targeting_trading_volume: audience.detailTargeting.tradingVolume,
          detailed_targeting_airdrops: audience.balancedTargeting.airdropReceived,

          detailed_targeting_amount_transaction: audience.detailTargeting.transactionAmount,
          detailed_targeting_amount_transaction_day: audience.detailTargeting.amountDays,
          detailed_targeting_nft_purchases: audience.detailTargeting.creatorName,
        });
      }
    });
    return campaignData;
  };

  const handleSubmit = async () => {
    try {
      let res = null;
      setLoadingSubmit(true);
      const campaignData = getAudienceArr();
      const formRes = new FormData();
      formRes.append('campaign_name', formValues.campaign_name.toString());
      formRes.append('campaign_start_date', moment(formValues.campaign_start_date).format('YYYY-MM-DD'));
      formRes.append('campaign_end_date_type', formValues.campaign_end_date_type);
      if (formValues.campaign_end_date_type === '3')
        formRes.append(
          'campaign_end_date_day',
          formValues.campaign_end_date_type === '3' ? formValues.campaign_end_day : null
        );
      formRes.append('campaign_end_date', moment(formValues.campaign_end_date).format('YYYY-MM-DD'));

      formRes.append('ads_page_name', formValues.ads_page_name);
      formRes.append('ads_page_description', formValues.ads_page_description);
      formRes.append('ads_page_website', formValues.ads_page_website);
      formRes.append('ads_page_discord', formValues.ads_page_discord);
      formRes.append('ads_page_medium', formValues.ads_page_medium);
      formRes.append('ads_page_telegram', formValues.ads_page_telegram);
      formRes.append('ads_page_token_name', formValues.ads_page_token_name);
      formRes.append('ads_page_token_symbol', formValues.ads_page_token_symbol);
      formRes.append('ads_page_logo', logoCollection);
      // formRes.append('ads_page_token_symbol', formValues.ads_page_token_symbol);
      // isUpload.logo ? formRes.append('ads_page_logo', logoCollection) : null;
      // formRes.append(
      //   isUpload.banner ? 'ads_page_banner' : 'ads_page_banner_url',
      //   isUpload.banner ? bannerCollection : bannerCollection?.preview
      // );

      sampleAds.forEach((sample, index) => {
        if (sample.sampleAd) {
          formRes.append(`wallet_address[${index}]`, sample.sampleAd);
        }
      });
      console.log('TES');
      console.log(pictureData);
      pictureData.forEach((ads, adsIndex) => {
        console.log(ads.headlines);
        if (ads.id) formRes.append(`campaign_ads[${adsIndex}][id]`, ads.id);
        // if (ads.name) formRes.append(`campaign_ads[${adsIndex}][name]`, ads.name); 
        if (ads.headlines) formRes.append(`campaign_ads[${adsIndex}][headlines]`, JSON.stringify(ads.headlines));
        if (ads.description) formRes.append(`campaign_ads[${adsIndex}][description]`, JSON.stringify(ads.description));
        // if (ads.description) formRes.append(`campaign_ads[${adsIndex}][description]`, ads.description);

        if (ads.fe_id.length > 0) {
          ads.fe_id.forEach((feId, feIndex) => {
            formRes.append(
              `campaign_ads[${adsIndex}][fe_id][${feIndex}]`,
              audienceForm.findIndex((aud) => aud.audienceId === feId)
            );
          });
        }

        if (ads.fe_id.length > 0) {
          ads.fe_id.forEach((feId, feIndex) => {
            formRes.append(`campaign_ads[${adsIndex}][audience_id][${feIndex}]`, feId);
          });
        }

        if (ads.image) formRes.append(`campaign_ads[${adsIndex}][image]`, ads.image);
      });

      campaignData.forEach((campaign, indexCampaign) => {
        if (campaign.fe_id || campaign.fe_id === 0)
          formRes.append(`campaign_audiences[${indexCampaign}][fe_id]`, campaign.fe_id);
        if (campaign) formRes.append(`campaign_audiences[${indexCampaign}][selected_fe_id]`, campaign.selected_fe_id);
        if (campaign.id) formRes.append(`campaign_audiences[${indexCampaign}][id]`, campaign.id);
        if (campaign.file) formRes.append(`campaign_audiences[${indexCampaign}][file]`, campaign.file);
        if (campaign.price) formRes.append(`campaign_audiences[${indexCampaign}][price]`, campaign.price);
        if (campaign.price_airdrop)
          formRes.append(`campaign_audiences[${indexCampaign}][price_airdrop]`, campaign.price_airdrop);
        if (campaign.total_user)
          formRes.append(`campaign_audiences[${indexCampaign}][total_user]`, campaign.total_user);
        if (campaign.detailed_targeting_year)
          formRes.append(
            `campaign_audiences[${indexCampaign}][detailed_targeting_year]`,
            campaign.detailed_targeting_year
          );
        if (campaign.detailed_targeting_month)
          formRes.append(
            `campaign_audiences[${indexCampaign}][detailed_targeting_month]`,
            campaign.detailed_targeting_month
          );
        if (campaign.detailed_targeting_day)
          formRes.append(
            `campaign_audiences[${indexCampaign}][detailed_targeting_day]`,
            campaign.detailed_targeting_day
          );
        if (campaign.detailed_targeting_available_credit_wallet)
          formRes.append(
            `campaign_audiences[${indexCampaign}][detailed_targeting_available_credit_wallet]`,
            campaign.detailed_targeting_available_credit_wallet
          );
        if (campaign.detailed_targeting_trading_volume)
          formRes.append(
            `campaign_audiences[${indexCampaign}][detailed_targeting_trading_volume]`,
            campaign.detailed_targeting_trading_volume
          );
        if (campaign.detailed_targeting_airdrops)
          formRes.append(
            `campaign_audiences[${indexCampaign}][detailed_targeting_airdrops]`,
            campaign.detailed_targeting_airdrops
          );
        if (campaign.detailed_targeting_amount_transaction)
          formRes.append(
            `campaign_audiences[${indexCampaign}][detailed_targeting_amount_transaction]`,
            campaign.detailed_targeting_amount_transaction
          );
        if (campaign.detailed_targeting_amount_transaction_day)
          formRes.append(
            `campaign_audiences[${indexCampaign}][detailed_targeting_amount_transaction_day]`,
            campaign.detailed_targeting_amount_transaction_day
          );
        if (campaign.detailed_targeting_nft_purchases)
          formRes.append(
            `campaign_audiences[${indexCampaign}][detailed_targeting_nft_purchases]`,
            campaign.detailed_targeting_nft_purchases
          );
        if (campaign.detailed_targeting_cryptocurrency && campaign.detailed_targeting_cryptocurrency.length) {
          campaign.detailed_targeting_cryptocurrency.forEach((currency, currencyIndex) => {
            formRes.append(
              `campaign_audiences[${indexCampaign}][detailed_targeting_cryptocurrency][${currencyIndex}]`,
              currency
            );
          });
        }
      });
      let field1 = [];
      let field2 = [];
      field1 = Object.fromEntries(formRes.entries());
      field2 = {
        dataCampaign: field1,
        dataAds: audienceForm,
        dataPic: pictureData,
        dataSample: sampleAds,
        dataCampaignArr: campaignData,
      };
      setDataAfterSaveCookie(field2);
      setFormResp(formRes);

      setShowCreditCard({
        ...showCreditCard,
        // campaignId: res.data.id,
        isVisible: true,
      });
      setLoadingSubmit(false);
    } catch (err) {
      setLoadingSubmit(false);
    }
  };

  const checkAudienceMultiAction = (e, index) => {
    if (e) setCheckAudienceMulti(true);
    else if (e == false && index == 0) setCheckAudienceMulti(false);
  };

  const addAdText = (index, string) => {
    const body = {
      id: makeId(),
      adtext: '',
      isErr: false,
    };

    const newData = pictureData.map((v, i) => {
      if (i === index) {
        if (string == 'headlines') {
          return {
            ...v,
            headlines: [...v.headlines, body],
          };
        } else {
          return {
            ...v,
            description: [...v.description, body],
          };
        }
      } else {
        return v;
      }
    });
    setPicture(newData);
  };

  const removeAdText = (id, index, string) => {
    const filterDesc = pictureData[index].description.filter((desc) => desc.id !== id);
    const newData = pictureData.map((v, i) => {
      if (i === index) {
        return {
          ...v,
          description: filterDesc,
        };
      } else {
        return v;
      }
    });
    setPicture(newData);
  };

  const removeAdTextHeadlines = (id, index) => {
    const filterDesc = pictureData[index].headlines.filter((desc) => desc.id !== id);
    const newData = pictureData.map((v, i) => {
      if (i === index) {
        return {
          ...v,
          headlines: filterDesc,
        };
      } else {
        return v;
      }
    });
    setPicture(newData);
  };

  const isAdsArrValid2 = (ads) => {
    if (ads.fe_id.length > 0) {
      return true;
    }
  };

  const isAdsArrValid = (ads) => {
    if (ads.image && ads.fe_id.length > 0 && ads.description) {
      return true;
    }
  };

  const checkAudienceSelect = (ads, index) => {
    let selectedAdsAudience = [];
    let duplicateValue = false;
    let set1 = [];
    let set2 = [];

    pictureData.forEach((ads) => {
      if (isAdsArrValid(ads)) {
        ads.fe_id.forEach((feId) => {
          selectedAdsAudience.push(feId);
        });
      }
    });

    audienceForm.forEach((b) => {
      selectedAdsAudience.forEach((a) => {
        if (a == b.audienceId && b.optimized) {
          if (!set1.includes(a)) set1.push(a);
        }
      });
      if (b.optimized) {
        set2.push(b.audienceId);
      }
    });
    if (set1.length == set2.length) duplicateValue = true;
    else duplicateValue = false;

    return duplicateValue;
  };

  const validateSubmit = async () => {
    try {
      let isBudgetValid = true;
      let isAdTextValid;
      const isAudienceValid = audienceForm.filter(
        (audience) => audience.selectedCategory !== null && audience.budgetAds !== ''
      );
      const isAudienceNull = audienceForm.filter(
        (audience) => audience.selectedCategory === null && audience.budgetAds === ''
      );
      const isAudienceUnderMinimum = audienceForm.filter(
        (audience) => audience.selectedCategory !== null && audience.budgetAds < 500
      );

      audienceForm.forEach((aud) => {
        if (aud.selectedCategory !== null) {
          if (!aud.budgetAds) {
            setErrorBox({
              ...errorBox,
              errorAudience: true,
            });
            window.location.href = '#card-audience';
            isBudgetValid = false;
          }
          setErrorBox({
            ...errorBox,
            errorAudience: false,
          });
        }
      });
      let isAdsValid = false;
      let inputValid = true;
      let selectedAdsAudience = [];

      const errorObj = {
        campaignName: formValues.campaign_name === '',
        collectionPageName: formValues.ads_page_name === '',
        collectionLogo: logoCollection ? false : true,
        collectionBanner: bannerCollection ? false : true,
        collectionDesc: formValues.ads_page_description === '',
        availability: Number(formValues.campaign_end_day) > 90,
        // collectionSocialMedia: formValues.ads_page_website === '' && formValues.ads_page_discord === '' && formValues.ads_page_telegram === '' && formValues.ads_page_medium === ''
        // collectionSocialMedia: formValues.ads_page_website === '' && formValues.ads_page_discord === '' && formValues.ads_page_telegram === '' && formValues.ads_page_medium === ''
      };
      const { campaignName, collectionBanner, collectionDesc, collectionLogo, collectionPageName, availability } =
        errorObj;
      const isCampaignNameValid = !formValues.campaign_name;
      const isAvailabilityValid =
        !formValues.campaign_end_date_type ||
        (formValues.campaign_end_date_type === '3' && Number(formValues.campaign_end_day) > 90);

      if (campaignName || collectionDesc || collectionLogo || collectionPageName || availability) {
        setErrorInput(errorObj);
        inputValid = false;
      }
      let isCollectionSection = false;
      formValues.ads_page_name && formValues.ads_page_description && logoCollection && !bannerCollection;
      const arrValid = [];
      const arrNotValid = [];
      const errAudienceID = [];
      pictureData.forEach((ads) => {
        if (isAdsArrValid(ads)) {
          ads.fe_id.forEach((feId) => {
            selectedAdsAudience.push(feId);
          });
          arrValid.push(ads);
        } else {
          console.log(ads);
          arrNotValid.push(ads.fe_id);
          errAudienceID.push(ads.adsId);
        }
      });

      isAdTextValid = validationAdsText();

      var duplicateValue = false;
      var set1 = [];
      var set2 = [];
      audienceForm.forEach((b) => {
        selectedAdsAudience.forEach((a) => {
          if (a == b.audienceId && b.optimized) {
            if (!set1.includes(a)) set1.push(a);
          }
        });
        if (b.optimized) {
          set2.push(b.audienceId);
        }
      });
      if (set1.length == set2.length) duplicateValue = true;
      else duplicateValue = false;

      isAdsValid = arrValid.length === pictureData.length && isAdTextValid.isAdTextValid === true;
      const isAudienceFormAdsValid =
        selectedAdsAudience.length === audienceForm.filter((item) => item.selectedCategory !== null).length
          ? true
          : false;
      // const isAudienceFormAdsValidCP = audienceForm.filter((item) => item.selectedCategory !== null);

      // Cek token symbol
      let isAdvancedSettingValid = true;

      if (!formValues.ads_page_token_name && !formValues.ads_page_token_symbol) {
        isAdvancedSettingValid = true;
        isCollectionSection =
          formValues.ads_page_name && formValues.ads_page_description && logoCollection && !bannerCollection;
      } else if (formValues.ads_page_token_name || formValues.ads_page_token_symbol) {
        if (!formValues.ads_page_token_name || !formValues.ads_page_token_symbol) {
          isAdvancedSettingValid = false;
          isCollectionSection = false;
          // formValues.ads_page_name && formValues.ads_page_description && logoCollection && !bannerCollection;
        } else {
          isAdvancedSettingValid = true;
          isCollectionSection =
            formValues.ads_page_name && formValues.ads_page_description && logoCollection && !bannerCollection;
        }
      }
      // : false,
      // errorAds: false,
      // errorBoxCampaignName: false,
      // errorBoxAvailability: false,
      // errorCollection: false,
      // errorAudienceNull: false,
      // errorAdvanced: false,

      var adsNull = isAudienceNull.length;
      var picData = pictureData[0].fe_id.length;
      var adsForm = audienceForm.length;
      var pictureValid = pictureData.length == 1 ? adsNull + picData == adsForm : true;
      var checkAds = true;

      if (pictureData && pictureData.length > 1 && adsNull > picData) {
        setCheckAudienceMulti(false);
        checkAds = false;
      }
      // if (pictureData.length == 0)
      if (
        duplicateValue &&
        pictureValid &&
        isAudienceValid.length > 0 &&
        isAdsValid &&
        inputValid &&
        isBudgetValid &&
        !isAvailabilityValid &&
        isAudienceUnderMinimum.length === 0 &&
        isAdvancedSettingValid
      ) {
        const checkUser = await getProfilUser();
        if (checkUser?.data.payment.payment_method === '1') {
          try {
            const paymentDetails = await getPaymentDetails();
            if (checkUser?.data.payment.payment_method == 1) {
              setPaymentDetails(paymentDetails);
              // setCheckUser(checkUser.data.payment.id)
            }
          } catch (err) {
            setPaymentDetails('paymentDetailsNull');
          }
        } else {
          resetClientSecret();
        }
        setPaymentMethod(checkUser.data.payment.payment_method);
        return handleSubmit();
      }
      if (
        duplicateValue &&
        checkAds &&
        checkAudienceMulti &&
        pictureValid &&
        isAudienceValid.length > 0 &&
        isAdsValid &&
        inputValid &&
        isBudgetValid &&
        !isAvailabilityValid &&
        isAudienceUnderMinimum.length === 0 &&
        isAdvancedSettingValid
      ) {
        if (showCreditCard.sessionId && showCreditCard.campaignId) {
          setShowCreditCard({
            ...showCreditCard,
            isVisible: true,
          });
        } else {
          handleSubmit();
        }
      } else {
        setErrorBox({
          errorAds: !isAdsValid || !isAudienceFormAdsValid || !isAdTextValid.isAdTextValid,
          errorAudience: isAudienceValid.length === 0 || !isBudgetValid,
          errorBoxCampaignName: isCampaignNameValid,
          errorBoxAvailability: isAvailabilityValid,
          errorCollection: !isCollectionSection,
          errorAudienceNull: audienceForm.length === isAudienceNull.length,
          errorAdvanced: !isAdvancedSettingValid,
          errorFirstAds: true,
        });

        if (checkAds || !duplicateValue) {
          // if (!duplicateValue == false && isAvailabilityValid) {
          //   return (window.location.href = '#availability-section');
          // }
          setTimeout(() => {
            var requiredCard = document.getElementById('requiredCard');
            if ((requiredCard && requiredCard.innerHTML.length && requiredCard.innerHTML.length) > 0) {
              return (window.location.href = '#card-audience');
            }
          }, 10);
        }
        if (isCampaignNameValid) {
          window.location.href = '#campaign-name';
        } else if (isAudienceValid.length === 0 || isAudienceUnderMinimum.length > 0) {
          window.location.href = '#card-audience';
        } else if (!isCollectionSection) {
          // formValues.ads_page_name && formValues.ads_page_description && logoCollection && bannerCollection;
          if (collectionPageName) {
            window.location.href = '#collection-page-name';
          } else if (collectionLogo) {
            window.location.href = '#collection-ads-logo';
          } else if (collectionDesc) {
            window.location.href = '#collection-ads-description';
          } else if (!isAdvancedSettingValid) {
            setExpandAdvanced(true);
            window.location.href = '#advanced-setting';
          }
        } else if (!isAdsValid) {
          let errCard = pictureData.findIndex((card) => card.adsId === errAudienceID[0]);
          let validCard = pictureData.findIndex((card) => card.adsId === errAudienceID[0]);
          let addTextErr = pictureData.findIndex((card) => card.fe_id === isAdTextValid.arrFeID[0]);

          if (errCard >= addTextErr) {
            if (!pictureData[validCard].name || !pictureData[validCard].image) {
              return (window.location.href = `#ad-name-${errAudienceID[0]}`);
            } else {
              window.location.href = `#checkbox-container-${errAudienceID[0]}`;
            }
          } else if (errCard === addTextErr) {
            if (!pictureData[validCard].name || !pictureData[validCard].image) {
              window.location.href = `#ad-name-${errAudienceID[0]}`;
            } else {
              window.location.href = `#ad-text-area-${isAdTextValid.arrFeIdNotValid[0]}`;
            }
            // window.location.href = `#card-ads-${errAudienceID[0]}`;
          } else {
            if (errCard >= 0) {
              if (isAudienceFormAdsValid === false) {
                // window.location.href = `#card-ads-${errAudienceID[0]}`;
                window.location.href = `#checkbox-container-${errAudienceID[0]}`;
              } else {
                window.location.href = `#checkbox-${errAudienceID[0]}`;
              }
            } else {
              console.log(isAudienceFormAdsValid);
              if (isAudienceFormAdsValid === false && duplicateValue === false) {
                window.location.href = `#checkbox-${selectedAdsAudience[0] ?? audienceForm[0].audienceId}`;
              } else {
                pictureData[addTextErr].headlines.forEach((heads) => {
                  let indexHeads = isAdTextValid.arrFeIdNotValid.findIndex((i) => i === heads.id);
                  if (heads.isErr)
                    return (window.location.href = `#ad-text-headlines-${isAdTextValid.arrFeIdNotValid[indexHeads]}`);
                  window.location.href = `#ad-text-area-${isAdTextValid.arrFeIdNotValid[0]}`;
                });
              }
            }
          }
        } else if (!isAdTextValid.isAdTextValid) {
          window.location.href = `#ad-text-area-${isAdTextValid.arrFeIdNotValid[0]}`;
        } else if (!isAudienceFormAdsValid && !duplicateValue) {
          window.location.href = `#card-ads-err-0`;
        } else if (isAvailabilityValid) {
          window.location.href = '#availability-section';
        }
      }
      // validationAdsText();
    } catch (err) {
      console.log('err :', err);
    }
  };

  const validationAdsText = () => {
    let adTextToSend = [];
    let arrFeIdNotValid = [];
    let arrFeID = [];
    let isAdTextValid = true;
    pictureData.map((picData, pictureIndex) => {
      picData.description.map((desc, descIndex) => {
        if (desc.adtext === '') {
          arrFeIdNotValid.push(desc.id);
          arrFeID.push(picData.fe_id);
          adTextToSend.push({ title: `Ad Text ${descIndex + 1}`, adtext: desc.adtext });
          handleChangePicture(null, 'description', pictureIndex, false, descIndex);
          isAdTextValid = false;
        }
      });
      picData.headlines.map((heads, descIndex) => {
        if (heads.adname === '') {
          arrFeIdNotValid.push(heads.id);
          arrFeID.push(picData.fe_id);
          adTextToSend.push({ title: `Ad Text ${descIndex + 1}`, adname: heads.adname });
          handleChangePicture(null, 'headlines', pictureIndex, false, descIndex);
          isAdTextValid = false;
        }
      });
    });

    return { isAdTextValid, arrFeIdNotValid, arrFeID };
  };

  const formResGenerate = () => {
    let getUserD = getDataAfterSave();
    let formRes = new FormData();
    formRes.append('campaign_name', getUserD.dataCampaign.campaign_name.toString());
    formRes.append('campaign_start_date', moment(getUserD.dataCampaign.campaign_start_date).format('YYYY-MM-DD'));
    formRes.append('campaign_end_date_type', getUserD.dataCampaign.campaign_end_date_type);
    if (getUserD.dataCampaign.campaign_end_date_type === '3')
      formRes.append(
        'campaign_end_date_day',
        getUserD.dataCampaign.campaign_end_date_type === '3' ? getUserD.dataCampaign.campaign_end_day : null
      );
    formRes.append('campaign_end_date', moment(getUserD.dataCampaign.campaign_end_date).format('YYYY-MM-DD'));

    formRes.append('ads_page_name', getUserD.dataCampaign.ads_page_name);
    formRes.append('ads_page_description', getUserD.dataCampaign.ads_page_description);
    formRes.append('ads_page_website', getUserD.dataCampaign.ads_page_website);
    formRes.append('ads_page_discord', getUserD.dataCampaign.ads_page_discord);
    formRes.append('ads_page_medium', getUserD.dataCampaign.ads_page_medium);
    formRes.append('ads_page_telegram', getUserD.dataCampaign.ads_page_telegram);
    formRes.append('ads_page_token_name', getUserD.dataCampaign.ads_page_token_name);
    formRes.append('ads_page_token_symbol', getUserD.dataCampaign.ads_page_token_symbol);
    formRes.append('ads_page_logo', getUserD.dataCampaign?.preview ? getUserD.dataCampaign.preview : null);

    getUserD.dataSample.forEach((sample, index) => {
      if (sample.sampleAd) {
        formRes.append(`wallet_address[${index}]`, sample.sampleAd);
      }
    });
    getUserD.dataPic.forEach((ads, adsIndex) => {
      if (ads.id) formRes.append(`campaign_ads[${adsIndex}][id]`, ads.id);
      if (ads.headlines) formRes.append(`campaign_ads[${adsIndex}][headlines]`, JSON.stringify(ads.headlines));
      if (ads.description) formRes.append(`campaign_ads[${adsIndex}][description]`, JSON.stringify(ads.description));

      if (ads.fe_id.length > 0) {
        ads.fe_id.forEach((feId, feIndex) => {
          formRes.append(
            `campaign_ads[${adsIndex}][fe_id][${feIndex}]`,
            audienceForm.findIndex((aud) => aud.audienceId === feId)
          );
        });
      }

      if (ads.fe_id.length > 0) {
        ads.fe_id.forEach((feId, feIndex) => {
          formRes.append(`campaign_ads[${adsIndex}][audience_id][${feIndex}]`, feId);
        });
      }

      if (ads.image) formRes.append(`campaign_ads[${adsIndex}][image]`, ads.image);
    });

    if (getUserD.dataCampaignArr?.length > 0) {
      getUserD.dataCampaignArr.forEach((campaign, indexCampaign) => {
        if (campaign.fe_id || campaign.fe_id === 0)
          formRes.append(`campaign_audiences[${indexCampaign}][fe_id]`, campaign.fe_id);
        if (campaign) formRes.append(`campaign_audiences[${indexCampaign}][selected_fe_id]`, campaign.selected_fe_id);
        if (campaign.id) formRes.append(`campaign_audiences[${indexCampaign}][id]`, campaign.id);
        if (campaign.file) formRes.append(`campaign_audiences[${indexCampaign}][file]`, campaign.file);
        if (campaign.price) formRes.append(`campaign_audiences[${indexCampaign}][price]`, campaign.price);
        if (campaign.price_airdrop)
          formRes.append(`campaign_audiences[${indexCampaign}][price_airdrop]`, campaign.price_airdrop);
        if (campaign.total_user)
          formRes.append(`campaign_audiences[${indexCampaign}][total_user]`, campaign.total_user);
        if (campaign.detailed_targeting_year)
          formRes.append(
            `campaign_audiences[${indexCampaign}][detailed_targeting_year]`,
            campaign.detailed_targeting_year
          );
        if (campaign.detailed_targeting_month)
          formRes.append(
            `campaign_audiences[${indexCampaign}][detailed_targeting_month]`,
            campaign.detailed_targeting_month
          );
        if (campaign.detailed_targeting_day)
          formRes.append(
            `campaign_audiences[${indexCampaign}][detailed_targeting_day]`,
            campaign.detailed_targeting_day
          );
        if (campaign.detailed_targeting_available_credit_wallet)
          formRes.append(
            `campaign_audiences[${indexCampaign}][detailed_targeting_available_credit_wallet]`,
            campaign.detailed_targeting_available_credit_wallet
          );
        if (campaign.detailed_targeting_trading_volume)
          formRes.append(
            `campaign_audiences[${indexCampaign}][detailed_targeting_trading_volume]`,
            campaign.detailed_targeting_trading_volume
          );
        if (campaign.detailed_targeting_airdrops)
          formRes.append(
            `campaign_audiences[${indexCampaign}][detailed_targeting_airdrops]`,
            campaign.detailed_targeting_airdrops
          );
        if (campaign.detailed_targeting_amount_transaction)
          formRes.append(
            `campaign_audiences[${indexCampaign}][detailed_targeting_amount_transaction]`,
            campaign.detailed_targeting_amount_transaction
          );
        if (campaign.detailed_targeting_amount_transaction_day)
          formRes.append(
            `campaign_audiences[${indexCampaign}][detailed_targeting_amount_transaction_day]`,
            campaign.detailed_targeting_amount_transaction_day
          );
        if (campaign.detailed_targeting_nft_purchases)
          formRes.append(
            `campaign_audiences[${indexCampaign}][detailed_targeting_nft_purchases]`,
            campaign.detailed_targeting_nft_purchases
          );
        if (campaign.detailed_targeting_cryptocurrency && campaign.detailed_targeting_cryptocurrency.length) {
          campaign.detailed_targeting_cryptocurrency.forEach((currency, currencyIndex) => {
            formRes.append(
              `campaign_audiences[${indexCampaign}][detailed_targeting_cryptocurrency][${currencyIndex}]`,
              currency
            );
          });
        }
      });
    }
    return formRes;
  };

  const deactivateErrorCampaign = (e) => {
    if (errorBox.errorAds || e.target.value) {
      setErrorBox({
        ...errorBox,
        errorBoxCampaignName: false,
      });
    }
  };

  const deactivateErrorBoxAvailability = () => {
    if (errorBox.errorBoxAvailability) {
      setErrorBox({
        ...errorBox,
        errorBoxAvailability: false,
      });
    }
  };

  const deactivateErrorBoxAds = () => {
    // if (errorBox.errorAds) {
    //   setErrorBox({
    //     ...errorBox,
    //     errorAds: false,
    //   });
    // }
  };

  const handleHoverOpen = (event, popoverName) => {
    setHover(event.currentTarget);
    setActivePopover(popoverName);
  };

  const handleAlertErrorOpen = (event, popoverName) => {
    setErrorAlert(event.currentTarget);
    setActiveErrorAlert(popoverName);
  };

  const handleHoverClose = () => {
    setHover(null);
  };

  const handleAlertErrorClose = () => {
    setErrorAlert(null);
  };

  const checkIsAudienceAdsSelected = (index) => {
    let isAudienceSelected = false;
    pictureData.forEach((ads) => {
      if (ads.fe_id.includes(index)) {
        isAudienceSelected = true;
      }
    });
    return isAudienceSelected;
  };

  const handleChangeValues = (event, stateName) => {
    setFormValues({
      ...formValues,
      [stateName]: event.target.value,
    });
  };

  const handleResetErrorValue = (stateName) => {
    if (errorInput[stateName]) {
      setErrorInput({
        ...errorInput,
        [stateName]: null,
      });
    }
  };

  const handleChangeDefaultValue = (value, stateName) => {
    setFormValues({
      ...formValues,
      [stateName]: value,
      campaign_end_day: 7,
    });
  };

  const handleChangeBudget = (event, stateName, contentIndex) => {
    const restructureData = audienceForm.map((item, index) => {
      if (index === contentIndex) {
        return {
          ...item,
          budgetAds: event.target.value.replace(/[^\d.]/gi, '').replace('.', ''),
        };
      }
      return item;
    });
    setAudienceForm(restructureData);
    if (errorBox.errorAudience) {
      setErrorBox({
        ...errorBox,
        errorAudience: false,
      });
    }
  };

  const handleSaveAudienceValue = (value) => {
    const restructureData = audienceForm.map((item, index) => {
      if (index === selectedAudience) {
        return {
          ...value,
          budgetAds: item.budgetAds === '' ? '1000' : item.budgetAds,
          audienceFile: value.selectedCategory !== 'upload' && value.audienceFile ? null : value.audienceFile,
        };
      }
      return item;
    });
    setAudienceForm(restructureData);
    setSelectedAudience(null);
    setEmptyAudience(false);
    deactivateErrorBoxAds();
    setErrorBox({ errorFirstAds: false });
  };

  const handleAddAudience = () => {
    const addData = [
      {
        audienceId: makeId(),
        optimized: false,
        selectedCategory: null,
        budgetAds: '',
        detailTargeting: { amountDays: '' },
        balancedTargeting: { cryptoCurrency: null, year: null, months: null, day: null, airdropReceived: null },
      },
    ];
    const listData = [...audienceForm];
    setAudienceForm(listData.concat(addData));
  };

  const handleChangePicture = (acceptedFiles, stateName, indexContent, isPicture, descId) => {
    let file = null;
    deactivateErrorBoxAds();
    if (isPicture) {
      file = acceptedFiles[0];
      const finalData = pictureData.map((pict, index) => {
        if (index === indexContent) {
          if (isPicture) {
            return {
              ...pict,
              [stateName]: Object.assign(file, {
                preview: URL.createObjectURL(file),
              }),
            };
          }
        }
        return pict;
      });
      setPicture(finalData);
    } else {
      const restructureData = pictureData.map((pict, index) => {
        if (index === indexContent) {
          if (stateName === 'fe_id') {
            const listAudience = pict.fe_id;
            const isThere = pict.fe_id.find((ctn) => ctn === acceptedFiles);
            if (isThere || isThere === 0) {
              return {
                ...pict,
                [stateName]: pict.fe_id.filter((ctn) => ctn !== acceptedFiles),
              };
            }
            listAudience.push(acceptedFiles);
            return {
              ...pict,
              [stateName]: listAudience,
            };
          } else if (stateName === 'description') {
            // const arrDesc = adText.map((v, i) => {
            //   if (i === descId) {
            //     return { ...v, adtext: acceptedFiles.target.value };
            //   } else {
            //     return adText;
            //   }
            // });
            // console.log(adText);
            // console.log(arrDesc);
            let newArrDesc = [...pict.description];

            if (acceptedFiles) {
              newArrDesc[descId].adtext = acceptedFiles.target.value;
              newArrDesc[descId].isErr = false;
            } else {
              newArrDesc[descId].isErr = true;
            }

            return {
              ...pict,
              [stateName]: newArrDesc,
            };
          } else if (stateName === 'headlines') {
            let newArrDesc = [...pict.headlines];

            if (acceptedFiles) {
              newArrDesc[descId].adname = acceptedFiles.target.value;
              newArrDesc[descId].isErr = false;
            } else {
              newArrDesc[descId].isErr = true;
            }

            return {
              ...pict,
              [stateName]: newArrDesc,
            };
          }

          return {
            ...pict,
            [stateName]: acceptedFiles.target.value,
          };
        }
        return pict;
      });
      setPicture(restructureData);
    }
  };

  const removePictureAdCreation = (indexContent) => {
    const restructureData = pictureData.map((pict, index) => {
      if (index === indexContent) {
        return {
          ...pict,
          image: null,
        };
      }
      return pict;
    });
    setPicture(restructureData);
  };

  const changeBannerCollection = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      handleResetErrorValue('collectionBanner');
      setBannerCollection(
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setIsUpload({
        ...isUpload,
        banner: true,
      });
      setErrorBox({
        ...errorBox,
        errorCollection: false,
      });
    }
  };

  const changeLogoCollection = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      handleResetErrorValue('collectionLogo');
      setLogoCollection(
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setIsUpload({
        ...isUpload,
        logo: true,
      });
      setErrorBox({
        ...errorBox,
        errorCollection: false,
      });
    }
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
        PaperProps={{
          style: {
            background: type === 'token-tracker' ? '#f8f9fa' : 'rgba(0, 0, 0,0.9)',
          },
        }}
      >
        <Box sx={type === 'token-tracker' ? { p: 1, maxWidth: 500 } : { p: 2, maxWidth: 260 }}>
          {type === 'token-tracker' ? (
            <>
              <Typography
                variant="body2"
                sx={{ color: '#000' }}
                textAlign="left"
                marginLeft={2}
                fontSize={12}
                fontWeight={800}
              >
                Example:
              </Typography>
              <img src={tokenTrackerImg} style={{ width: 1000, borderRadius: 8 }} />
            </>
          ) : (
            <Typography variant="body2" sx={{ color: '#fff' }} textAlign="center">
              {content || ''}
            </Typography>
          )}
        </Box>
      </Popover>
    );
  }

  function renderPopoverError(type, content) {
    setTimeout(() => {
      handleAlertErrorClose();
    }, 3000);

    return (
      <Popover
        id={type}
        open={Boolean(errAlert) && activeErrorAlert === type}
        anchorEl={errAlert}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onClose={handleAlertErrorClose}
        disableRestoreFocus
        sx={{
          pointerEvents: 'none',
        }}
        className={styles.ctnPopoverError}
      >
        <Box
          sx={{
            borderRadius: 1,
            padding: 1,
            bottom: 150,
            maxWidth: 250,
            backgroundColor: '#FFD8DF',
          }}
        >
          <Typography variant="body2" sx={{ color: '#ad4061' }} textAlign="justify">
            {content || ''}
          </Typography>
        </Box>
      </Popover>
    );
  }

  function renderErrorText(isShow, errorMessage, field) {
    if (isShow) {
      return (
        <div className={styles.ctnError}>
          <span>
            {field == 'Audience'
              ? 'Please assign at least 1 ad to this audience or delete this audience'
              : errorMessage || 'Please check this field'}
          </span>
        </div>
      );
    }
    return null;
  }

  function renderAdAudience(item) {
    if (item.selectedCategory === 'detail-targeting') {
      const detail = item.balancedTargeting;
      const targeting = item.detailTargeting;
      return (
        <div className={styles.ctnAdAudience}>
          {detail.cryptoCurrency && (
            <Typography variant="body2" className={styles.txtAudienceTargeting} textAlign={'center'} marginTop={1}>
              <span>+</span>
              {`Wallet-type: ${detail.cryptoCurrency.join(', ')}`}
            </Typography>
          )}
          {targeting.transactionAmount && (
            <Typography variant="body2" className={styles.txtAudienceTargeting} textAlign={'center'} marginTop={1}>
              <span>+</span>
              {`Amount of transactions: ${targeting.transactionAmount}`}
            </Typography>
          )}
          {targeting.tradingVolume && (
            <Typography variant="body2" className={styles.txtAudienceTargeting} textAlign={'center'} marginTop={1}>
              <span>+</span>
              {`Trading volume: ${targeting.tradingVolume}`}
            </Typography>
          )}
        </div>
      );
    }
    if (item.selectedCategory === 'optimized') {
      return (
        <div className={styles.ctnAdAudience}>
          <Typography variant="body2" className={styles.txtAudienceOptimized} textAlign={'center'} marginTop={1}>
            <span>+</span>
            Optmized Targeting
          </Typography>
          <Typography variant="body2" className={styles.txtAudienceOptimized} textAlign={'center'}>
            The audience consists of a broad mix of users, optimized by our algorithm.
          </Typography>
        </div>
      );
    }
    if (item?.selectedCategory === 'upload') {
      return (
        <div className={styles.ctnAdAudience}>
          <Typography variant="body2" className={styles.txtAudienceOptimized} textAlign={'center'} marginTop={1}>
            <span>+</span>
            Your own audience
          </Typography>
          <Typography variant="body2" className={styles.txtAudienceOptimized} textAlign={'center'}>
            {`${item.audienceFile?.original_name ? item.audienceFile?.original_name : item.audienceFile?.name}`}
          </Typography>
        </div>
      );
    }
    return null;
  }

  function renderCampaignName() {
    // className={`${styles.ctnSection} ${errors.campaign_name ? styles.ctnRedBorder : ''}`}
    return (
      <div
        className={`${styles.ctnSection} ${errorBox.errorBoxCampaignName ? styles.ctnRedBorder : ''}`}
        id="campaign-name"
      >
        <div className={styles.ctnIcon}>
          <img src={campaignIcon} alt="campaign" />
        </div>
        <div className={styles.ctnMidInput}>
          <Typography variant="h6" paragraph>
            Campaign Name
          </Typography>
          <div className={styles.ctnGray} style={{ marginRight: 20 }}>
            <input
              placeholder="New campaign"
              type="text"
              onChange={(event) => {
                handleChangeValues(event, 'campaign_name');
                deactivateErrorCampaign(event);
              }}
              value={formValues.campaign_name}
            />
          </div>
        </div>
        <div className={styles.ctnRightInput}>
          <Typography variant="h6" paragraph>
            Start Date
          </Typography>
          <div className={styles.ctnDate}>
            <div className={styles.containerDate}>
              <DatePicker
                minDate={new Date(getFutureDate(2))}
                selected={
                  content && params.status === 'fail'
                    ? new Date(formValues.campaign_start_date)
                    : formValues.campaign_start_date
                }
                onChange={(date) => setFormValues({ ...formValues, campaign_start_date: date })}
              />
            </div>
            <img src={blackCalendar} alt="calendar" />
          </div>
        </div>
      </div>
    );
  }

  function renderAvailability() {
    return (
      <div
        className={`${styles.ctnSection} ${errorBox.errorBoxAvailability ? styles.ctnRedBorder : ''}`}
        id="availability-section"
      >
        <div className={styles.ctnIcon}>
          <img src={calendarIcon} alt="campaign" />
        </div>
        <div className={styles.ctnMidInput}>
          <Typography variant="h6" paragraph sx={{ marginBottom: 0 }}>
            Availability
          </Typography>
          <Typography variant="span" paragraph>
            Auto-delete my wallet ad in the user's wallet
          </Typography>
          <div className={styles.availWrapper}>
            <Grid container spacing={4} className={styles.gridAvailability}>
              <Grid item md={4} xl={4} xs={12}>
                <div
                  onClick={() => {
                    handleChangeDefaultValue('1', 'campaign_end_date_type');
                    deactivateErrorBoxAvailability();
                  }}
                  className={`${styles.inputGray} ${styles.fixedWidth} ${
                    formValues.campaign_end_date_type !== '1' ? styles.unactiveChecbox : {}
                  }`}
                >
                  <div className={styles.leftWrapper}>
                    <CheckboxAds isActive={formValues.campaign_end_date_type === '1'} />
                  </div>
                  <div
                    className={`${styles.midWrapper} ${
                      formValues.campaign_end_date_type !== '1' ? styles.unactiveInput : {}
                    }`}
                  >
                    <span>After:</span>
                    <span>
                      <b>90</b>
                    </span>
                    <span>Days</span>
                  </div>
                </div>
                {renderErrorText(errorBox.errorBoxAvailability)}
              </Grid>
              <Grid item md={4} xl={4} xs={12}>
                <div
                  onClick={() => {
                    handleChangeDefaultValue('2', 'campaign_end_date_type');
                    deactivateErrorBoxAvailability();
                  }}
                  className={`${styles.inputGray} ${
                    formValues.campaign_end_date_type !== '2' ? styles.unactiveChecbox : {}
                  }`}
                >
                  <div className={styles.leftWrapper}>
                    <CheckboxAds isActive={formValues.campaign_end_date_type === '2'} />
                  </div>
                  <div
                    className={`${styles.midWrapper} ${
                      formValues.campaign_end_date_type !== '2' ? styles.unactiveInput : {}
                    }`}
                  >
                    <span>After:</span>
                    <span>
                      <b>21</b>
                    </span>
                    <span>Days</span>
                  </div>
                </div>
                {renderErrorText(errorBox.errorBoxAvailability)}
              </Grid>
              <Grid item md={4} xl={4} xs={12}>
                <div className={styles.ctnInputColumn}>
                  <div
                    onClick={() => {
                      handleChangeDefaultValue('3', 'campaign_end_date_type');
                      deactivateErrorBoxAvailability();
                    }}
                    className={`${styles.inputGray} ${styles.fixedWidth} ${
                      formValues.campaign_end_date_type !== '3' ? styles.unactiveChecbox : {}
                    } ${Number(formValues.campaign_end_day) > 90 ? styles.ctnRedBorderInput : ''}`}
                  >
                    <div className={styles.leftWrapper}>
                      <CheckboxAds isActive={formValues.campaign_end_date_type === '3'} />
                    </div>
                    <div className={`${styles.midWrapper}`}>
                      <span>After:</span>
                      <input
                        value={formValues.campaign_end_day}
                        onChange={(event) => {
                          handleChangeValues(event, 'campaign_end_day');
                        }}
                        type={'text'}
                      />
                      <span>
                        {isNaN(formValues.campaign_end_day) ||
                        formValues.campaign_end_day === '' ||
                        Number(formValues.campaign_end_day) === 1
                          ? 'Day'
                          : 'Days'}
                      </span>
                    </div>
                  </div>
                  {Number(formValues.campaign_end_day) > 90 && (
                    <span id="red-alert">Please enter less than 91 days.</span>
                  )}
                </div>
                {renderErrorText(errorBox.errorBoxAvailability)}
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }

  function renderReceiveSampleAd() {
    const addSampleAd = () => {
      const newData = {
        id: makeId(),
        samleAd: '',
      };

      setSampleAds((sampleAds) => [...sampleAds, newData]);
    };

    const deleteSampleAdd = (id) => {
      const newData = sampleAds.filter((sampleAd) => sampleAd.id !== id);
      setSampleAds(newData);
    };

    const onchangeAds = (e, id) => {
      const newData = [...sampleAds];
      const findIndex = newData.findIndex((data) => data.id === id);
      newData[findIndex].sampleAd = e.target.value;
      setSampleAds(newData);
    };

    return (
      <div className={`${styles.ctnSection}`}>
        <div className={styles.ctnIcon}>
          <img src={rocket} alt="campaign" />
        </div>
        <div className={styles.ctnMidInput}>
          <Typography variant="h6" paragraph sx={{ marginBottom: 0 }}>
            Receive a sample ad of your campaign
          </Typography>
          <Typography variant="span" paragraph>
            Add up to 5 wallet addresses to receive a sample ad during the campaign flight.
          </Typography>
          <div className={styles.availWrapper}>
            <Typography
              fontFamily={'Public Sans,sans-serif'}
              fontSize={14}
              fontWeight={400}
              color={'#808080'}
              paragraph
              sx={{ marginBottom: 0 }}
              position="absolute"
              right={0}
              top={-70}
            >
              Optional
            </Typography>

            <Grid container spacing={4} className={styles.gridAvailability}>
              {sampleAds.map((samleAd, index) => (
                <Grid key={`sample-${index}`} item md={4} xl={4} xs={12}>
                  <div
                    className={styles.ctnInputColumn}
                    style={sampleAds.length === 6 && sampleAds.length - 1 === index ? { display: 'none' } : null}
                  >
                    <div
                      onClick={() => {
                        if (sampleAds.length - 1 === index) addSampleAd();
                      }}
                      className={`${styles.inputGray}`}
                    >
                      {sampleAds.length - 1 === index && (
                        <div className={styles.leftWrapperSampleAd}>
                          {sampleAds.length === 6 ? null : (
                            // eslint-disable-next-line jsx-a11y/alt-text
                            <img
                              src={iconPlus}
                              onClick={() => {
                                if (sampleAds.length - 1 !== index) addSampleAd();
                              }}
                              style={{ marginLeft: 10 }}
                            />
                          )}
                        </div>
                      )}

                      <div
                        className={`${styles.midWrapperSampleAd}`}
                        // style={`${sampleAds.length - 1 == index ? { cursor: 'pointer' } : null}`}
                        style={{ cursor: 'pointer' }}
                      >
                        {sampleAds.length - 1 !== index ? (
                          <input
                            value={samleAd.sampleAd}
                            placeholder={
                              sampleAds.length - 1 === index
                                ? 'Add more wallet address'
                                : 'Enter your wallet address here'
                            }
                            onChange={(event) => {
                              onchangeAds(event, samleAd.id);
                            }}
                            style={{ width: '100%', paddingRight: 10 }}
                            type={'text'}
                          />
                        ) : (
                          <Typography
                            fontFamily={'Public Sans,sans-serif'}
                            variant="subtitle"
                            color={'#808080'}
                            paddingLeft={2}
                          >
                            Add more wallet addresses
                          </Typography>
                        )}

                        {sampleAds.length > 3 ? (
                          index > 1 && index < 5 && sampleAds.length - 1 !== index ? (
                            <div className={styles.leftWrapperSampleAd}>
                              <img src={rubishIcon} onClick={() => deleteSampleAdd(samleAd.id)} />
                            </div>
                          ) : (
                            <div className={styles.leftWrapperSampleAd} />
                          )
                        ) : (
                          <div className={styles.leftWrapperSampleAd} />
                        )}

                        {sampleAds.length - 1 === index && (
                          <div className={styles.leftWrapperSampleAd}>
                            {sampleAds.length === 6 && (
                              // eslint-disable-next-line jsx-a11y/alt-text
                              <img src={rubishIcon} onClick={() => deleteSampleAdd(samleAd.id)} />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* {renderErrorText(errorBox.errorBoxAvailability)} */}
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    );
  }

  function renderTargeting() {
    return (
      <div className={styles.ctnSectionTarget}>
        <div className={styles.ctnIconTargetAlt}>
          <img src={targetIcon} alt="campaign" />
        </div>
        <div className={styles.ctnMidInput}>
          <Typography variant="h6" marginBottom={0.5}>
            Targeting
          </Typography>
          <Typography variant="span">
            Reach exactly the Crypto-Users that you want to reach by using our state-of-the-art targeting options. And
            no need to worry – even if your audiences overlap, we will make sure that each wallet only receives your
            wallet ad once to get the most out of your budget and to avoid that your project might be considered as
            spam. Additionally, we will automatically exclude users who unsubscribed from our ads.
          </Typography>
        </div>
      </div>
    );
  }

  function renderBudget() {
    return (
      <div className={styles.ctnSectionTarget}>
        <div className={styles.ctnIconTarget}>
          <img src={totalBudgetIcon} alt="campaign" />
        </div>
        <div className={styles.ctnInputBudget}>
          <div className={styles.ctnTotal}>
            <Typography variant="subtitle1" fontSize={20} marginBottom={1} paragraph>
              Total Budget
            </Typography>
            <Typography variant="subtitle1" fontSize={20} color={'#667C8B'} marginBottom={1} paragraph>
              {`USD${normalizeCurrency(getTotalBudget(audienceForm))}`}
            </Typography>
          </div>
          {/* <div className={styles.ctnHorizontalRow} /> */}
          <div className={styles.ctnDesc}>
            <Typography variant="subtitle1" fontSize={20} marginBottom={1} paragraph>
              That's great!
            </Typography>
            <Typography variant="subtitle1" fontSize={20} className={styles.txtUserAirdrop} marginBottom={1} paragraph>
              <span>{`${normalizeCurrency(getTotalUserGetAirdrop(audienceForm))} users`}</span> will receive your
              airdrop
            </Typography>
          </div>
        </div>
      </div>
    );
  }

  function renderCardAudience() {
    return (
      <div className={styles.cardAudienceWrapper} id="card-audience">
        <div className={styles.ctnTitle}>
          <div className={styles.rowTitle} />
          <Typography variant="h5" marginTop={2} marginX={2} paragraph>
            Define your audiences
          </Typography>
          <div className={styles.rowTitle} />
        </div>
        <div className={styles.ctnRowAudience}>
          <Grid container spacing={2}>
            {audienceForm.map((item, index) => (
              <Grid
                item
                md={4}
                lg={3}
                sm={6}
                xs={12}
                className={styles.ctnSectionAd}
                key={item.audienceId}
                id={`card-audience-${index}`}
              >
                <CardAudience
                  isError={errorBox.errorAudience}
                  isErrorAudienceNull={errorBox.errorAudienceNull}
                  onChangeBudget={(event) => {
                    handleChangeBudget(event, 'budgetAds', index);
                  }}
                  showArrow={
                    audienceForm.length > 4
                      ? selectedAudience === index && selectedAudience > 3
                      : selectedAudience === index
                  }
                  isSomeAudienceActive={selectedAudience !== null}
                  key={index.toString()}
                  data={item}
                  onPressCard={() => {
                    if (errorBox.errorAudience) {
                      setErrorBox({
                        ...errorBox,
                        errorAudience: false,
                        errorAudienceNull: false,
                      });
                    }
                    setSelectedAudience(index);
                    setTimeout(() => {
                      window.location.href = '#create-audience';
                    }, 100);
                  }}
                  onRemove={() => {
                    const fixingData = audienceForm.filter((aud) => aud.audienceId !== item.audienceId);
                    fixingData.push({
                      audienceId: makeId(),
                      optimized: false,
                      selectedCategory: null,
                      budgetAds: '',
                      detailTargeting: { amountDays: '' },
                      balancedTargeting: {
                        cryptoCurrency: null,
                        year: null,
                        months: null,
                        day: null,
                        airdropReceived: null,
                      },
                    });
                    const fixingAds = pictureData.map((ads) => ({
                      ...ads,
                      fe_id: ads.fe_id.filter((adsId) => adsId !== item.audienceId),
                    }));
                    setPicture(fixingAds);
                    setAudienceForm(fixingData);
                    deactivateErrorBoxAds();
                    setErrorBox({ errorFirstAds: false });
                  }}
                  selectedAudience={selectedAudience}
                  selectedPage={selectedAudience === index}
                  label={`Audience ${index + 1}:`}
                  index={index + 1}
                  errorAds={!checkIsAudienceAdsSelected(item.audienceId)}
                  errorAdsBeforeSubmit={checkAudienceSelect && errorBox.errorFirstAds}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    );
  }

  function renderDefineAudience() {
    return (
      <div className={styles.ctnDefineAudience}>
        {renderTargeting()}
        {renderCardAudience()}
        {selectedAudience !== null && (
          <DefineAudience
            onClose={() => {
              setSelectedAudience(null);
              window.location.href = '#define-audience-card';
            }}
            onAdd={(value) => {
              handleSaveAudienceValue(value);
            }}
            initialData={audienceForm[selectedAudience]}
            selectedAudience={selectedAudience}
          />
        )}
        {renderAddAudience()}
        {renderBudget()}
        {/* {} */}
      </div>
    );
  }

  function renderTopAdCreation(content, index) {
    return (
      <Grid container marginBottom={2} id={`ad-name-${content.adsId}`}>
        <Grid md={6} sm={6} xl={6} paddingRight={5}>
          <div className={styles.rowTitleWrapper}>
            <div className={styles.leftTitle}>
              <Typography variant="h6">Media</Typography>
              <img
                onMouseEnter={(event) => {
                  handleHoverOpen(event, 'media');
                }}
                onMouseLeave={handleHoverClose}
                src={askIcon}
                alt="ask"
              />
              {renderPopover('media', questionObj.media)}
            </div>
            {/* <Typography variant="body2"  color='#808080'>
              Recommended size 350x350px 
            </Typography> */}
          </div>
          <BannerPicker
            onlyButton={true}
            typeScreen="logo"
            label={'Add media'}
            file={content.image}
            imageProps={content.imageProps}
            acceptAllFile={true}
            // accept={{
            //   'image/png': ['.png'],
            //   'image/jpeg': ['.jpeg'],
            //   'image/jpg': ['.jpg'],
            //   'image/gif': ['.gif'],
            //   'image/svg+xml': ['.svg'],
            //   'video/mp4': ['.mp4', '.MP4'],
            //   'video/webm': ['.webm'],
            //   'audio/mpeg': ['.mp3'],
            //   'audio/mp4': ['.mp4'],
            //   'audio/ogg': ['.oga'],
            //   'video/ogg': ['.ogv']
            // }}
            maxFileSize={5 * 1000000}
            callbackError={() => {
              setErrorBox({
                ...errorBox,
                errorFileSize: 'The file exceeds the maximum filesize of 5 MB.',
              });
            }}
            onDelete={() => {
              removePictureAdCreation(index);
            }}
            onDrop={(value) => {
              handleChangePicture(value, 'image', index, true);
              setErrorBox({
                ...errorBox,
                errorFileSize: null,
              });
            }}
          />
          {renderErrorText((errorBox.errorAds || errorBox.errorFileSize) && !content.image, errorBox.errorFileSize)}
        </Grid>
        <Grid md={6} sm={6} xl={6} paddingTop={4}>
          <BannerPicker
            onlyLogo={true}
            typeScreen="logo"
            label={'Add media'}
            file={content.image}
            imageProps={content.imageProps}
            acceptAllFile={true}
            // accept={{
            //   'image/png': ['.png'],
            //   'image/jpeg': ['.jpeg'],
            //   'image/jpg': ['.jpg'],
            //   'image/gif': ['.gif'],
            //   'image/svg+xml': ['.svg'],
            //   'video/mp4': ['.mp4', '.MP4'],
            //   'video/webm': ['.webm'],
            //   'audio/mpeg': ['.mp3'],
            //   'audio/mp4': ['.mp4'],
            //   'audio/ogg': ['.oga'],
            //   'video/ogg': ['.ogv']
            // }}
            maxFileSize={5 * 1000000}
            callbackError={() => {
              setErrorBox({
                ...errorBox,
                errorFileSize: 'The file exceeds the maximum filesize of 5 MB.',
              });
            }}
            onDelete={() => {
              removePictureAdCreation(index);
            }}
            onDrop={(value) => {
              handleChangePicture(value, 'image', index, true);
              setErrorBox({
                ...errorBox,
                errorFileSize: null,
              });
            }}
          />
          {renderErrorText((errorBox.errorAds || errorBox.errorFileSize) && !content.image, errorBox.errorFileSize)}
        </Grid>

        <Grid md={12} sm={12} xl={12}>
          <div className={styles.rowTitleWrapper}>
            <div className={styles.leftTitleAdText}>
              <Typography variant="h6">Ad headlines </Typography>
              <img
                onMouseEnter={(event) => {
                  handleHoverOpen(event, 'ad_name');
                }}
                onMouseLeave={handleHoverClose}
                src={askIcon}
                alt="ask"
              />
              {renderPopover('ad_name', questionObj.ad_name)}
            </div>
          </div>
          <Grid container marginTop={5}>
            {typeof content.headlines === 'string' ? (
              <Grid md={6} sm={6} xl={6} marginBottom={1} style={{ paddingRight: 40 }}>
                <div className={styles.inputCollectionWrapper}>
                  <input
                    value={content.name}
                    onChange={(event) => {
                      handleChangePicture(event, 'name', index);
                    }}
                    placeholder="Add your ad name here"
                    type="text"
                  />
                  {renderErrorText(errorBox.errorAds && !content.name)}
                </div>
              </Grid>
            ) : (
              content.headlines?.map((v, i) => (
                <Grid
                  key={`adtext-${i}`}
                  md={6}
                  sm={6}
                  xl={6}
                  style={i % 2 === 0 ? { paddingRight: 40 } : {}}
                  marginBottom={1}
                >
                  <div className={styles.adtextTitleContainer2}>
                    <Typography variant={'body2'} className={styles.adTextTitle}>
                      {`Headline ${i + 1}`}
                    </Typography>
                    {i !== 0 && <img src={rubishIcon} onClick={() => removeAdTextHeadlines(v.id, index)} />}
                  </div>

                  <div className={styles.inputCollectionWrapper}>
                    <input
                      id={`ad-text-headlines-${v.id}`}
                      value={v.adname}
                      onChange={(event) => {
                        handleChangePicture(event, 'headlines', index, false, i);
                      }}
                      placeholder="Add your ad headline here"
                      type="text"
                    />
                    {renderErrorText(errorBox.errorAds && v.isErr)}
                  </div>
                </Grid>
              ))
            )}
            <Grid md={6} sm={6} xl={6} style={content?.headlines?.length % 2 === 0 ? { paddingRight: 40 } : {}}>
              <div className={styles.adtextTitleContainerHeadlines}>{''}</div>
              <div className={styles.addAdButton2} onClick={() => addAdText(index, 'headlines')}>
                <img src={addAdIcon} />
                <Typography fontSize={16} fontWeight={600} color={'#808080'}>
                  Add ad headlines
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  function renderBottomCollectionDesc() {
    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '50%', paddingRight: 40 }}>
          <div className={styles.ctnInputCollection}>
            <div className={styles.rowTitleWrapper}>
              <div className={styles.leftTitle} id={`collection-ads-description`}>
                <Typography variant="h6">Page description</Typography>
                <img
                  onMouseEnter={(event) => {
                    handleHoverOpen(event, 'collection_page_text');
                  }}
                  onMouseLeave={handleHoverClose}
                  src={askIcon}
                  alt="ask"
                />
                {renderPopover('collection_page_text', questionObj.collection_page_text)}
              </div>
            </div>
            <div className={styles.textAreaCollection}>
              <textarea
                onChange={(value) => {
                  handleChangeValues(value, 'ads_page_description');
                  handleResetErrorValue('collectionDesc');
                  setErrorBox({
                    ...errorBox,
                    errorCollection: false,
                  });
                }}
                maxLength={1000}
                value={formValues.ads_page_description}
                placeholder="Add your collection page text here"
              />
              <div className={styles.ctnCounter}>
                <Typography variant="body2" color="#808080">
                  {`${
                    formValues.ads_page_description && formValues.ads_page_description.length > 0
                      ? formValues.ads_page_description.length
                      : 0
                  } characters`}
                </Typography>
                <Typography variant="body2" color="#808080">
                  Maximum 1000 characters
                </Typography>
              </div>
              {renderErrorText(errorInput.collectionDesc)}
            </div>
          </div>
        </div>
        <div style={{ width: '50%' }}>
          <div className={styles.ctnInputCollection}>
            <div className={styles.rowTitleWrapper}>
              <div className={styles.leftTitle}>
                <Typography variant="h6">Add social media links</Typography>
                <img
                  onMouseEnter={(event) => {
                    handleHoverOpen(event, 'add_social_media_link');
                  }}
                  onMouseLeave={handleHoverClose}
                  src={askIcon}
                  alt="ask"
                />
                {renderPopover('add_social_media_link', questionObj.add_social_media_link)}
              </div>
            </div>
            <div className={styles.inputCollectionIcon}>
              <img src={websiteIcon} alt="website" />
              <input
                onChange={(value) => {
                  handleResetErrorValue('collectionSocialMedia');
                  handleChangeValues(value, 'ads_page_website');
                }}
                value={formValues.ads_page_website}
                placeholder="yoursite.io"
                type="text"
              />
            </div>
            <div className={styles.inputCollectionIcon}>
              <img src={discordIcon} alt="discord" />
              <input
                onChange={(value) => {
                  handleResetErrorValue('collectionSocialMedia');
                  handleChangeValues(value, 'ads_page_discord');
                }}
                value={formValues.ads_page_discord}
                placeholder="https://discord.gg/abcdef"
                type="text"
              />
            </div>
            <div className={styles.inputCollectionIcon}>
              <img src={mediumIcon} alt="medium" />
              <input
                onChange={(value) => {
                  handleResetErrorValue('collectionSocialMedia');
                  handleChangeValues(value, 'ads_page_medium');
                }}
                value={formValues.ads_page_medium}
                placeholder="https://medium.com/@YourMediumHandle"
                type="text"
              />
            </div>
            <div className={styles.inputCollectionIcon}>
              <img src={telegramIcon} alt="telegram" />
              <input
                onChange={(value) => {
                  handleResetErrorValue('collectionSocialMedia');
                  handleChangeValues(value, 'ads_page_telegram');
                }}
                value={formValues.ads_page_telegram}
                placeholder="https://t.me/abcdef"
                type="text"
              />
            </div>
            {renderErrorText(errorInput.collectionSocialMedia)}
          </div>
        </div>
      </div>
    );
  }

  function renderLeftCollection() {
    return (
      <div className={styles.ctnLeftCollection}>
        <div className={styles.ctnInputCollection}>
          <div className={styles.rowTitleWrapper}>
            <div className={styles.leftTitle} id="collection-page-name">
              <Typography variant="h6">Page name</Typography>
              <img
                onMouseEnter={(event) => {
                  handleHoverOpen(event, 'collection_page_name');
                }}
                onMouseLeave={handleHoverClose}
                src={askIcon}
                alt="ask"
              />
              {renderPopover('collection_page_name', questionObj.collection_page_name)}
            </div>
          </div>
          <div className={styles.inputCollectionWrapper}>
            <input
              onChange={(value) => {
                handleResetErrorValue('collectionPageName');
                handleChangeValues(value, 'ads_page_name');
                setErrorBox({
                  ...errorBox,
                  errorCollection: false,
                });
              }}
              value={formValues.ads_page_name}
              placeholder="Add your collection page name here"
              type="text"
            />
            {renderErrorText(errorInput.collectionPageName)}
          </div>
        </div>
        <div className={styles.ctnInputCollection} style={{ marginTop: 20 }}>
          <div className={styles.rowTitleWrapper}>
            <div className={styles.leftTitle} id={`collection-ads-logo`}>
              <Typography variant="h6">Add logo</Typography>
              <img
                onMouseEnter={(event) => {
                  handleHoverOpen(event, 'logo_text');
                }}
                onMouseLeave={handleHoverClose}
                src={askIcon}
                alt="ask"
              />
              {renderPopover('logo_text', questionObj.logo_text)}
            </div>
            <Typography variant="body2" color="#808080">
              Recommended size 350x350px
            </Typography>
          </div>
          <BannerPicker
            typeScreen="logo"
            label={'Add logo'}
            file={logoCollection}
            onDelete={() => {
              setLogoCollection(null);
            }}
            onDrop={changeLogoCollection}
          />
          {renderErrorText(errorInput.collectionLogo)}
        </div>
        {/* <div className={styles.ctnInputCollection}>
          <div className={styles.rowTitleWrapper}>
            <div className={styles.leftTitle} id={`collection-ads-banner`}>
              <Typography variant="h6">Add banner</Typography>
              <img
                onMouseEnter={(event) => {
                  handleHoverOpen(event, 'logo_text_banner');
                }}
                onMouseLeave={handleHoverClose}
                src={askIcon}
                alt="ask"
              />
              {renderPopover('logo_text_banner', questionObj.logo_text_banner)}
            </div>
            <Typography variant="body2" color="#808080">
              Recommended size 1400x350px
            </Typography>
          </div>
          <BannerPicker
            typeScreen="banner-collection"
            file={bannerCollection}
            onDelete={() => {
              setBannerCollection(null);
            }}
            onDrop={changeBannerCollection}
            label={'Add banner'}
          />
          {renderErrorText(errorInput.collectionBanner)}
        </div> */}
      </div>
    );
  }

  function renderRightAdCreation(content, index) {
    return (
      <div className={styles.ctnInputCollection}>
        <div className={styles.rowTitleWrapper}>
          <div className={styles.leftTitleAdText}>
            <Typography variant="h6">Ad text</Typography>
            <img
              onMouseEnter={(event) => {
                handleHoverOpen(event, 'ad_text');
              }}
              onMouseLeave={handleHoverClose}
              src={askIcon}
              alt="ask"
            />
            {renderPopover('ad_text', questionObj.ad_text)}
          </div>
        </div>
        <Grid container marginTop={5}>
          {typeof content.description === 'string' ? (
            <Grid md={6} sm={6} xl={6} marginBottom={1} style={{ paddingRight: 40 }}>
              <div className={styles.textAreaCollection}>
                <textarea
                  value={content.description}
                  onChange={(event) => {
                    handleChangePicture(event, 'description', index);
                  }}
                  placeholder="Add your ad text here"
                />
                {renderErrorText(errorBox.errorAds && !content.description)}
              </div>
            </Grid>
          ) : (
            content.description?.map((v, i) => (
              <Grid
                key={`adtext-${i}`}
                md={6}
                sm={6}
                xl={6}
                style={i % 2 === 0 ? { paddingRight: 40 } : {}}
                marginBottom={1}
              >
                <div className={styles.adtextTitleContainer2} style={{ marginTop: 0 }}>
                  <Typography variant={'body2'} className={styles.adTextTitle}>
                    {`Ad text ${i + 1}`}
                  </Typography>
                  {i !== 0 && <img src={rubishIcon} onClick={() => removeAdText(v.id, index)} />}
                </div>

                <div className={styles.textAreaCollection}>
                  <textarea
                    id={`ad-text-area-${v.id}`}
                    value={v.adtext}
                    onChange={(event) => {
                      handleChangePicture(event, 'description', index, false, i);
                    }}
                    placeholder="Add your ad text here"
                  />
                  {renderErrorText(errorBox.errorAds && v.isErr)}
                </div>
              </Grid>
            ))
          )}
          <Grid
            md={6}
            sm={6}
            xl={6}
            style={content?.description?.length % 2 === 0 ? { paddingRight: 40 } : {}}
            paddingTop={content?.description?.length == 1 ? 1 : 0}
          >
            <div className={styles.adtextTitleContainerHeadlines}>{''}</div>
            <div className={styles.addAdButton} onClick={() => addAdText(index)}>
              <img src={addAdIcon} />
              <Typography fontSize={16} fontWeight={600} color={'#808080'}>
                Add ad text
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }

  function renderRightCollection() {
    return (
      <div className={styles.ctnRightCollection}>
        <div className={styles.ctnInputCollection}>
          <div className={styles.rowTitleWrapper}>
            <Typography variant="h6">Preview</Typography>
          </div>
          <CollectionPreview
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
        </div>
      </div>
    );
  }

  function renderBottomCollection() {
    return (
      <div>
        <div className={styles.ctnCollectionBottomHeaderContainer}>
          <div className={styles.leftTitle} id={`advanced-setting`}>
            <img
              src={expandAdvanced ? expandOpenIcon : expandCloseIcon}
              onClick={() => setExpandAdvanced(!expandAdvanced)}
              alt="expand"
            />
            <Typography
              fontSize={18}
              onClick={() => setExpandAdvanced(!expandAdvanced)}
              fontWeight={600}
              color={'#808080'}
              style={{ marginLeft: 10, cursor: 'pointer' }}
            >
              Advanced settings
            </Typography>
            <img
              onMouseEnter={(event) => {
                handleHoverOpen(event, 'add_text');
              }}
              onMouseLeave={handleHoverClose}
              src={askIcon}
              alt="ask"
            />
            {renderPopover('add_text', questionObj.advanced_tracking)}
          </div>
          <div style={{ justifyContent: 'flex-end' }}>
            <Typography fontSize={14} fontWeight={400} color={'#808080'}>
              Optional
            </Typography>
          </div>
        </div>
        {/* <Box sx={{ display: 'flex', backgroundColor: 'red', paddingTop: 10 }}> */}
        <Collapse in={expandAdvanced}>
          <div className={styles.leftTitle}>
            <Typography fontSize={18} fontWeight={700} padding={1} paddingTop={2}>
              Token tracker:
            </Typography>
            <img
              onMouseEnter={(event) => {
                handleHoverOpen(event, 'token-tracker');
              }}
              onMouseLeave={handleHoverClose}
              src={askIcon}
              alt="ask"
            />
            {renderPopover('token-tracker', questionObj.token_tracker_name)}
          </div>
          <Grid container>
            <Grid md={6} sm={6} xl={6} padding={1}>
              <div className={styles.leftTitleBottom}>
                <Typography fontSize={14} fontWeight={700}>
                  Name
                </Typography>
              </div>
              <div className={styles.inputCollectionWrapper}>
                <input
                  onChange={(value) => {
                    setErrorBox({
                      ...errorBox,
                      errorCollection: false,
                      errorAdvanced: false,
                    });
                    handleChangeValues(value, 'ads_page_token_name');
                  }}
                  value={formValues.ads_page_token_name}
                  onBlur={() => {
                    if (!formValues.ads_page_token_name && !formValues.ads_page_token_symbol) {
                      setErrorBox({
                        ...errorBox,
                        errorAdvanced: false,
                      });
                    }
                  }}
                  placeholder="Name"
                  type="text"
                />
                {renderErrorText(errorBox.errorAdvanced && !formValues.ads_page_token_name)}
              </div>
            </Grid>
            <Grid md={6} sm={6} xl={6} padding={1}>
              <div className={styles.inputCollectionWrapper}>
                <div className={styles.leftTitleBottom}>
                  <Typography fontSize={14} fontWeight={700}>
                    Symbol
                  </Typography>
                </div>
                <input
                  onChange={(value) => {
                    setErrorBox({
                      ...errorBox,
                      errorCollection: false,
                    });
                    handleChangeValues(value, 'ads_page_token_symbol');
                  }}
                  value={formValues.ads_page_token_symbol}
                  placeholder="Symbol"
                  type="text"
                />
                {renderErrorText(errorBox.errorAdvanced && !formValues.ads_page_token_symbol)}
              </div>
            </Grid>
          </Grid>
        </Collapse>
        {/* </Box> */}
      </div>
    );
  }

  function renderInputCollection() {
    return (
      <div
        className={`${styles.ctnInputCollectionPageWrapper}}`}
        style={{ flexDirection: 'column' }}
        id="collection-section"
      >
        <div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {renderLeftCollection()}
            {renderRightCollection()}
          </div>
          <div style={{ width: '100%' }}>{renderBottomCollectionDesc()}</div>
        </div>
        <Divider />

        {renderBottomCollection()}
      </div>
    );
  }

  function renderSectionInformation(text) {
    return (
      <div className={styles.ctnSectionTarget}>
        <div className={styles.ctnMidInput}>
          <Typography variant="span" textAlign={'justify'}>
            {text}
          </Typography>
        </div>
        <div className={styles.ctnIconInformation}>
          <img src={informationIcon} alt="campaign" />
        </div>
      </div>
    );
  }

  function renderCardAdCreation(content, index) {
    return (
      <div
        id={`card-ads-${content.adsId}`}
        className={`${styles.inputCollectionCard} ${
          errorBox.errorAds && !isAdsArrValid(content) ? styles.ctnRedBorder : ''
        }
        ${errorBox.errorAds && content.description.some((desc) => desc.isErr) ? styles.ctnRedBorder : ''}`}
        key={content.adsId}
      >
        {!isAdsArrValid2(content) && errorBox.errorFirstAds ? (
          <div className={`${errorBox.errorFirstAds && !isAdsArrValid(content) ? styles.ctnAdsTitle : {}}`}>
            Please assign an at least 1 audience to this ad or delete this ad.
          </div>
        ) : null}
        <div id={`card-ads-err-${index}`}> </div>
        {/* <div className={styles.ctnInputCollectionPageWrapper}> */}
        {renderTopAdCreation(content, index)}
        {renderRightAdCreation(content, index)}
        {/* </div> */}
        <div className={styles.ctnSelectAudience} id={'card-ads'}>
          <div className={styles.ctnInputCollection}>
            <div className={styles.rowTitleWrapper}>
              <div className={styles.leftTitle}>
                <Typography variant="h6">Choose which of your audiences should see this ad</Typography>
                <img src={askIcon} alt="ask" />
              </div>
            </div>
          </div>
          <Grid container spacing={2} id={`checkbox-container-${content.adsId}`}>
            {audienceForm.map((item, audienceIndex) => {
              const isActive = content.fe_id.includes(item.audienceId);
              const isEditable = isActive && checkIsAudienceAdsSelected(item.audienceId);

              return (
                <Grid
                  id={`checkbox-${item.audienceId}`}
                  item
                  md={3}
                  sm={6}
                  xs={12}
                  // className={styles.ctnSectionAd}
                  key={item.audienceId.toString()}
                >
                  <div className={styles.ctnAudienceWrapper}>
                    <div
                      className={`${styles.ctnAudienceItem} ${content.capaign_id ? styles.ctnDisable : {}} ${
                        !isActive && checkIsAudienceAdsSelected(item.audienceId)
                          ? styles.ctnAudienceItem
                          : !item.optimized
                          ? styles.ctnDisable
                          : errorBox.errorAds
                          ? !checkIsAudienceAdsSelected(item.audienceId)
                            ? styles.ctnRedBorder
                            : null
                          : styles.ctnAudienceItem
                      }`}
                      onClick={(event) => {
                        checkAudienceMultiAction(
                          (!isActive && item.optimized && !isAdsArrValid(content)) ||
                            (!isActive && item.optimized && !checkIsAudienceAdsSelected(item.audienceId)),
                          index,
                          item
                        );
                        if (!item.optimized) return;

                        if (
                          item.optimized ||
                          (!isActive && item.optimized && !checkIsAudienceAdsSelected(item.audienceId))
                        ) {
                          // deactivateErrorBoxAds();
                          handleChangePicture(item.audienceId, 'fe_id', index);
                        } else {
                          !emptyAudience && handleAlertErrorOpen(event, 'Audience');
                        }
                      }}
                    >
                      {/* {renderPopoverError('Audience', questionObj.errorAd)} */}
                      <CheckboxAds isActive={isActive} />
                      <Typography variant="subtitle1" color="#808080">
                        {`Audience ${audienceIndex + 1}`}
                      </Typography>
                    </div>
                    {/* {!isActive && item.optimized && item.selectedCategory == 'optimized' && errorBox.errorAds ? ( */}
                    {!checkAudienceSelect(item, audienceIndex) &&
                    item.optimized &&
                    !checkIsAudienceAdsSelected(item.audienceId) &&
                    errorBox.errorFirstAds ? (
                      <div className={styles.ctnAudienceErrBox}>
                        {renderErrorText(
                          (!isActive && item.optimized && isAdsArrValid(content)) ||
                            !checkIsAudienceAdsSelected(item.audienceId),
                          null,
                          'Audience'
                        )}
                      </div>
                    ) : null}

                    {renderAdAudience(item)}
                  </div>
                </Grid>
              );
            })}
          </Grid>
          {/* {renderErrorText(errorBox.errorAds && content.fe_id.length === 0)} */}
        </div>
        {pictureData.length > 1 && (
          <div className={styles.ctnDeleteADs}>
            <div
              className={styles.ctnIconDeletAds}
              onClick={() => {
                setPicture(pictureData.filter((ads) => ads.adsId !== content.adsId));
                deactivateErrorBoxAds();
                setErrorBox({ errorFirstAds: false });
              }}
            >
              <SvgIconStyle src={deleteIcon} sx={{ width: 1, height: 1, bgcolor: '#fff', marginBottom: 1 }} />
            </div>
          </div>
        )}
      </div>
    );
  }

  function renderAdCreation() {
    return (
      <div className={styles.ctnAdCreation}>
        <div className={styles.ctnTitle}>
          <div className={styles.rowTitle} />
          <Typography variant="h5" marginTop={2} marginX={2} paragraph>
            Ad Creation
          </Typography>
          <div className={styles.rowTitle} />
        </div>
        {renderSectionInformation(informationObj.adCreation)}
        {pictureData.map((content, index) => renderCardAdCreation(content, index))}
      </div>
    );
  }

  function renderCreateAnotherAd() {
    // if (pictureData.length < audienceForm.filter((item) => item.selectedCategory !== null).length) {
    return (
      <div
        className={styles.btnCreateAd}
        onClick={() => {
          const currentArr = [...pictureData];
          currentArr.push({
            image: null,
            fe_id: [],
            name: '',
            description: initDecription,
            headlines: initHeadlines,
            adsId: makeId(),
          });
          setPicture(currentArr);
          deactivateErrorBoxAds();
          setErrorBox({ errorFirstAds: false });
        }}
      >
        <img src={addIcon} alt="addIcon" />
        <Typography variant="h6" color={'#B3B3B3'} fontWeight="bold">
          Create another ad
        </Typography>
      </div>
    );
    // }
    // return null;
  }

  function renderAddAudience() {
    // if (params.status === 'fail') {
    return (
      <div className={styles.btnCreateAd} onClick={handleAddAudience}>
        <img src={addIcon} alt="addIcon" />
        <Typography variant="h6" color={'#B3B3B3'} fontWeight="bold">
          Add more audiences
        </Typography>
      </div>
    );
    // }
    // return null;
  }

  function renderCollectionPage() {
    return (
      <div className={styles.ctnDefineAudience}>
        <div className={styles.ctnTitle}>
          <div className={styles.rowTitle} />
          <Typography variant="h5" marginTop={2} marginX={2} paragraph>
            Profile & Collection page creation
          </Typography>
          <div className={styles.rowTitle} />
        </div>
        {renderSectionInformation(informationObj.profile)}
        <div className={`${styles.inputCollectionCard} ${errorBox.errorCollection ? styles.ctnRedBorder : ''}`}>
          {renderInputCollection()}
        </div>
        {renderAdCreation()}
        {renderCreateAnotherAd()}
      </div>
    );
  }

  function renderSetupAirdrop() {
    return (
      <div className={styles.setupAirdropWrapper}>
        <DefaultButton
          isLoading={loadingSubmit}
          onClick={() => {
            validateSubmit();
            trackGoal({ id: 5, amount: getTotalBudget(audienceForm) });
          }}
          ctnBtnStyle={styles.btnSetupAirdrop}
          eventName={'Setup Airdrop'}
          // onClick={() => {
          //   setModalSuccess('cryptocurrency')
          // }}
          label={'Setup Airdrop'}
        />
      </div>
    );
  }

  const resetSession = () => {
    setShowCreditCard({
      ...showCreditCard,
      sessionId: null,
      campaignId: null,
      isVisible: false,
    });
  };

  const resetClientSecret = async () => {
    console.log('reset');
    const res = await getPaymentCC();
    console.log(res[0].data[0].client_secret);
    setDataPaymentCC(res[0].data[0].client_secret);
    // const paymentDetails = await getPaymentDetails();
    // setPaymentDetails(paymentDetails);
  };

  return (
    <Page title="Campaign Creation" description="Create your campaign on WALLETADS now!">
      <div className={styles.ctnRoot}>
        <div className={styles.ctnWrapper}>
          <HeaderUser />
          {renderCampaignName()}
          {renderDefineAudience()}
          {renderCollectionPage()}
          {renderAvailability()}
          {renderReceiveSampleAd()}
          {renderSetupAirdrop()}
        </div>
        {/* <AuthFooter /> */}
        <SuccessAddCampaign
          isVisible={showModalSuccess}
          handleHoverClose={() => {
            window.location.href = routes.createCampaign;
          }}
        />
        <AddPaymentMethod
          // dataCheckUser={checkUser}
          dataPaymentDetails={paymentDetails}
          dataPaymentMethod={paymentMethod}
          dataCost={getTotalBudget(audienceForm)}
          dataPayment={dataPaymentCC}
          dataForm={formValues}
          callbackSuccess={(modalType) => {
            GTMTracker({
              event: 'campaign-creation-success',
            });
            setModalSuccess(modalType);
          }}
          totalBudget={getTotalBudget(audienceForm)}
          showCreditCard={showCreditCard}
          isVisible={showCreditCard.isVisible}
          directStripe={directStripe}
          onClose={() => {
            setShowCreditCard({ ...showCreditCard, isVisible: false });
          }}
          isPaymentLoading={showCreditCard.isPaymentLoading}
          handleHoverClose={resetSession}
          createCampaignID={createCampaignId}
          resetClientSecret={() => resetClientSecret()}
        />
        <LoadingPage show={showCreditCard.isPaymentLoading} />
      </div>
    </Page>
  );
}

export async function getServerSideProps(context) {
  try {
    const userData = getUserData(context);
    await getProfilUser(context);
    const UA = context.req.headers['user-agent'];
    const isMobile = Boolean(UA.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
    let params = {};
    let content = null;
    if (isMobile) {
      return {
        redirect: {
          permanent: false,
          destination: `/forbidden`,
        },
      };
    }
    if (context.query) {
      params = context.query;
      if (context.query.id && context.query.status === 'fail') {
        const res = await getCampaignDetail(context, context.query.id);
        content = res.data;
      }
    }
    return {
      props: {
        userData,
        content,
        params,
      }, // will be passed to the page component as props
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: `/login`,
      },
    };
  }
}
