import { Grid, Typography } from '@mui/material';
import useStyles from './styles'
import BannerPicker from '../../../components/banner-picker';
import CollectionPreview from '../../../components/collection-preview';
import CheckboxAds from '../../../components/checkbox';
import React, { useCallback, useEffect, useState } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import DefineAudience from '../../../components/define-audience';
import CardAudience from '../../../components/card-audience';
import { checkIsFormMax, getTotalBudget, getTotalUserGetAirdrop } from '../../../helpers/calculator';
import Page from '../../../components/Page';
import Layout from '../../../layouts';
import HeaderUser from '../../../components/header-user';
import { getUserData } from '../../../helpers/auth';
import { getCampaignItem, handleAddCampaign } from '../../../utils/requests';
import DefaultButton from '../../../components/default-button';
import moment from 'moment';
import AuthFooter from '../../../components/auth-footer';

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
const facebookIcon = '/assets/facebook.png'
const instagramIcon = '/assets/instagram.png'
const mediumIcon = '/assets/medium.png'
const twitterIcon = '/assets/twitter.png'
const websiteIcon = '/assets/website.png'

const initialPicture = [
  {image: null, fe_id: [], name: '', description: '' },
]

export default function AddCampaign({ content }) {
  const styles = useStyles()
  // const { themeStretch } = useSettings();
  const [bannerCollection, setBannerCollection] = useState(null)
  const [logoCollection, setLogoCollection] = useState(null)
  const [pictureData, setPicture] = useState(initialPicture)
  const [formValues, setFormValues] = useState({
    campaign_name: content.name,
    campaign_start_date: content.start_date ? new Date(content.start_date) : new Date(),
    campaign_end_date_type: '',
    campaign_end_date: new Date(),
    campaign_end_day: '7',
    ads_page_name: "",
    ads_page_description: "",
    ads_page_website: "",
    ads_page_discord: "",
    ads_page_twitter: "",
    ads_page_instagram: "",
    ads_page_medium: "",
    ads_page_facebook: "",
  })
  const [selectedAudience, setSelectedAudience] = useState(null)
  const [loadingSubmit, setLoadingSubmit] = useState(null)

  const [audienceForm, setAudienceForm] = useState([
    {optimized: false, selectedCategory: null, budgetAds: '', detailTargeting: {amountDays: ''}, balancedTargeting: { cryptoCurrency: null, year: null, months: null, day: null, airdropReceived: null }},
    {optimized: false, selectedCategory: null, budgetAds: '', detailTargeting: {amountDays: ''}, balancedTargeting: { cryptoCurrency: null, year: null, months: null, day: null, airdropReceived: null }},
    {optimized: false, selectedCategory: null, budgetAds: '', detailTargeting: {amountDays: ''}, balancedTargeting: { cryptoCurrency: null, year: null, months: null, day: null, airdropReceived: null }},
    {optimized: false, selectedCategory: null, budgetAds: '', detailTargeting: {amountDays: ''}, balancedTargeting: { cryptoCurrency: null, year: null, months: null, day: null, airdropReceived: null }},
  ])
  useEffect(() => {
    getCampaignItem()
    if(content && content.length > 0){
      // const data = content[0]
      // setFormValues({
      //   campaign_name: data.name,
      //   campaign_start_date: data.start_date ? new Date(data.start_date) : new Date(),
      //   campaign_end_date_type: '',
      //   campaign_end_date: new Date(),
      //   campaign_end_date_day: '7',
      //   ads_page_name: "",
      //   ads_page_description: "",
      //   ads_page_website: "",
      //   ads_page_discord: "",
      //   ads_page_twitter: "",
      //   ads_page_instagram: "",
      //   ads_page_medium: "",
      //   ads_page_facebook: "",
      // })
    }
  }, [])

  const handleSubmit = async() => {
    try{
      setLoadingSubmit(true)
      const objRes = {
        "campaign_name": formValues.campaign_name,
        "campaign_start_date": moment(formValues.campaign_start_date).format('YYYY-MM-DD'),
        "campaign_end_date_type": formValues.campaign_end_date_type,
        "campaign_end_date_day":  formValues.campaign_end_date_day,
        "campaign_end_date": moment(formValues.campaign_end_date).format('YYYY-MM-DD'),

        "campaign_audiences": audienceForm.map((audience, index) => ({
              "fe_id": index,
              "price": audience.budgetAds,

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
          })),
    
        "ads_page_name": formValues.ads_page_name,
        "ads_page_description": formValues.ads_page_description,
        "ads_page_website": formValues.ads_page_website,
        "ads_page_discord": formValues.ads_page_discord,
        "ads_page_twitter": formValues.ads_page_twitter,
        "ads_page_instagram": formValues.ads_page_instagram,
        "ads_page_medium": formValues.ads_page_medium,
        "ads_page_facebook": formValues.ads_page_facebook,
        // "ads_page_external_page": "https://external.com",
        "ads_page_logo": logoCollection ? logoCollection.fileBase64 : null,
        "ads_page_banner": bannerCollection ? bannerCollection.fileBase64 : null,
    
        "campaign_ads": pictureData.map(campaign => ({
            ...campaign,
            image: campaign.image ? campaign.image.fileBase64 : null
          }))
      }
      const res = await handleAddCampaign(objRes)
      setLoadingSubmit(false)
    }catch(err){
      setLoadingSubmit(false)
    }
  }

  const handleChangeValues = (event, stateName) => {
    setFormValues({
      ...formValues,
      [stateName]: event.target.value
    })
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
          budgetAds: event.target.value.replace(/[^0-9]/g, '')
        }
      }
      return item
    })
    setAudienceForm(restructureData)
  }

  const handleSaveAudienceValue = (value) => {
    const restructureData = audienceForm.map((item, index) => {
      if(index === selectedAudience){
        return value
      }
      return item
    })
    setAudienceForm(restructureData)
    setSelectedAudience(null)
  }

  const handleAddAudience = () => {
    const addData = [
      {optimized: false, selectedCategory: null, budgetAds: '0.000', detailTargeting: {amountDays: ''}, balancedTargeting: { cryptoCurrency: null, year: null, months: null, day: null, airdropReceived: null }},
      {optimized: false, selectedCategory: null, budgetAds: '0.000', detailTargeting: {amountDays: ''}, balancedTargeting: { cryptoCurrency: null, year: null, months: null, day: null, airdropReceived: null }},
      {optimized: false, selectedCategory: null, budgetAds: '0.000', detailTargeting: {amountDays: ''}, balancedTargeting: { cryptoCurrency: null, year: null, months: null, day: null, airdropReceived: null }},
      {optimized: false, selectedCategory: null, budgetAds: '0.000', detailTargeting: {amountDays: ''}, balancedTargeting: { cryptoCurrency: null, year: null, months: null, day: null, airdropReceived: null }},
    ]
    const listData = [...audienceForm]
    setAudienceForm(listData.concat(addData))
  }

  const handleChangePicture = (acceptedFiles, stateName, indexContent, isPicture) => {
    let file = null;
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
                  fileBase64:event.target.result
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
            if(isThere){
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

  const changeBannerCollection = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBannerCollection({
          ...Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
          fileBase64:event.target.result
        })
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const changeLogoCollection = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoCollection({
          ...Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
          fileBase64:event.target.result
        })
      };
      reader.readAsDataURL(file);
    }
  }, []);

  function renderAdAudience(item){
    if(item.selectedCategory === 'detail-targeting'){
      const detail = item.balancedTargeting
      const targeting = item.detailTargeting
      return (
        <div className={styles.ctnAdAudience}>
          {detail.cryptoCurrency && (
            <Typography variant="body2" className={styles.txtAudienceTargeting} textAlign={"center"} marginTop={1}>
              <span>+</span>
              {`Wallet-type: ${detail.cryptoCurrency}`}
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
      <div className={styles.ctnSection}>
        <div className={styles.ctnIcon}>
          <img src={campaignIcon} alt="campaign" />
        </div>
        <div className={styles.ctnMidInput}>
          <Typography variant="h6" paragraph>
            Campaign Name
          </Typography>
          <div className={styles.ctnGray}>
            <input placeholder='New campaign' type="text" onChange={(event) => { handleChangeValues(event, 'campaign_name')}} value={formValues.campaign_name} />
          </div>
        </div>
        <div className={styles.ctnRightInput}>
          <Typography variant="h6" paragraph>
            Start Date
          </Typography>
          <div className={styles.ctnDate}>
            <div className={styles.containerDate}>
              <DatePicker  selected={formValues.campaign_start_date} onChange={(date) => setFormValues({...formValues,  campaign_start_date: date})} />
            </div>
            <img src={blackCalendar} alt="calendar" />
          </div>
        </div>
      </div>
    )
  }

  function renderAvailability(){

    return (
      <div className={styles.ctnSection}>
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
              <div className={`${styles.inputGray} ${styles.fixedWidth} ${formValues.campaign_end_date_type !== '1' ? styles.unactiveChecbox : {}}`}>
                <div className={styles.leftWrapper}>
                  <CheckboxAds isActive={formValues.campaign_end_date_type === '1'} onChange={() => {handleChangeDefaultValue('1', 'campaign_end_date_type')}} />
                  <span>After:</span>
                </div>
                <div className={`${styles.midWrapper} ${formValues.campaign_end_date_type !== '1' ? styles.unactiveInput : {}}`}>
                  <input value={formValues.campaign_end_day} onChange={event => {handleChangeValues(event, 'campaign_end_day')}} type={'text'} />
                </div>
                <div className={styles.rightWrapper}>
                  <span>Days</span>
                </div>
              </div>
            </Grid>
            <Grid item md={4} xl={3} xs={12}>
            <div className={`${styles.inputGray} ${formValues.campaign_end_date_type !== '2' ? styles.unactiveChecbox : {}}`}>
              <div className={styles.leftWrapper}>
                <CheckboxAds isActive={formValues.campaign_end_date_type === '2'} onChange={() => {handleChangeDefaultValue('2', 'campaign_end_date_type')}} />
                <span>On</span>
              </div>
              <div className={styles.altDateWrapper}>
                <div className={styles.containerDate}>
                  <DatePicker selected={formValues.campaign_end_date} onChange={(date) => setFormValues({...formValues,  campaign_end_date: date})} />
                </div>
                <img src={blackCalendar} alt="calendar" />
              </div>
            </div>
            </Grid>
            <Grid item md={4} xl={3} xs={12}>
              <div className={`${styles.inputGray} ${styles.fixedWidth} ${formValues.campaign_end_date_type !== '3' ? styles.unactiveChecbox : {}}`}>
                <div className={styles.leftWrapper}>
                  <CheckboxAds isActive={formValues.campaign_end_date_type === '3'} onChange={() => {handleChangeDefaultValue('3', 'campaign_end_date_type')}} />
                  <span>Never</span>
                </div>
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
            <Typography variant="subtitle1" fontSize={20} marginBottom={1} paragraph>
            <b>{`${getTotalUserGetAirdrop(audienceForm).toLocaleString()} users`}</b> will receive your airdrop
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
                      <CardAudience onChangeBudget={(event) => {handleChangeBudget(event, 'budgetAds', index)}} showArrow={audienceForm.length > 4 ? selectedAudience === index && selectedAudience > 3 : selectedAudience === index} isSomeAudienceActive={selectedAudience !== null} key={index.toString()} data={item} onPressCard={() => { setSelectedAudience(index)}} selectedAudience={selectedAudience} selectedPage={selectedAudience === index} label={`Audience ${index + 1}:`} />
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
                <Typography variant="h6">
                  Ad name
                </Typography>
              <img src={askIcon} alt="ask" />
            </div>
          </div>
          <div className={styles.inputCollectionWrapper}>
            <input value={content.name} onChange={(event) => {handleChangePicture(event, 'name', index)}} placeholder='Add your ad name here' type="text"  />
          </div>
        </div>
        <div className={styles.ctnInputCollection}>
          <div className={styles.rowTitleWrapper}>
            <div className={styles.leftTitle}>
                <Typography variant="h6">
                  Media
                </Typography>
              <img src={askIcon} alt="ask" />
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
              <img src={askIcon} alt="ask" />
            </div>
          </div>
          <div className={styles.inputCollectionWrapper}>
            <input onChange={(value) => {handleChangeValues(value, 'ads_page_name')}} value={formValues.ads_page_name} placeholder='Add your collection page name here' type="text"  />
          </div>
        </div>
        <div className={styles.ctnInputCollection}>
          <div className={styles.rowTitleWrapper}>
            <div className={styles.leftTitle}>
                <Typography variant="h6">
                Add logo
              </Typography>
              <img src={askIcon} alt="ask" />
            </div>
            <Typography variant="body2"  color='#808080'>
              Recommended size 350x350px 
            </Typography>
          </div>
          <BannerPicker typeScreen="logo" label={"Add logo"} file={logoCollection} onDelete={() => {setLogoCollection(null)}} onDrop={changeLogoCollection} />
        </div>
        <div className={styles.ctnInputCollection}>
          <div className={styles.rowTitleWrapper}>
            <div className={styles.leftTitle}>
                <Typography variant="h6">
                  Add banner
                </Typography>
              <img src={askIcon} alt="ask" />
            </div>
            <Typography variant="body2"  color='#808080'>
              Recommended size 1400x400px 
            </Typography>
          </div>
          <BannerPicker typeScreen="banner-collection" file={bannerCollection} onDelete={() => {setBannerCollection(null)}} onDrop={changeBannerCollection} label={"Add banner"} />
        </div>
        <div className={styles.ctnInputCollection}>
          <div className={styles.rowTitleWrapper}>
            <div className={styles.leftTitle}>
                <Typography variant="h6">
                  Collection page text
                </Typography>
              <img src={askIcon} alt="ask" />
            </div>
          </div>
          <div className={styles.textAreaCollection}>
            <textarea onChange={(value) => {handleChangeValues(value, 'ads_page_description')}} value={formValues.ads_page_description} placeholder='Add your collection page text here'   />
          </div>
        </div>
      </div>
    )
  }
  console.log("Check pictureData:", pictureData)

  function renderRightAdCreation(content, index){
    return (
      <div className={styles.ctnRightCollection}>
        <div className={styles.ctnInputCollection}>
          <div className={styles.rowTitleWrapper}>
            <div className={styles.leftTitle}>
                <Typography variant="h6">
                  Ad text
                </Typography>
              <img src={askIcon} alt="ask" />
            </div>
          </div>
          <div className={styles.textAreaCollection}>
            <textarea value={content.description} onChange={(event) => {handleChangePicture(event, 'description', index)}}  placeholder='Add your ad text here'   />
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
              <img src={askIcon} alt="ask" />
            </div>
          </div>
          <div className={styles.inputCollectionIcon}>
            <img src={websiteIcon} alt="website" />
            <input onChange={(value) => {handleChangeValues(value, 'ads_page_website')}} value={formValues.ads_page_website} placeholder='yourwebsitehere.com' type="text"  />
          </div>
          <div className={styles.inputCollectionIcon}>
            <img src={discordIcon} alt="discord" />
            <input onChange={(value) => {handleChangeValues(value, 'ads_page_discord')}} value={formValues.ads_page_discord} placeholder='https://discord.gg/yourdiscord' type="text"  />
          </div>
          <div className={styles.inputCollectionIcon}>
            <img src={twitterIcon} alt="twitter" />
            <input onChange={(value) => {handleChangeValues(value, 'ads_page_twitter')}} value={formValues.ads_page_twitter} placeholder='https://twitter.com/YourTwitter' type="text"  />
          </div>
          <div className={styles.inputCollectionIcon}>
            <img src={instagramIcon} alt="instagram" />
            <input onChange={(value) => {handleChangeValues(value, 'ads_page_instagram')}} value={formValues.ads_page_instagram} placeholder='https://instagram.com/YourInstagram' type="text"  />
          </div>
          <div className={styles.inputCollectionIcon}>
            <img src={mediumIcon} alt="medium" />
            <input onChange={(value) => {handleChangeValues(value, 'ads_page_medium')}} value={formValues.ads_page_medium} placeholder='https://medium.com/@YourMedium' type="text"  />
          </div>
          <div className={styles.inputCollectionIcon}>
            <img src={facebookIcon} alt="facebook" />
            <input onChange={(value) => {handleChangeValues(value, 'ads_page_facebook')}} value={formValues.ads_page_facebook} placeholder='https://facebook.com/Your.Facebook' type="text"  />
          </div>
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
      <div className={styles.inputCollectionCard} key={index.toString()}>
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
              {audienceForm.map((item, audienceIndex) => (
                  <Grid item md={3} sm={6} xs={12} className={styles.ctnSectionAd} key={audienceIndex.toString()}>
                    <div className={styles.ctnAudienceWrapper}>
                      <div className={`${styles.ctnAudienceItem} ${item.optimized === false ? styles.ctnDisable : {}}`}>
                        <CheckboxAds
                          isActive={content.fe_id.includes(audienceIndex)}
                          onChange={() => {
                            if(item.optimized){
                              handleChangePicture(audienceIndex, 'fe_id', index)
                            }
                          }} />
                        <Typography variant="subtitle1" color="#808080">
                          {`Audience ${audienceIndex + 1}`}
                        </Typography>
                      </div>
                      {renderAdAudience(item)}
                    </div>
                </Grid>
                ))}
          </Grid>
        </div>
      </div>
    )
  }

  function renderAdCreation(){
    return (
      <div className={styles.ctnAdCreation}>
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
        <DefaultButton isLoading={loadingSubmit} label={"Setup Airdrop"} onClick={handleSubmit} />
      </div>
    )
  }

  return (

    <Page title="Add Campaign">
      <div className={styles.ctnRoot}>
        <div className={styles.ctnWrapper}>
        <HeaderUser />
        {renderCampaignName()}
        {renderAvailability()}
        {renderDefineAudience()}
        {renderCollectionPage()}
        {renderSetupAirdrop()}
        </div>
        <AuthFooter />
      </div>
    </Page>
  );
}



export async function getServerSideProps(context) {
  const userData = getUserData(context)
  if(!userData){
      return {
          redirect: {
              permanent: false,
              destination: `/login`
          }
      }
  }
  const res = await getCampaignItem(context)
  return {
    props: {
      userData,
      content: res.data.data
    }, // will be passed to the page component as props
  }
}