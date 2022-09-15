import { Grid, Popover, Typography } from '@mui/material'
import { useState } from 'react'
import { payCyrptoCurrency } from '../../utils/requests'
import DefaultButton from '../default-button'
import Iconify from '../Iconify'
import useStyles from './styles'

const ccImage = '/assets/credit_card.png'

export default function AddPaymentMethod({ isVisible = null, handleHoverClose, callbackSuccess, directStripe }){
    const styles = useStyles()
    const [loading, setLoading] = useState(false)

    const handleChooseCrypto = async() => {
        setLoading(true)
        await payCyrptoCurrency({
            campaign_id: isVisible.campaignId
        })
        if(typeof callbackSuccess === 'function') callbackSuccess('cryptocurrency')
        handleHoverClose()
        setLoading(false)
    }

    return (
        <Popover
          id={"success-campaign"}
          open={Boolean(isVisible)}
          anchorEl={isVisible ? isVisible.sessionId : null}
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
            <Typography variant="h4" sx={{ color: '#000' }} marginBottom={4} fontWeight="800" textAlign="center">
                Add payment method
            </Typography>
            <Grid container spacing={4} className={styles.gridAvailability}>
                <Grid item md={4} xs={12}>
                    <img src={ccImage} className={styles.ccStyle} alt="Credit" />
                </Grid>
                <Grid item md={8} xs={12} justifyContent="center" alignItems="center" flexDirection={"column"} display="flex">
                    <Typography variant="body1">
                        Please add your payment details to set up and schedule campaigns on wallet ads. You can select paying with cryptocurrencies by clicking "I would like to pay using cryptocurrencies" below.
                    </Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                    <DefaultButton onClick={directStripe} ctnBtnStyle={styles.btnStyle} label={"Add credit card"} />
                </Grid>
                <Grid item md={6} xs={12}>
                    <DefaultButton isLoading={loading} ctnBtnStyle={`${styles.btnStyle} ${styles.btnBlack}`} onClick={handleChooseCrypto} label={"I would like to pay using cryptocurrencies"} />
                </Grid>
            </Grid>
                <div className={styles.ctnClose} onClick={handleChooseCrypto}>
                    <Iconify icon={'ant-design:close-outlined'} width={28} height={28} />
                </div>
          </div>
      </Popover>
    )
}