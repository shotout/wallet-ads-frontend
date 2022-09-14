import { Typography } from '@mui/material'
import { BACKEND_URL } from '../../helpers/constants'
import { getUserData, handleLogout } from '../../helpers/auth'
import SvgIconStyle from '../SvgIconStyle'
import useStyles from './styles'

const appIcon = '/assets/wallet_ads_logo.png'
const avatarDummy = '/assets/avatar_dummy.png'
const logoutIcon = '/assets/svg/logout.svg'

export default function HeaderUser({ label, ctnBtnStyle = '' }){
    const styles = useStyles()
    const userData = getUserData()
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
              <img src={userData.data && userData.data.photo ? `${BACKEND_URL}/${userData.data.photo}` : avatarDummy} alt="avatar" id="avatar" />
            </div>
          </div>
        </div>
    )
}