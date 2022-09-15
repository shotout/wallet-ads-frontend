import { Box, Grid, Popover, Typography } from '@mui/material';
import useStyles from './styles'
import BannerPicker from '../../components/banner-picker';
import CollectionPreview from '../../components/collection-preview';
import CheckboxAds from '../../components/checkbox';
import React, { useCallback, useEffect, useState } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import DefineAudience from '../../components/define-audience';
import CardAudience from '../../components/card-audience';
import { calculateAirdropPerUser, checkIsFormMax, getAudiencePrice, getTotalBudget, getTotalUserGetAirdrop, parsePriceToCategory } from '../../helpers/calculator';
import Page from '../../components/Page';
import Layout from '../../layouts';
import HeaderUser from '../../components/header-user';
import { createSession, handleAddCampaign, getCampaignDetail, handleEditCampaign, getProfilUser } from '../../utils/requests';
import DefaultButton from '../../components/default-button';
import moment from 'moment';
import SuccessAddCampaign from '../../components/success-add-campaign';
import AddPaymentMethod from '../../components/add-payment-method';
import { useStripe } from '@stripe/react-stripe-js';
import { BACKEND_URL } from '../../helpers/constants';

const questionObj = {
  availability: "To keep the users' wallets clean and to deliver high-quality advertisement, the ad will be auto-deletes from the users' wallets after a certain amount of time. ",
  cryptocurrencies_used: "Target users that own specific cryptocurrencies. If you select several cryptocurrencies, you will target all users that own at least one of the chosen cryptocurrencies.",
  account_age: "Target users whose cryptowallet accounts already exist for a certain amount of time.",
  available_credit_in_wallet: "Target users who have a certain amount of credit in their wallet (daily updated equivalent in USD)",
  trading_volume: "Target users who already traded assets and cryptocurrencies of a certain trading volume.",
  airdrops_received: "Target users who already received a certain amount of airdrops.",
  amount_of_transaction: "Target users who made a certain amount of transactions within a certain timeframe.",
  nft_Purchases: "Target users who made purchases of a certain Creator or NFT. You can freely add several creators or NFTs here by separating them with a comma.",
  upload_audience: "If you have a list of wallet addresses that you would like to target, you can upload it here. File format: .xlsx or .csv - max. file size 8mb.",
  collection_page_text: "Add a text for your collection page to describe what it is about.",
  add_social_media_link: "On your collection page, you can link to your social media pages. If you do not have an account on one of the pages, just leave the field empty.",
  ad_name: "This is the name of your advertisement.",
  media: "Upload an ad image. This will become the NFT that will be sent to the users. Format: png/jpg ",
  ad_text: "This will be the description that shows along with your wallet ad.",
  choose_audience: "If you create several audiences and several ads, you can decide here which of your audiences should see which ad.",
  collection_page_name: "Name of the Collection page under which your ad will be listed. This could be your brand name or artist name.",
  logo_text: 'Upload a banner for the collection page. Recommended size: 350x350px Format: png/jpg.',
  logo_text_banner: 'Upload a banner for the collection page. Recommended size: 400x350px Format: png/jpg.',
}

// ----------------------------------------------------------------------

AddCampaign.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

const campaignIcon = '/assets/campaign.png'
const calendarIcon = '/assets/calendar.png'
const targetIcon = '/assets/targeting.png'
const totalBudgetIcon = '/assets/total_budget.png'
const blackCalendar = '/assets/black_calendar.png'
const addIcon = '/assets/add_icon.png'
const askIcon = '/assets/ask_icon.png'

const discordIcon = '/assets/discord.png'
const telegramIcon = '/assets/telegram.png'
const mediumIcon = '/assets/medium.png'
const websiteIcon = '/assets/website.png'

const initialPicture = [
  {image: null, fe_id: [], name: '', description: '' },
]

export default function AddCampaign({ content, params }) {
  const styles = useStyles()
  const stripe = useStripe();
  // const { themeStretch } = useSettings();
  const [hover, setHover] = useState(null);
  const [activePopover, setActivePopover] = useState(null);
  const [bannerCollection, setBannerCollection] = useState(null)
  const [logoCollection, setLogoCollection] = useState(null)
  const [pictureData, setPicture] = useState(initialPicture)
  const [formValues, setFormValues] = useState({
    campaign_name: '',
    campaign_start_date: new Date(),
    campaign_end_date_type: '',
    campaign_end_date: new Date(),
    campaign_end_day: '7',
    ads_page_name: "",
    ads_page_description: "",
    ads_page_website: "",
    ads_page_discord: "",
    ads_page_medium: "",
    ads_page_telegram: "",
  })
  const [selectedAudience, setSelectedAudience] = useState(null)
  const [loadingSubmit, setLoadingSubmit] = useState(null)
  const [showModalSuccess, setModalSuccess] = useState(null)

  const [audienceForm, setAudienceForm] = useState([
    {optimized: false, selectedCategory: null, budgetAds: '', detailTargeting: {amountDays: ''}, balancedTargeting: { cryptoCurrency: null, year: null, months: null, day: null, airdropReceived: null }},
    {optimized: false, selectedCategory: null, budgetAds: '', detailTargeting: {amountDays: ''}, balancedTargeting: { cryptoCurrency: null, year: null, months: null, day: null, airdropReceived: null }},
    {optimized: false, selectedCategory: null, budgetAds: '', detailTargeting: {amountDays: ''}, balancedTargeting: { cryptoCurrency: null, year: null, months: null, day: null, airdropReceived: null }},
    {optimized: false, selectedCategory: null, budgetAds: '', detailTargeting: {amountDays: ''}, balancedTargeting: { cryptoCurrency: null, year: null, months: null, day: null, airdropReceived: null }},
  ])
  const [errorBox, setErrorBox] = useState({
    errorAudience: false,
    errorAds: false,
    errorBoxCampaignName: false,
    errorBoxAvailability: false
  })
  const [showCreditCard, setShowCreditCard] = useState({
    isVisible: false,
    sessionId: null,
    campaignId: null,
  })
  const [errorInput, setErrorInput] = useState({
    campaignName: null,
    collectionPageName: null,
    collectionLogo: null,
    collectionBanner: null,
    collectionDesc: null,
    collectionSocialMedia: null
  })

  function normalizeInitialData(value){
    if(value === '0' || value === 0){
      return null
    }
    return value
  }

  function getAdsId(id){
    const adsIdArr = []
    content.audiences.forEach((aud, index) => {
      if(aud.ads_id === id){
        adsIdArr.push(index)
      }
    })
    return adsIdArr
  }

  useEffect(() => {
    if(params && params.status === 'success'){
      setModalSuccess('credit-card')
    }
    if(content && params.status === 'fail'){
      const adsPage = content.ads_page
      const adsLogo = adsPage.images.find(item => item.type === "ads_logo")
      const adsBanner = adsPage.images.find(item => item.type === "ads_banner")
      setLogoCollection({
        preview: adsLogo && adsLogo.url ? `${BACKEND_URL}${adsLogo.url}` : null
      })
      setBannerCollection({
        preview: adsBanner && adsBanner.url ? `${BACKEND_URL}${adsBanner.url}` : null
      })
      const adCreation = content.ads.map(item => ({
        ...item,
        fe_id: getAdsId(item.id),
        image: item.image.url ?  `${BACKEND_URL}${item.image.url}` : null
      }))
      const audienceArr = content.audiences.map(item => {
        const targeting = item.detail_target
        return {
          id: item.id,
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
          }
        }
      })
      setPicture(adCreation)
      setAudienceForm(audienceArr)
      setFormValues({
        campaign_name: content.name,
        campaign_start_date: content.start_date ? new Date(content.start_date) : new Date(),
        campaign_end_date_type: content.type.toString(),
        campaign_end_date: new Date(),
        campaign_end_day: content.type === 3 ? content.availability : '7',
        ads_page_name: adsPage.name,
        ads_page_description: adsPage.description,
        ads_page_website: adsPage.website,
        ads_page_discord: adsPage.discord,
        ads_page_medium: adsPage.medium,
        ads_page_telegram: adsPage.telegram,
      })
    }
  }, [])

  const handleResetPage = () => {
    setModalSuccess(null)
    setHover(null)
    setActivePopover(null)
    setBannerCollection(null)
    setLogoCollection(null)
    setPicture(initialPicture)
    setFormValues({
      campaign_name: '',
      campaign_start_date: new Date(),
      campaign_end_date_type: '',
      campaign_end_date: new Date(),
      campaign_end_day: '7',
      ads_page_name: "",
      ads_page_description: "",
      ads_page_website: "",
      ads_page_discord: "",
      ads_page_medium: "",
      ads_page_telegram: "",
    })
    setSelectedAudience(null)
    setLoadingSubmit(null)
  
    setAudienceForm([
      {optimized: false, selectedCategory: null, budgetAds: '', detailTargeting: {amountDays: ''}, balancedTargeting: { cryptoCurrency: null, year: null, months: null, day: null, airdropReceived: null }},
      {optimized: false, selectedCategory: null, budgetAds: '', detailTargeting: {amountDays: ''}, balancedTargeting: { cryptoCurrency: null, year: null, months: null, day: null, airdropReceived: null }},
      {optimized: false, selectedCategory: null, budgetAds: '', detailTargeting: {amountDays: ''}, balancedTargeting: { cryptoCurrency: null, year: null, months: null, day: null, airdropReceived: null }},
      {optimized: false, selectedCategory: null, budgetAds: '', detailTargeting: {amountDays: ''}, balancedTargeting: { cryptoCurrency: null, year: null, months: null, day: null, airdropReceived: null }},
    ])
    setErrorBox({
      errorAudience: false,
      errorAds: false,
      errorBoxCampaignName: false,
      errorBoxAvailability: false
    })
    setShowCreditCard({ 
      sessionId: null,
      campaignId: null,
      isVisible: false
    })
  }

  const directStripe = () => {
    stripe.redirectToCheckout({
      sessionId: showCreditCard ? showCreditCard.sessionId : null
    })
  }

  const getAudienceArr = () => {
    
    const campaignData = []
    audienceForm.forEach((audience, index) => {
      if(audience.selectedCategory){
        campaignData.push({
          "id": audience.id,
          "file": audience.audienceFile && audience.audienceFile ? audience.audienceFile : null,
          "fe_id": index,
          "price": audience.budgetAds ? audience.budgetAds.replace(',','') : '',
          "price_airdrop": audience.selectedCategory ? getAudiencePrice(audience).toString() : null,
          "total_user": calculateAirdropPerUser(audience).toString(),
  
          "detailed_targeting_cryptocurrency": audience.balancedTargeting.cryptoCurrency,
          "detailed_targeting_year":audience.balancedTargeting.year,
          "detailed_targeting_month":audience.balancedTargeting.months,
          "detailed_targeting_day":audience.balancedTargeting.day,
  
          "detailed_targeting_available_credit_wallet": audience.detailTargeting.availableCredit,
          "detailed_targeting_trading_volume": audience.detailTargeting.tradingVolume,
          "detailed_targeting_airdrops": audience.balancedTargeting.airdropReceived,
  
          "detailed_targeting_amount_transaction": audience.detailTargeting.transactionAmount,
          "detailed_targeting_amount_transaction_day": audience.detailTargeting.amountDays,
          "detailed_targeting_nft_purchases": audience.detailTargeting.creatorName,
      })
      }
    })
    return campaignData
  }

  const handleSubmit = async() => {
    try{
      let res = null
      setLoadingSubmit(true)
      const campaignData = getAudienceArr()
      const formRes = new FormData()
      formRes.append('campaign_name', formValues.campaign_name)
      formRes.append('campaign_start_date', moment(formValues.campaign_start_date).format('YYYY-MM-DD'))
      formRes.append('campaign_end_date_type', formValues.campaign_end_date_type)
      if(formValues.campaign_end_date_type === '3') formRes.append('campaign_end_date_day', formValues.campaign_end_date_type === '3' ? formValues.campaign_end_day : null)
      formRes.append('campaign_end_date', moment(formValues.campaign_end_date).format('YYYY-MM-DD'))
      
      formRes.append('ads_page_name', formValues.ads_page_name)
      formRes.append('ads_page_description', formValues.ads_page_description)
      formRes.append('ads_page_website', formValues.ads_page_website)
      formRes.append('ads_page_discord', formValues.ads_page_discord)
      formRes.append('ads_page_medium', formValues.ads_page_medium)
      formRes.append('ads_page_telegram', formValues.ads_page_telegram)
      formRes.append('ads_page_logo', logoCollection)
      formRes.append('ads_page_banner', bannerCollection)

      pictureData.forEach((ads, adsIndex) => {
        if(ads.id) formRes.append(`campaign_ads[${adsIndex}][id]`, ads.id)
        if(ads.name) formRes.append(`campaign_ads[${adsIndex}][name]`, ads.name)
        if(ads.description) formRes.append(`campaign_ads[${adsIndex}][description]`, ads.description)
        if(ads.fe_id.length > 0) {
          ads.fe_id.forEach((feId, feIndex) => {
            formRes.append(`campaign_ads[${adsIndex}][fe_id][${feIndex}]`, feId)
          })
        }
        if(ads.image) formRes.append(`campaign_ads[${adsIndex}][image]`, ads.image)
      })
      
      campaignData.forEach((campaign, indexCampaign) => {
        if(campaign.fe_id) formRes.append(`campaign_audiences[${indexCampaign}][fe_id]`, campaign.fe_id)
        if(campaign.id) formRes.append(`campaign_audiences[${indexCampaign}][id]`, campaign.id)
        if(campaign.file) formRes.append(`campaign_audiences[${indexCampaign}][file]`, campaign.file)
        if(campaign.price) formRes.append(`campaign_audiences[${indexCampaign}][price]`, campaign.price)
        if(campaign.price_airdrop) formRes.append(`campaign_audiences[${indexCampaign}][price_airdrop]`, campaign.price_airdrop)
        if(campaign.total_user) formRes.append(`campaign_audiences[${indexCampaign}][total_user]`, campaign.total_user)
        if(campaign.detailed_targeting_year) formRes.append(`campaign_audiences[${indexCampaign}][detailed_targeting_year]`, campaign.detailed_targeting_year)
        if(campaign.detailed_targeting_month) formRes.append(`campaign_audiences[${indexCampaign}][detailed_targeting_month]`, campaign.detailed_targeting_month)
        if(campaign.detailed_targeting_day) formRes.append(`campaign_audiences[${indexCampaign}][detailed_targeting_day]`, campaign.detailed_targeting_day)
        if(campaign.detailed_targeting_available_credit_wallet) formRes.append(`campaign_audiences[${indexCampaign}][detailed_targeting_available_credit_wallet]`, campaign.detailed_targeting_available_credit_wallet)
        if(campaign.detailed_targeting_trading_volume) formRes.append(`campaign_audiences[${indexCampaign}][detailed_targeting_trading_volume]`, campaign.detailed_targeting_trading_volume)
        if(campaign.detailed_targeting_airdrops) formRes.append(`campaign_audiences[${indexCampaign}][detailed_targeting_airdrops]`, campaign.detailed_targeting_airdrops)
        if(campaign.detailed_targeting_amount_transaction) formRes.append(`campaign_audiences[${indexCampaign}][detailed_targeting_amount_transaction]`, campaign.detailed_targeting_amount_transaction)
        if(campaign.detailed_targeting_amount_transaction_day) formRes.append(`campaign_audiences[${indexCampaign}][detailed_targeting_amount_transaction_day]`, campaign.detailed_targeting_amount_transaction_day)
        if(campaign.detailed_targeting_nft_purchases) formRes.append(`campaign_audiences[${indexCampaign}][detailed_targeting_nft_purchases]`, campaign.detailed_targeting_nft_purchases)
        if(campaign.detailed_targeting_cryptocurrency && campaign.detailed_targeting_cryptocurrency.length) {
          campaign.detailed_targeting_cryptocurrency.forEach((currency, currencyIndex) => {
            formRes.append(`campaign_audiences[${indexCampaign}][detailed_targeting_cryptocurrency][${currencyIndex}]`, currency)
          })
        }
      })

      if(params.id){
        res = await handleEditCampaign(formRes, params.id)
      }else{
        res = await handleAddCampaign(formRes)
      }
      const session = await createSession({
          campaign_id: res.data.id,
          campaign_name: formValues.campaign_name,
          total_budget: getTotalBudget(audienceForm) * 100,
      })
      setShowCreditCard({
        sessionId: session.id,
        campaignId: res.data.id,
        isVisible: true
      })
      setLoadingSubmit(false)
    }catch(err){
      console.log("Check err:", err)
      setLoadingSubmit(false)
    }
  }

  const isAdsArrValid = (ads) => {
    if(ads.image && ads.fe_id.length > 0 && ads.description && ads.name){
      return true
    }
    return false
  }

  const validateSubmit = () => {
    try{
      const isAudienceValid = audienceForm.filter(audience => audience.selectedCategory !== null && audience.budgetAds !== '')
      let isAdsValid = false
      let inputValid = true
      let selectedAdsAudience = []
      const errorObj = {
        campaignName: formValues.campaign_name === '',
        collectionPageName: formValues.ads_page_name === '',
        collectionLogo: logoCollection ? false : true,
        collectionBanner: bannerCollection ? false : true,
        collectionDesc: formValues.ads_page_description === '',
        // collectionSocialMedia: formValues.ads_page_website === '' && formValues.ads_page_discord === '' && formValues.ads_page_telegram === '' && formValues.ads_page_medium === ''
        // collectionSocialMedia: formValues.ads_page_website === '' && formValues.ads_page_discord === '' && formValues.ads_page_telegram === '' && formValues.ads_page_medium === ''
      }
      const { campaignName, collectionBanner, collectionDesc, collectionLogo, collectionPageName} = errorObj
      const isCampaignNameValid = !formValues.campaign_name
      const isAvailabilityValid = !formValues.campaign_end_date_type
      if(campaignName || collectionBanner || collectionDesc || collectionLogo || collectionPageName){
        setErrorInput(errorObj)
        inputValid = false
      }
      const arrValid = []
      pictureData.forEach(ads => {
        if(isAdsArrValid(ads)){
          ads.fe_id.forEach(feId => { selectedAdsAudience.push(feId)})
          arrValid.push(ads)
        }
      })
      isAdsValid = arrValid.length === pictureData.length
      const isAudienceFormAdsValid = selectedAdsAudience.length === audienceForm.filter(item => item.selectedCategory !== null).length ? true : false
      if(isAudienceValid.length > 0 && isAdsValid && inputValid && isAudienceFormAdsValid){
        if(showCreditCard.sessionId && showCreditCard.campaignId){
          setShowCreditCard({
            ...showCreditCard,
            isVisible: true
          })
        }else{
          handleSubmit()
        }
      }else{
        setErrorBox({
          errorAds: !isAdsValid  || !isAudienceFormAdsValid,
          errorAudience: isAudienceValid.length === 0,
          errorBoxCampaignName: isCampaignNameValid,
          errorBoxAvailability: isAvailabilityValid
        })
        if(isCampaignNameValid){
          window.location.href = '#campaign-name'
        }else if(isAvailabilityValid){
          window.location.href = '#availability-section'
        }else if(isAudienceValid.length === 0){
          window.location.href = '#card-audience'
        }else if(!isAdsValid || !isAudienceFormAdsValid){
          window.location.href = '#card-ads'
        }
      }
    }catch(err){
      console.log("err :", err)
    }
  }

  const deactivateErrorCampaign = () => {
    if(errorBox.errorAds){
      setErrorBox({
        ...errorBox,
        errorBoxCampaignName: false
      })
    }
  }

  const deactivateErrorBoxAvailability = () => {
    if(errorBox.errorAds){
      setErrorBox({
        ...errorBox,
        errorBoxAvailability: false
      })
    }
  }

  const deactivateErrorBoxAds = () => {
    if(errorBox.errorAds){
      setErrorBox({
        ...errorBox,
        errorAds: false
      })
    }
  }
  
  const handleHoverOpen = (event, popoverName) => {
    setHover(event.currentTarget);
    setActivePopover(popoverName)
  };
  
  const handleShowModalSuccess = (event) => {
    setModalSuccess(true);
  };
   
  const handleHoverClose = () => {
    setHover(null);
  };

  const checkIsAudienceAdsSelected = (index) => {
    let isAudienceSelected = false
    pictureData.forEach(ads => {
      if(ads.fe_id.includes(index)){
        isAudienceSelected = true
      }
    })
    return isAudienceSelected
  }

  const handleChangeValues = (event, stateName) => {
    setFormValues({
      ...formValues,
      [stateName]: event.target.value
    })
  }

  const handleResetErrorValue = (stateName) => {
    if(errorInput[stateName]){
      setErrorInput({
        ...errorInput,
        [stateName]: null
      })
    }
  }

  const handleChangeDefaultValue = (value, stateName) => {
    setFormValues({
      ...formValues,
      [stateName]: value
    })
  }

  const handleChangeBudget = (event, stateName, contentIndex) => {
    const restructureData = audienceForm.map((item, index) => {
      if(index === contentIndex){
        return {
          ...item,
          budgetAds: event.target.value.replace(/[^\d.]/gi, "").replace('.','')
        }
      }
      return item
    })
    setAudienceForm(restructureData)
    if(errorBox.errorAudience){
      setErrorBox({
        ...errorBox,
        errorAudience: false
      })
    }
  }

  const handleSaveAudienceValue = (value) => {
    const restructureData = audienceForm.map((item, index) => {
      if(index === selectedAudience){
        return {
          ...value,
          budgetAds: item.budgetAds === '' ? '1000' : item.budgetAds
        }
      }
      return item
    })
    setAudienceForm(restructureData)
    setSelectedAudience(null)
  }

  const handleAddAudience = () => {
    const addData = [
      {optimized: false, selectedCategory: null, budgetAds: '', detailTargeting: {amountDays: ''}, balancedTargeting: { cryptoCurrency: null, year: null, months: null, day: null, airdropReceived: null }},
      {optimized: false, selectedCategory: null, budgetAds: '', detailTargeting: {amountDays: ''}, balancedTargeting: { cryptoCurrency: null, year: null, months: null, day: null, airdropReceived: null }},
      {optimized: false, selectedCategory: null, budgetAds: '', detailTargeting: {amountDays: ''}, balancedTargeting: { cryptoCurrency: null, year: null, months: null, day: null, airdropReceived: null }},
      {optimized: false, selectedCategory: null, budgetAds: '', detailTargeting: {amountDays: ''}, balancedTargeting: { cryptoCurrency: null, year: null, months: null, day: null, airdropReceived: null }},
    ]
    const listData = [...audienceForm]
    setAudienceForm(listData.concat(addData))
  }

  const handleChangePicture = (acceptedFiles, stateName, indexContent, isPicture) => {
    let file = null;
    deactivateErrorBoxAds()
    if(isPicture){
      file = acceptedFiles[0]
      const reader = new FileReader();
      reader.onload = (event) => {
        const finalData = pictureData.map((pict, index) => {
          if(index === indexContent){
            if(isPicture){
              return {
                ...pict,
                [stateName]: {
                  ...Object.assign(file, {
                    preview: URL.createObjectURL(file),
                  }),
                  // fileBase64:event.target.result
                }
              }
            }
          }
          return pict
        })
        setPicture(finalData)
      };
      reader.readAsDataURL(file);
    }else{
      const restructureData = pictureData.map((pict, index) => {
        if(index === indexContent){
          if(stateName === 'fe_id'){
            const listAudience = pict.fe_id
            const isThere = pict.fe_id.find(ctn => ctn === acceptedFiles)
            if(isThere || isThere === 0){
              return {
                ...pict,
                [stateName]: pict.fe_id.filter(ctn => ctn !== acceptedFiles)
              }
            }
            listAudience.push(acceptedFiles)
            return {
              ...pict,
              [stateName]: listAudience
            }
          }
          return {
            ...pict,
            [stateName]: acceptedFiles.target.value
          }
        }
        return pict
      })
      setPicture(restructureData)
    }

  }

  const removePictureAdCreation = (indexContent) => {
    const restructureData = pictureData.map((pict, index) => {
      if(index === indexContent){
        return {
          ...pict,
          image: null
        }
      }
      return pict
    })
    setPicture(restructureData)
  }

  const changeBannerCollection = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      handleResetErrorValue('collectionBanner')
      reader.onload = (event) => {
        setBannerCollection({
          ...Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
          // fileBase64:event.target.result
        })
      };
      reader.readAsDataURL(file);
    }
  }

  const changeLogoCollection = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      handleResetErrorValue('collectionLogo')
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoCollection({
          ...Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
          // fileBase64:event.target.result
        })
      };
      reader.readAsDataURL(file);
    }
  }, []);

  function renderPopover(type, content){
    return(
        <Popover
          id={type}
          open={Boolean(hover) && activePopover === type}
          anchorEl={hover}
          anchorOrigin={{
          vertical: 'left',
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
    )
  }

  function renderErrorText(isShow, errorMessage){
    if(isShow){
      return (
        <div className={styles.ctnError}>
          <span>{errorMessage || 'Please check this field.'}</span>
        </div>
      )
    }
    return null
  }

  function renderAdAudience(item){
    if(item.selectedCategory === 'detail-targeting'){
      const detail = item.balancedTargeting
      const targeting = item.detailTargeting
      return (
        <div className={styles.ctnAdAudience}>
          {detail.cryptoCurrency && (
            <Typography variant="body2" className={styles.txtAudienceTargeting} textAlign={"center"} marginTop={1}>
              <span>+</span>
              {`Wallet-type: ${detail.cryptoCurrency.join(', ')}`}
          </Typography>
          )}
          {targeting.transactionAmount && (
            <Typography variant="body2" className={styles.txtAudienceTargeting} textAlign={"center"} marginTop={1}>
              <span>+</span>
              {`Amount of transactions: ${targeting.transactionAmount}`}
          </Typography>
          )}
          {targeting.tradingVolume && (
            <Typography variant="body2" className={styles.txtAudienceTargeting} textAlign={"center"} marginTop={1}>
              <span>+</span>
              {`Trading volume: ${targeting.tradingVolume}`}
          </Typography>
          )}
        </div>
      )
    }
    if(item.selectedCategory === 'optimized'){
      return (
        <div className={styles.ctnAdAudience}>
          <Typography variant="body2" className={styles.txtAudienceOptimized} textAlign={"center"} marginTop={1}>
              <span>+</span>
              Optmized Targeting
          </Typography>
          <Typography variant="body2" className={styles.txtAudienceOptimized} textAlign={"center"}>
            The audience consists of a broad mix of users, optimized by our algorithm.
          </Typography>
        </div>
      )
    }
    
  }


  function renderCampaignName(){
    return (
      <div className={`${styles.ctnSection} ${errorBox.errorBoxCampaignName ? styles.ctnRedBorder : ''}`} id="campaign-name">
        <div className={styles.ctnIcon}>
          <img src={campaignIcon} alt="campaign" />
        </div>
        <div className={styles.ctnMidInput}>
          <Typography variant="h6" paragraph>
            Campaign Name
          </Typography>
          <div className={styles.ctnGray}>
            <input
              placeholder='New campaign'
              type="text"
              onChange={(event) => { 
                handleChangeValues(event, 'campaign_name')
                deactivateErrorCampaign()
              }}
              value={formValues.campaign_name} />
          </div>
        </div>
        <div className={styles.ctnRightInput}>
          <Typography variant="h6" paragraph>
            Start Date
          </Typography>
          <div className={styles.ctnDate}>
            <div className={styles.containerDate}>
              <DatePicker selected={formValues.campaign_start_date} onChange={(date) => setFormValues({...formValues,  campaign_start_date: date})} />
            </div>
            <img src={blackCalendar} alt="calendar" />
          </div>
        </div>
      </div>
    )
  }

  function renderAvailability(){
    return (
      <div className={`${styles.ctnSection} ${errorBox.errorBoxAvailability ? styles.ctnRedBorder : ''}`} id="availability-section">
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
            <Grid item md={4} xl={3} xs={12}>
              <div 
                onClick={() => {
                  handleChangeDefaultValue('1', 'campaign_end_date_type')
                  deactivateErrorBoxAvailability()
                }}
                className={`${styles.inputGray} ${styles.fixedWidth} ${formValues.campaign_end_date_type !== '1' ? styles.unactiveChecbox : {}}`}>
                <div className={styles.leftWrapper}>
                  <CheckboxAds isActive={formValues.campaign_end_date_type === '1'} />
                </div>
                <div className={`${styles.midWrapper} ${formValues.campaign_end_date_type !== '1' ? styles.unactiveInput : {}}`}>
                  <span>After:</span>
                  <span><b>90</b></span>
                  <span>Days</span>
                </div>
              </div>
            </Grid>
            <Grid item md={4} xl={3} xs={12}>
            <div
              onClick={() => {
                handleChangeDefaultValue('2', 'campaign_end_date_type')
                deactivateErrorBoxAvailability()
              }}
              className={`${styles.inputGray} ${formValues.campaign_end_date_type !== '2' ? styles.unactiveChecbox : {}}`}>
              <div className={styles.leftWrapper}>
                  <CheckboxAds isActive={formValues.campaign_end_date_type === '2'} />
              </div>
              <div className={`${styles.midWrapper} ${formValues.campaign_end_date_type !== '2' ? styles.unactiveInput : {}}`}>
                <span>After:</span>
                <span><b>21</b></span>
                <span>Days</span>
              </div>
            </div>
            </Grid>
            <Grid item md={4} xl={3} xs={12}>

            <div className={styles.ctnInputColumn}>
              <div
                onClick={() => {
                  handleChangeDefaultValue('3', 'campaign_end_date_type')
                  deactivateErrorBoxAvailability()
                }}
                className={`${styles.inputGray} ${styles.fixedWidth} ${formValues.campaign_end_date_type !== '3' ? styles.unactiveChecbox : {}} ${Number(formValues.campaign_end_day) > 90 ? styles.ctnRedBorderInput : ''}`}>
                  <div className={styles.leftWrapper}>
                    <CheckboxAds isActive={formValues.campaign_end_date_type === '3'} />
                  </div>
                  <div className={`${styles.midWrapper} ${formValues.campaign_end_date_type !== '3' ? styles.unactiveInput : {}}`}>
                    <span>After:</span>
                    <input value={formValues.campaign_end_day} onChange={event => {handleChangeValues(event, 'campaign_end_day')}} type={'text'} />
                    <span>{isNaN(formValues.campaign_end_day) || formValues.campaign_end_day === '' || Number(formValues.campaign_end_day) === 1 ? 'Day' :'Days'}</span>
                  </div>
                  </div>
                  {Number(formValues.campaign_end_day) > 90 && <span id="red-alert">Please enter less than 91 days.</span>}
              </div>
            </Grid>
            </Grid>
          </div>
        </div>
      </div>
    )
  }

  function renderTargeting(){
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
          Reach exactly the Crypto-Users that you want to reach by using our state-of-the-art targeting options. And no need to worry – even if your audiences overlap, we will make sure that each wallet only receives your wallet ad once to get the most out of your budget and to avoid that your project might be considered as spam. Additionally, we will automatically exclude users who unsubscribed from our ads.
          </Typography>
          </div>
      </div>
    )
  }

  function renderBudget(){
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
              {`USD${getTotalBudget(audienceForm).toLocaleString()}`}
            </Typography>
          </div>
          {/* <div className={styles.ctnHorizontalRow} /> */}
          <div className={styles.ctnDesc}>
            <Typography variant="subtitle1" fontSize={20} marginBottom={1} paragraph>
            That's great!
            </Typography>
            <Typography variant="subtitle1" fontSize={20} className={styles.txtUserAirdrop} marginBottom={1} paragraph>
            <span>{`${getTotalUserGetAirdrop(audienceForm).toLocaleString()} users`}</span> will receive your airdrop
            </Typography>
          </div>
        </div>
      </div>
    )
  }

  function renderCardAudience(){
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
                    <Grid item md={4} lg={3} sm={6} xs={12} className={styles.ctnSectionAd} key={index.toString()}>
                      <CardAudience
                        isError={errorBox.errorAudience}
                        onChangeBudget={(event) => {handleChangeBudget(event, 'budgetAds', index)}}
                        showArrow={audienceForm.length > 4 ? selectedAudience === index && selectedAudience > 3 : selectedAudience === index}
                        isSomeAudienceActive={selectedAudience !== null}
                        key={index.toString()} data={item}
                        onPressCard={() => { 
                          if(errorBox.errorAudience){
                            setErrorBox({
                              ...errorBox,
                              errorAudience: false
                            })
                          }
                          setSelectedAudience(index)
                          setTimeout(() => {
                            window.location.href = '#create-audience'
                          }, 100)
                        }}
                        selectedAudience={selectedAudience}
                        selectedPage={selectedAudience === index}
                        label={`Audience ${index + 1}:`} />
                    </Grid>
                ))}
            </Grid>
        </div>
      </div>
    )
  }

  function renderDefineAudience(){
    return (
      <div className={styles.ctnDefineAudience}>
        {renderTargeting()}
        {renderCardAudience()}
        {selectedAudience !== null && <DefineAudience onAdd={(value) => {handleSaveAudienceValue(value)}} initialData={audienceForm[selectedAudience]} selectedAudience={selectedAudience} />}
        {renderAddAudience()}
        {renderBudget()}
        {/* {} */}
      </div>
    )
  }

  function renderLeftAdCreation(content, index){
    return (
      <div className={styles.ctnLeftCollection}>
        <div className={styles.ctnInputCollection}>
          <div className={styles.rowTitleWrapper}>
            <div className={styles.leftTitle}>
                <Typography
                  variant="h6">
                  Ad name
                </Typography>
              <img 
                  onMouseEnter={(event) => {handleHoverOpen(event, 'ad_name')}}
                  onMouseLeave={handleHoverClose}
                  src={askIcon} alt="ask" />
              {renderPopover('ad_name', questionObj.ad_name)}
            </div>
          </div>
          <div className={styles.inputCollectionWrapper}>
            <input value={content.name} onChange={(event) => {handleChangePicture(event, 'name', index)}} placeholder='Add your ad name here' type="text"  />
            {renderErrorText(errorBox.errorAds && !content.name)}
          </div>
        </div>
        <div className={styles.ctnInputCollection}>
          <div className={styles.rowTitleWrapper}>
            <div className={styles.leftTitle}>
                <Typography variant="h6">
                  Media
                </Typography>
              <img
                onMouseEnter={(event) => {handleHoverOpen(event, 'media')}}
                onMouseLeave={handleHoverClose}
                src={askIcon}
                alt="ask" />
              {renderPopover('media',questionObj.media)}
            </div>
            {/* <Typography variant="body2"  color='#808080'>
              Recommended size 350x350px 
            </Typography> */}
          </div>
          <BannerPicker
            typeScreen="logo"
            label={"Add media"}
            file={content.image}
            onDelete={() => {removePictureAdCreation(index)}}
            onDrop={(value) => {handleChangePicture(value, 'image', index, true)}} />
            {renderErrorText(errorBox.errorAds && !content.image)}
        </div>
      </div>
    )
  }

  function renderLeftCollection(){
    return (
      <div className={styles.ctnLeftCollection}>
        <div className={styles.ctnInputCollection}>
          <div className={styles.rowTitleWrapper}>
            <div className={styles.leftTitle}>
                <Typography variant="h6">
                  Collection page name
                </Typography>
              <img
                onMouseEnter={(event) => {handleHoverOpen(event, 'collection_page_name')}}
                onMouseLeave={handleHoverClose}
                src={askIcon}
                alt="ask" />
              {renderPopover('collection_page_name',questionObj.collection_page_name)}
            </div>
          </div>
          <div className={styles.inputCollectionWrapper}>
            <input onChange={(value) => {
              handleResetErrorValue('collectionPageName')
              handleChangeValues(value, 'ads_page_name')
            }} value={formValues.ads_page_name} placeholder='Add your collection page name here' type="text"  />
            {renderErrorText(errorInput.collectionPageName)}
          </div>
        </div>
        <div className={styles.ctnInputCollection}>
          <div className={styles.rowTitleWrapper}>
            <div className={styles.leftTitle}>
                <Typography variant="h6">
                Add logo
              </Typography>
              <img
                onMouseEnter={(event) => {handleHoverOpen(event, 'logo_text')}}
                onMouseLeave={handleHoverClose}
                src={askIcon}
                alt="ask" />
              {renderPopover('logo_text',questionObj.logo_text)}
            </div>
            <Typography variant="body2"  color='#808080'>
              Recommended size 350x350px 
            </Typography>
          </div>
          <BannerPicker
            typeScreen="logo"
            label={"Add logo"}
            file={logoCollection}
            onDelete={() => {setLogoCollection(null)}}
            onDrop={changeLogoCollection} />
          {renderErrorText(errorInput.collectionLogo)}
        </div>
        <div className={styles.ctnInputCollection}>
          <div className={styles.rowTitleWrapper}>
            <div className={styles.leftTitle}>
                <Typography variant="h6">
                  Add banner
                </Typography>
              <img
                onMouseEnter={(event) => {handleHoverOpen(event, 'logo_text_banner')}}
                onMouseLeave={handleHoverClose}
                src={askIcon}
                alt="ask" />
              {renderPopover('logo_text_banner',questionObj.logo_text_banner)}
            </div>
            <Typography variant="body2"  color='#808080'>
              Recommended size 1400x350px 
            </Typography>
          </div>
          <BannerPicker typeScreen="banner-collection" file={bannerCollection} onDelete={() => {setBannerCollection(null)}} onDrop={changeBannerCollection} label={"Add banner"} />
          {renderErrorText(errorInput.collectionBanner)}
        </div>
        <div className={styles.ctnInputCollection}>
          <div className={styles.rowTitleWrapper}>
            <div className={styles.leftTitle}>
                <Typography variant="h6">
                  Collection page text
                </Typography>
              <img 
                  onMouseEnter={(event) => {handleHoverOpen(event, 'collection_page_text')}}
                  onMouseLeave={handleHoverClose}
                  src={askIcon} alt="ask" />
              {renderPopover('collection_page_text', questionObj.collection_page_text)}
            </div>
          </div>
          <div className={styles.textAreaCollection}>
            <textarea
              onChange={(value) => {
                handleChangeValues(value, 'ads_page_description')
                handleResetErrorValue('collectionDesc')
              }}
              value={formValues.ads_page_description}
              placeholder='Add your collection page text here'   />
            {renderErrorText(errorInput.collectionDesc)}
          </div>
        </div>
      </div>
    )
  }

  function renderRightAdCreation(content, index){
    return (
      <div className={styles.ctnRightCollection}>
        <div className={styles.ctnInputCollection}>
          <div className={styles.rowTitleWrapper}>
            <div className={styles.leftTitle}>
                <Typography variant="h6">
                  Ad text
                </Typography>
              <img
                onMouseEnter={(event) => {handleHoverOpen(event, 'ad_text')}}
                onMouseLeave={handleHoverClose}
                src={askIcon}
                alt="ask" />
              {renderPopover('ad_text',questionObj.ad_text)}
            </div>
          </div>
          <div className={styles.textAreaCollection}>
            <textarea value={content.description} onChange={(event) => {handleChangePicture(event, 'description', index)}}  placeholder='Add your ad text here'   />
            {renderErrorText(errorBox.errorAds && !content.description)}
          </div>
        </div>
      </div>
    )
  }

  function renderRightCollection(){
    return (
      <div className={styles.ctnRightCollection}>
        <div className={styles.ctnInputCollection}>
          <div className={styles.rowTitleWrapper}>
            <Typography variant="h6">
                  Preview
            </Typography>
          </div>
          <CollectionPreview
            formValues={formValues}
            logoSource={logoCollection === null ? null : typeof file === 'string' ? logoCollection : logoCollection.preview || null}
            bannerSource={bannerCollection === null ? null : typeof file === 'string' ? bannerCollection : bannerCollection.preview || null} />
        </div>
        <div className={styles.ctnInputCollection}>
          <div className={styles.rowTitleWrapper}>
            <div className={styles.leftTitle}>
                <Typography variant="h6">
                  Add social media links
                </Typography>
              <img
                onMouseEnter={(event) => {handleHoverOpen(event, 'add_social_media_link')}}
                onMouseLeave={handleHoverClose}
                src={askIcon}
                alt="ask" />
              {renderPopover('add_social_media_link',questionObj.add_social_media_link)}
            </div>
          </div>
          <div className={styles.inputCollectionIcon}>
            <img src={websiteIcon} alt="website" />
            <input
              onChange={(value) => {
                handleResetErrorValue('collectionSocialMedia')
                handleChangeValues(value, 'ads_page_website')
              }}
              value={formValues.ads_page_website}
              placeholder="yoursite.io"
              type="text"  />
          </div>
          <div className={styles.inputCollectionIcon}>
            <img src={discordIcon} alt="discord" />
            <input
              onChange={(value) => {
                handleResetErrorValue('collectionSocialMedia')
                handleChangeValues(value, 'ads_page_discord')
              }}
              value={formValues.ads_page_discord}
              placeholder="https://discord.gg/abcdef"
              type="text"  />
          </div>
          <div className={styles.inputCollectionIcon}>
            <img src={mediumIcon} alt="medium" />
            <input
              onChange={(value) => {
                handleResetErrorValue('collectionSocialMedia')
                handleChangeValues(value, 'ads_page_medium')
              }}
              value={formValues.ads_page_medium}
              placeholder="https://medium.com/@YourMediumHandle"
              type="text"  />
          </div>
          <div className={styles.inputCollectionIcon}>
            <img src={telegramIcon} alt="telegram" />
            <input
              onChange={(value) => {
                handleResetErrorValue('collectionSocialMedia')
                handleChangeValues(value, 'ads_page_telegram')
              }}
              value={formValues.ads_page_telegram}
              placeholder="https://t.me/abcdef"
              type="text"  />
          </div>
        {renderErrorText(errorInput.collectionSocialMedia)}
        </div>
      </div>
    )
  }

  function renderInputCollection(){
    return (
      <div className={styles.ctnInputCollectionPageWrapper}>
        {renderLeftCollection()}
        {renderRightCollection()}
      </div>
    )
  }

  function renderCardAdCreation(content, index){
    return (
      <div className={`${styles.inputCollectionCard} ${errorBox.errorAds && !isAdsArrValid(content) ? styles.ctnRedBorder : ''}`} key={index.toString()}>
        <div className={styles.ctnInputCollectionPageWrapper}>
          {renderLeftAdCreation(content, index)}
          {renderRightAdCreation(content, index)}
        </div>
        <div className={styles.ctnSelectAudience}>
          <div className={styles.ctnInputCollection}>
            <div className={styles.rowTitleWrapper}>
              <div className={styles.leftTitle}>
                  <Typography variant="h6">
                    Choose which of your audiences should see this ad
                  </Typography>
                <img src={askIcon} alt="ask" />
              </div>
            </div>
          </div>
          <Grid container spacing={2}>
              {audienceForm.map((item, audienceIndex) => {
                const isActive = content.fe_id.includes(audienceIndex)
                const isEditable = isActive && checkIsAudienceAdsSelected(audienceIndex)
                return (
                  <Grid item md={3} sm={6} xs={12} className={styles.ctnSectionAd} key={audienceIndex.toString()}>
                    <div className={styles.ctnAudienceWrapper}>
                      <div className={`${styles.ctnAudienceItem} ${(item.optimized === false || checkIsAudienceAdsSelected(audienceIndex)) ? styles.ctnDisable : {}}`} onClick={() => {
                        if(item.optimized && isEditable || (!isActive && item.optimized && !checkIsAudienceAdsSelected(audienceIndex))){
                          deactivateErrorBoxAds()
                          handleChangePicture(audienceIndex, 'fe_id', index)
                        }
                      }}>
                        <CheckboxAds
                          
                          isActive={isActive} />
                        <Typography variant="subtitle1" color="#808080">
                          {`Audience ${audienceIndex + 1}`}
                        </Typography>
                      </div>
                      {renderErrorText(errorBox.errorAds&& !isActive && item.optimized && !checkIsAudienceAdsSelected(audienceIndex))}
                      {renderAdAudience(item)}
                    </div>
                </Grid>
                )
              })}
          </Grid>
        </div>
      </div>
    )
  }

  function renderAdCreation(){
    return (
      <div className={styles.ctnAdCreation} id="card-ads">
        <div className={styles.ctnTitle}>
          <div className={styles.rowTitle} />
          <Typography variant="h5" marginTop={2} marginX={2} paragraph>
            Ad Creation
          </Typography>
          <div className={styles.rowTitle} />
        </div>
        {pictureData.map((content, index) => renderCardAdCreation(content, index))}
      </div>

    )
  }

  function renderCreateAnotherAd(){
    return (
      <div className={styles.btnCreateAd} onClick={() => {
        const currentArr = [...pictureData]
        currentArr.push({image: null, fe_id: [], name: '', description: '' })
        setPicture(currentArr)
      }}>
        <img src={addIcon} alt="addIcon" />
        <Typography variant='h6' color={'#B3B3B3'} fontWeight='bold'>Create another ad</Typography>
      </div>
    )
  }

  function renderAddAudience(){
    if(checkIsFormMax(audienceForm)){
      return (
        <div className={styles.btnCreateAd} onClick={handleAddAudience}>
          <img src={addIcon} alt="addIcon" />
          <Typography variant='h6' color={'#B3B3B3'} fontWeight='bold'>Add more audiences</Typography>
        </div>
      )
    }
    return null
  }

  function renderCollectionPage(){
    return (
      <div className={styles.ctnDefineAudience}>
        <div className={styles.ctnTitle}>
          <div className={styles.rowTitle} />
          <Typography variant="h5" marginTop={2} marginX={2} paragraph>
            Collection page creation
          </Typography>
          <div className={styles.rowTitle} />
        </div>
        <div className={styles.inputCollectionCard}>
          {renderInputCollection()}
        </div>
        {renderAdCreation()}
        {renderCreateAnotherAd()}
      </div>
    )
  }

  function renderSetupAirdrop(){
    return (
      <div className={styles.setupAirdropWrapper}>
        <DefaultButton
          isLoading={loadingSubmit}
          onClick={validateSubmit}
          // onClick={() => {
          //   setModalSuccess('cryptocurrency')
          // }}
          label={"Setup Airdrop"}
           />
      </div>
    )
  }

  return (

    <Page title="Campaign Creation">
      <meta name="description" content="Create your campaign on WALLETADS now!" />
      <div className={styles.ctnRoot}>
        <div className={styles.ctnWrapper}>
        <HeaderUser />
        {renderCampaignName()}
        {renderAvailability()}
        {renderDefineAudience()}
        {renderCollectionPage()}
        {renderSetupAirdrop()}
        </div>
        {/* <AuthFooter /> */}
        <SuccessAddCampaign isVisible={showModalSuccess} handleHoverClose={handleResetPage} />
        <AddPaymentMethod
          callbackSuccess={(modalType) => {
            setModalSuccess(modalType)
          }}
          totalBudget={getTotalBudget(audienceForm)}
          showCreditCard={showCreditCard}
          isVisible={showCreditCard.isVisible}
          directStripe={directStripe}
          // isVisible
          onClose={() => {setShowCreditCard({ ...showCreditCard, isVisible: false })}}
          handleHoverClose={() => { 
            handleResetPage()
            setShowCreditCard({ 
              sessionId: null,
              campaignId: null,
              isVisible: false
            })
          }} />
        {/* <CreditCard
          callbackSuccess={(modalType) => {
            handleSubmit(modalType)
          }}
          totalBudget={getTotalBudget(audienceForm)}
          isVisible={showCreditCard}
          // isVisible
          handleHoverClose={() => { setShowCreditCard(null)}} /> */}
      </div>
    </Page>
  );
}



export async function getServerSideProps(context) {
  try{
    await getProfilUser(context)
    const UA = context.req.headers['user-agent'];
    const isMobile = Boolean(UA.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    ))
    let params = {}
    let content = null
    if(isMobile){
      return {
          redirect: {
              permanent: false,
              destination: `/forbidden`
          }
      }
    }
    if(context.query){
      params = context.query
      if(context.query.id && context.query.status === 'fail'){
        const res = await getCampaignDetail(context, context.query.id)
        content = res.data
      }

    }
    return {
      props: {
        content,
        params 
      }, // will be passed to the page component as props
    }
  }catch(err){
    return {
      redirect: {
          permanent: false,
          destination: `/login`
      }
    }
  }
}