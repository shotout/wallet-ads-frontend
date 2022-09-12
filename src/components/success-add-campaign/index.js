import { Popover, Typography } from '@mui/material'
import { routes } from '../../helpers/routes'
import Iconify from '../Iconify'
import useStyles from './styles'

const launchImage = '/assets/launch.png'

export default function SuccessAddCampaign({ isVisible = null, handleHoverClose }){
    const styles = useStyles()

    const handleDirectCampaign = () => {
        window.location.href = routes.createCampaign
    }

    return (
        <Popover
          id={"success-campaign"}
          open={Boolean(isVisible)}
          anchorEl={isVisible}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          onClose={handleHoverClose}
          className={styles.ctnPopover}
      >
          <div className={styles.ctnWrapper}>
            <div className={styles.ctnBackground}>
                <img src={launchImage} alt="launch" />
            </div>
            <div className={styles.ctnContent}>
                <Typography variant="h5" sx={{ color: '#fff' }} fontWeight="800" textAlign="center">
                        Your campaign has successfully been scheduled and is currently in review by our team!
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#fff' }} marginTop={1} textAlign="center">
                    You will receive an email as soon as the campaign is running.
                </Typography>
                <div className={styles.ctnBtnCampaign} onClick={handleDirectCampaign}>
                    <Typography variant="body2" fontWeight={"bold"} sx={{ color: '#fff' }} textAlign="center">
                        Create another campaign
                    </Typography>
                </div>
                <div className={styles.ctnClose} onClick={handleHoverClose}>
                    <Iconify icon={'ant-design:close-outlined'} width={28} height={28} />
                </div>
            </div>
          </div>
      </Popover>
    )
}