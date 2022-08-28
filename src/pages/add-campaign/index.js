import { Container, Grid, Typography } from '@mui/material';
// layouts
import Layout from '../../layouts';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import useStyles from './styles'
import BannerPicker from '../../components/banner-picker';
import CollectionPreview from '../../components/collection-preview';
import CheckboxAds from '../../components/checkbox';
import React, { useState } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// ----------------------------------------------------------------------

// PageOne.getLayout = function getLayout(page) {
//   return <Layout>{page}</Layout>;
// };

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

export default function PageOne() {
  const styles = useStyles()
  const { themeStretch } = useSettings();
  const [formValues, setFormValues] = useState({
    campaignStartDate: new Date(),
    availabilityDate: new Date(),
  })

  const campaignStartDateRef = React.useRef(null)

  console.log("Check ref:", campaignStartDateRef)

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
            <div className={styles.inputGray}>
              <div className={styles.leftWrapper}>
                <CheckboxAds />
                <span>After:</span>
              </div>
              <div className={styles.midWrapper}>
                <span>7</span>
              </div>
              <div className={styles.rightWrapper}>
                <span>Days</span>
              </div>
            </div>
            <div className={styles.inputGray}>
              <div className={styles.leftWrapper}>
                <CheckboxAds />
                <span>On</span>
              </div>
              <div className={styles.altDateWrapper}>
                <div className={styles.containerDate}>
                  <DatePicker  selected={formValues.availabilityDate} onChange={(date) => setFormValues({...formValues,  availabilityDate: date})} />
                </div>
                <img src={blackCalendar} alt="calendar" />
              </div>
            </div>
            <div className={styles.inputGray}>
              <div className={styles.leftWrapper}>
                <CheckboxAds />
                <span>Never</span>
              </div>
            </div>
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
              USD1,000
            </Typography>
          </div>
          {/* <div className={styles.ctnHorizontalRow} /> */}
          <div className={styles.ctnDesc}>
            <Typography variant="subtitle1" fontSize={20} marginBottom={1} paragraph>
            That's great!
            </Typography>
            <Typography variant="subtitle1" fontSize={20} marginBottom={1} paragraph>
            <b>100,000 users</b> will receive your airdrop
            </Typography>
          </div>
        </div>
      </div>
    )
  }

  function renderCardAudience(){
    return (
      <div className={styles.ctnAudience}>
        <div className={styles.ctnTitle}>
          <div className={styles.rowTitle} />
          <Typography variant="h5" marginTop={2} marginX={2} paragraph>
            Define your audiences
          </Typography>
          <div className={styles.rowTitle} />
        </div>
        <div className={styles.cardAudience}>
          <div className={styles.headerAudience}>
            <Typography variant="h5" textAlign={'center'} color={'#fff'}>
              Audience 1:
            </Typography>
          </div>
          <div className={styles.ctnDescAudience}>
            <Typography variant="span" textAlign={'center'} paragraph>
            The audience consists of a broad mix of users, optimized by our algorithm.
            </Typography>
            <div className={styles.ctnPrice}>
              <Typography variant="h5" textAlign={'center'} >
                USD500
              </Typography>
            </div>
            <Typography variant="span" textAlign={'center'} paragraph>
              USD1 per airdrop
            </Typography>
            <div className={styles.ctnAmount}>
            <Typography variant="h6" color={'#7589FA'} textAlign={'center'}>
              8,333 users
            </Typography>
            <Typography variant="span" textAlign={'center'} paragraph>
              In this audience will receive airdrops
            </Typography>
            </div>
          </div>
          
        </div>
      </div>
    )
  }

  function renderDefineAudience(){
    return (
      <div className={styles.ctnDefineAudience}>
        {renderTargeting()}
        {renderCardAudience()}
        {renderBudget()}
        {/* {} */}
      </div>
    )
  }

  function renderLeftAdCreation(){
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
          <BannerPicker label={"Add media"} />
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
            <input placeholder='Add your collection page name here' type="text" id="campaign" name="campaign" />
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
          <BannerPicker label={"Add logo"} />
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
          <BannerPicker label={"Add logo"} />
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
            <textarea placeholder='Add your collection page text here'  id="campaign" name="campaign" />
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
          <CollectionPreview />
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

  function renderCardAdCreation(){
    return (
      <div className={styles.inputCollectionCard}>
        <div className={styles.ctnInputCollectionPageWrapper}>
          {renderLeftAdCreation()}
          {renderRightAdCreation()}
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
          <Grid container spacing={4}>
              <Grid item md={3} xs={2} className={styles.ctnSectionAd}>
                <div className={styles.ctnAudienceItem}>
                  <CheckboxAds />
                  <Typography variant="subtitle1" color="#808080">
                    Audience 1
                  </Typography>
                </div>
              </Grid>
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
        {renderCardAdCreation()}
      </div>

    )
  }

  function renderCreateAnotherAd(){
    return (
      <div className={styles.btnCreateAd}>
        <img src={addIcon} alt="addIcon" />
        <Typography variant='h6' color={'#B3B3B3'} fontWeight='bold'>Create another ad</Typography>
      </div>
    )
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
    <div className={styles.ctnRoot}>
      {renderCampaignName()}
      {renderAvailability()}
      {renderDefineAudience()}
      {renderCollectionPage()}
      {renderSetupAirdrop()}
    </div>
  );
}
