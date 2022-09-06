import { Grid, Typography } from '@mui/material';
// layouts
// import Layout from '../../layouts';
// hooks
// import useSettings from '../../hooks/useSettings';
// components
// import Page from '../../components/Page';
import useStyles from './styles'
import BannerPicker from '../../../components/banner-picker';
import CollectionPreview from '../../../components/collection-preview';
import CheckboxAds from '../../../components/checkbox';
import React, { useCallback, useState } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import DefineAudience from '../../../components/define-audience';
import CardAudience from '../../../components/card-audience';
import { checkIsFormMax, getTotalBudget, getTotalUserGetAirdrop } from '../../../helpers/calculator';
import Page from '../../../components/Page';
import Layout from '../../../layouts';
import HeaderUser from '../../../components/header-user';

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
  {adCreationMedia: null, selectedAudienceAd: [] },
]

export default function AddCampaign() {
  const styles = useStyles()
  // const { themeStretch } = useSettings();
  const [bannerCollection, setBannerCollection] = useState(null)
  const [logoCollection, setLogoCollection] = useState(null)
  const [adCreationMedia, setAdcreationMedia] = useState(null)
  const [pictureData, setPicture] = useState(initialPicture)
  const [formValues, setFormValues] = useState({
    campaignStartDate: new Date(),
    availabilityDate: new Date(),
    collectionPageName: '',
    collectionPageDesc: '',
  })
  const [selectedAvailabilityDay, setAvailabilityDay] = useState('7')
  const [selectedAvailability, setAvailability] = useState(null)
  const [selectedAudience, setSelectedAudience] = useState(null)

  const [audienceForm, setAudienceForm] = useState([
    {optimized: false, selectedCategory: null, budgetAds: '0.000', detailTargeting: {amountDays: ''}, balancedTargeting: { cryptoCurrency: null, year: null, months: null, day: null, airdropReceived: null }},
    {optimized: false, selectedCategory: null, budgetAds: '0.000', detailTargeting: {amountDays: ''}, balancedTargeting: { cryptoCurrency: null, year: null, months: null, day: null, airdropReceived: null }},
    {optimized: false, selectedCategory: null, budgetAds: '0.000', detailTargeting: {amountDays: ''}, balancedTargeting: { cryptoCurrency: null, year: null, months: null, day: null, airdropReceived: null }},
    {optimized: false, selectedCategory: null, budgetAds: '0.000', detailTargeting: {amountDays: ''}, balancedTargeting: { cryptoCurrency: null, year: null, months: null, day: null, airdropReceived: null }},
  ])

  const handleChangeValues = (event, stateName) => {
    setFormValues({
      ...formValues,
      [stateName]: event.target.value
    })
  }

  const handleChangeBudget = (event, stateName, contentIndex) => {
    const restructureData = audienceForm.map((item, index) => {
      if(index === contentIndex){
        return {
          ...item,
          budgetAds: event.target.value
        }
      }
      return item
    })
    setAudienceForm(restructureData)
  }

  const handleSaveAudienceValue = (value) => {
    console.log("SET data:", value)
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
    }
    const restructureData = pictureData.map((pict, index) => {
      if(index === indexContent){
        if(isPicture){
          return {
            ...pict,
            [stateName]: Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          }
        }
        if(stateName === 'selectedAudienceAd'){
          const listAudience = pict.selectedAudienceAd
          console.log("Check listAudience:", listAudience, selectedAudience)
          const isThere = pict.selectedAudienceAd.find(ctn => ctn === acceptedFiles)
          if(isThere){
            return {
              ...pict,
              [stateName]: pict.selectedAudienceAd.filter(ctn => ctn !== acceptedFiles)
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
          [stateName]: acceptedFiles
        }
      }
      return pict
    })

    setPicture(restructureData)
  }

  const removePictureAdCreation = (indexContent) => {
    const restructureData = pictureData.map((pict, index) => {
      if(index === indexContent){
        return {
          ...pict,
          adCreationMedia: null
        }
      }
      return pict
    })
    setPicture(restructureData)
  }


  const changeAdCreationMedia = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setAdcreationMedia(Object.assign(file, {
        preview: URL.createObjectURL(file),
      }))
    }
  }, []);

  const changeBannerCollection = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setBannerCollection(Object.assign(file, {
        preview: URL.createObjectURL(file),
      }))
    }
  }, []);

  const changeLogoCollection = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setLogoCollection(Object.assign(file, {
        preview: URL.createObjectURL(file),
      }))
    }
  }, []);


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
            <input placeholder='New campaign' type="text" id="campaign" name="campaign" />
          </div>
        </div>
        <div className={styles.ctnRightInput}>
          <Typography variant="h6" paragraph>
            Start Date
          </Typography>
          <div className={styles.ctnDate}>
            <div className={styles.containerDate}>
              <DatePicker  selected={formValues.campaignStartDate} onChange={(date) => setFormValues({...formValues,  campaignStartDate: date})} />
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
              <div className={`${styles.inputGray} ${styles.fixedWidth} ${selectedAvailability !== 0 ? styles.unactiveChecbox : {}}`}>
                <div className={styles.leftWrapper}>
                <CheckboxAds isActive={selectedAvailability === 0} onChange={() => {setAvailability(0)}} />
                  <span>After:</span>
                </div>
                <div className={`${styles.midWrapper} ${selectedAvailability !== 0 ? styles.unactiveInput : {}}`}>
                  <input value={selectedAvailabilityDay} onChange={event => {setAvailabilityDay(event.target.value)}} type={'text'} />
                </div>
                <div className={styles.rightWrapper}>
                  <span>Days</span>
                </div>
              </div>
            </Grid>
            <Grid item md={4} xl={3} xs={12}>
            <div className={`${styles.inputGray} ${selectedAvailability !== 1 ? styles.unactiveChecbox : {}}`}>
              <div className={styles.leftWrapper}>
              <CheckboxAds isActive={selectedAvailability === 1} onChange={() => {setAvailability(1)}} />
                <span>On</span>
              </div>
              <div className={styles.altDateWrapper}>
                <div className={styles.containerDate}>
                  <DatePicker  selected={formValues.availabilityDate} onChange={(date) => setFormValues({...formValues,  availabilityDate: date})} />
                </div>
                <img src={blackCalendar} alt="calendar" />
              </div>
            </div>
            </Grid>
            <Grid item md={4} xl={3} xs={12}>
              <div className={`${styles.inputGray} ${styles.fixedWidth} ${selectedAvailability !== 2 ? styles.unactiveChecbox : {}}`}>
                <div className={styles.leftWrapper}>
                  <CheckboxAds isActive={selectedAvailability === 2} onChange={() => {setAvailability(2)}} />
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
        <div className={styles.ctnIconTarget}>
          <img src={targetIcon} alt="campaign" />
        </div>
        <div className={styles.ctnMidInput}>
          <Typography variant="h6" paragraph>
            Targeting
          </Typography>
          <Typography variant="span" paragraph>
            Reach exactly the Crypto-Users that you want to reach by using our state-of-the-art targeting options. And no need to worry – even if your audiences overlap, we will make sure that each wallet only receives your wallet ad once to get the most out of your budget and to avoid that your project might be considered as spam.
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
              {`USD${getTotalBudget(audienceForm)}`}
            </Typography>
          </div>
          {/* <div className={styles.ctnHorizontalRow} /> */}
          <div className={styles.ctnDesc}>
            <Typography variant="subtitle1" fontSize={20} marginBottom={1} paragraph>
            That's great!
            </Typography>
            <Typography variant="subtitle1" fontSize={20} marginBottom={1} paragraph>
            <b>{`${getTotalUserGetAirdrop(audienceForm)} users`}</b> will receive your airdrop
            </Typography>
          </div>
        </div>
      </div>
    )
  }

  function renderCardAudience(){
    console.log("Check selectedAudience:", selectedAudience)
    return (
      <div className={styles.cardAudienceWrapper}>
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
            <input placeholder='Add your ad name here' type="text" id="campaign" name="campaign" />
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
            file={content.adCreationMedia}
            onDelete={() => {removePictureAdCreation(index)}}
            onDrop={(value) => {handleChangePicture(value, 'adCreationMedia', index, true)}} />
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
            <input onChange={(value) => {handleChangeValues(value, 'collectionPageName')}} value={formValues.collectionPageName} placeholder='Add your collection page name here' type="text" id="campaign" name="campaign" />
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
            <textarea onChange={(value) => {handleChangeValues(value, 'collectionPageDesc')}} value={formValues.collectionPageDesc} placeholder='Add your collection page text here'  id="campaign" name="campaign" />
          </div>
        </div>
      </div>
    )
  }

  function renderRightAdCreation(){
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
            <textarea placeholder='Add your ad text here'  id="campaign" name="campaign" />
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
            <input placeholder='yourwebsitehere.com' type="text" id="campaign" name="campaign" />
          </div>
          <div className={styles.inputCollectionIcon}>
            <img src={discordIcon} alt="discord" />
            <input placeholder='https://discord.gg/yourdiscord' type="text" id="campaign" name="campaign" />
          </div>
          <div className={styles.inputCollectionIcon}>
            <img src={twitterIcon} alt="twitter" />
            <input placeholder='https://twitter.com/YourTwitter' type="text" id="campaign" name="campaign" />
          </div>
          <div className={styles.inputCollectionIcon}>
            <img src={instagramIcon} alt="instagram" />
            <input placeholder='https://instagram.com/YourInstagram' type="text" id="campaign" name="campaign" />
          </div>
          <div className={styles.inputCollectionIcon}>
            <img src={mediumIcon} alt="medium" />
            <input placeholder='https://medium.com/@YourMedium' type="text" id="campaign" name="campaign" />
          </div>
          <div className={styles.inputCollectionIcon}>
            <img src={facebookIcon} alt="facebook" />
            <input placeholder='https://facebook.com/Your.Facebook' type="text" id="campaign" name="campaign" />
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
                  <div className={`${styles.ctnAudienceItem} ${item.optimized === false ? styles.ctnDisable : {}}`}>
                    <CheckboxAds
                      isActive={content.selectedAudienceAd.includes(audienceIndex)}
                      onChange={() => {
                        if(item.optimized){
                          handleChangePicture(audienceIndex, 'selectedAudienceAd', index)
                        }
                      }} />
                    <Typography variant="subtitle1" color="#808080">
                      {`Audience ${audienceIndex + 1}`}
                    </Typography>
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
        currentArr.push(initialPicture)
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
        <div className={styles.btnSetupAirdrop}>
          <Typography variant='h6' color={'#fff'}>Setup airdrop</Typography>
        </div>
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
      </div>
    </Page>
  );
}
