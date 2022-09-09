import { Typography } from '@mui/material'
import { handleLogout } from '../../helpers/auth'
import SvgIconStyle from '../SvgIconStyle'
import useStyles from './styles'

const appIcon = '/assets/wallet_ads_logo.png'
const notificationIcon = '/assets/notification_icon.png'
const blackAskIcon = '/assets/blackask_icon.png'
const logoutIcon = '/assets/svg/logout.svg'

export default function HeaderUser({ label, ctnBtnStyle = '' }){
    const styles = useStyles()
    return (
        <div className={styles.ctnHeaderWrapper}>
          <img src={appIcon} alt="app-icon" />
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
              {/* <img src={'https://images.tokopedia.net/img/cache/200-square/product-1/2019/3/18/1993669/1993669_8198edc5-ab9b-4ee8-ba29-83c2fdc439a1.jpg'} alt="avatar" id="avatar" /> */}
            </div>
          </div>
        </div>
    )
}