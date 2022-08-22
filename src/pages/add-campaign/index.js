import { Container, Typography } from '@mui/material';
// layouts
import Layout from '../../layouts';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import useStyles from './styles'

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
const checklistIcon = '/assets/checklist.png'

export default function PageOne() {
  const styles = useStyles()
  const { themeStretch } = useSettings();

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
            <span>DD.MM.YYYY</span>
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
                <img src={checklistIcon} alt="checklist" />
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
                <img src={checklistIcon} alt="checklist" />
                <span>On</span>
              </div>
              <div className={styles.altDateWrapper}>
                <span>DD.MM.YYYY</span>
                <img src={blackCalendar} alt="calendar" />
              </div>
            </div>
            <div className={styles.inputGray}>
              <div className={styles.leftWrapper}>
                <img src={checklistIcon} alt="checklist" />
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

  return (
    <div className={styles.ctnRoot}>
      {renderCampaignName()}
      {renderAvailability()}
      {renderDefineAudience()}
    </div>
  );
}
