import { Typography } from '@mui/material';
import { BACKEND_URL } from '../../helpers/constants';
import { getUserData, handleLogout } from '../../helpers/auth';
import SvgIconStyle from '../SvgIconStyle';
import useStyles from './styles';

const appIcon = '/assets/svg/wallet_logo.svg';
const avatarDummy = '/assets/avatar_dummy.png';
const logoutIcon = '/assets/svg/logout.svg';
const paymentGroup = '/assets/groupcard.svg';
const walletsAdsPayment = '/assets/walletadspayment.svg';

export default function HeaderUser({ label, ctnBtnStyle = '' }) {
  const styles = useStyles();
  const userData = getUserData();
  return (
    <div className={styles.ctnHeaderWrapper}>
      <img id="app-icon" src={appIcon} alt="app-icons" />
      <div className={styles.ctnPaymentWrapper}>
        <img id="app-icon" src={paymentGroup} alt="app-icons" />
        <img id="app-icon" src={walletsAdsPayment} alt="app-icons" style={{ marginLeft: 20 }} />
      </div>

      <div className={styles.rightHeader}>
        <div className={styles.ctnLogout} onClick={handleLogout}>
          <Typography variant="span" fontWeight={'bold'} fontSize={14}>
            Logout
          </Typography>
          <div>
            <SvgIconStyle src={logoutIcon} sx={{ width: 1, height: 1, color: '#000' }} />
          </div>
        </div>
        {/* <div className={styles.ctnIconHeader}>
              <img src={blackAskIcon} alt="ask" id="ask" />
            </div>
            <div className={styles.ctnIconHeader}>
              <img src={notificationIcon} alt="notification" id="notification" />
            </div> */}
        <div className={styles.ctnIconHeader}>
          <img
            src={userData.data && userData.data.photo ? `${BACKEND_URL}${userData.data.photo.url}` : avatarDummy}
            alt="avatar"
            id="avatar"
          />
        </div>
      </div>
    </div>
  );
}
