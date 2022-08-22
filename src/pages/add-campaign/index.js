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
          <Typography variant="subtitle1" paragraph>
            Campaign Name
          </Typography>
          <div className={styles.ctnGray}>
            <input placeholder='New campaign' type="text" id="campaign" name="campaign" />
          </div>
        </div>
        <div className={styles.ctnRightInput}>
          <Typography variant="subtitle1" paragraph>
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
          <Typography variant="subtitle1" paragraph sx={{ marginBottom: 0 }}>
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
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.ctnRoot}>
      {renderCampaignName()}
      {renderAvailability()}
      {/* {} */}
    </div>
  );
}
