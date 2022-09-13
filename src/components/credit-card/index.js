import { Grid, Popover, TextField, Typography } from '@mui/material'
import DefaultButton from '../default-button'
import Iconify from '../Iconify'
import useStyles from './styles'
// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';
// import CheckoutForm from '../checkout-form';
import { useState } from 'react';
import { formatCreditCardNumber, formatCVC, formatExpirationDate } from '../../helpers/creditCardUtil';
import { handlePayment } from '../../utils/requests';

const ccImage = '/assets/credit_card.png'


// const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

export default function CreditCard({ totalBudget, isVisible = null, handleHoverClose, callbackSuccess }){
    const styles = useStyles()
    const [cardValue, setCard] = useState({
        card_number: '',
        expiry: '',
        cvc: '',
        description: ''
    })
    const [isLoading, setLoading] = useState(false)
    const [errorForm, setErrorForm] = useState({
        card_number: false,
        expiry: false,
        cvc: false,
        errorMessage: null
    })

    const handleSubmit = async() => {
        try{
            const expMonth = cardValue.expiry.split('/')[0]
            const expYear = cardValue.expiry.split('/')[1]
            if(expYear && expMonth){
                setLoading(true)
                setErrorForm({
                    card_number: false,
                    expiry: false,
                    cvc: false,
                    errorMessage: null
                })
                const payload = {
                    card_number: cardValue.card_number,
                    exp_month: expMonth,
                    exp_year: `20${expYear}`,
                    cvc: cardValue.cvc,
                    amount: (totalBudget || 0) * 100,
                    Description: '',
                }
                await handlePayment(payload)
                setLoading(false)
                handleHoverClose()
                if(typeof callbackSuccess === 'function') callbackSuccess('credit-card')
            }else{
                setErrorForm({
                    card_number: !cardValue.card_number,
                    expiry: !cardValue.expiry || expYear || expMonth,
                    cvc: !cardValue.cvc,
                    amount: !cardValue.amount,
                })
            }
        }catch(err){
            console.log("Err submut:", err)
            if(err.data.message){
                setErrorForm({
                    ...errorForm,
                    errorMessage: err.data.message
                })
            }
            setLoading(false)
        }
    }

    const handleChange = (prop) => ({ target }) => {
        if (prop === "credit_card") {
          target.value = formatCreditCardNumber(target.value);
        } else if (prop === "expiry") {
          target.value = formatExpirationDate(target.value);
        } else if (prop === "cvc") {
          target.value = formatCVC(target.value);
        } else if (prop === "amount") {
          target.value = target.value.replace(/[^\d.]/gi, "")
        }
        setCard({ ...cardValue, [prop]: target.value });
    };

    function renderRedBox(){
        if(errorForm.errorMessage){
            return (
                <div className={styles.ctnRedBox}>
                    <Typography variant="body1" color="#fff" textAlign={"center"}>
                        {errorForm.errorMessage}
                    </Typography>
                </div>
            )
        }
        return null
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
            <Grid container spacing={4} className={styles.gridAvailability}>
                <Grid item md={6} xs={12} justifyContent="center" alignItems="center" flexDirection={"column"} display="flex" className={styles.ctnCreditCardLeft}>
                    <div className={styles.ctnDescWrapper}>
                        <img src={ccImage} className={styles.ccStyle} alt="Credit" />
                        <Typography variant="body2" fontWeight={"600"} marginTop={2} color="#fff">
                            Please add your payment details to set up and schedule campaigns on wallet ads. You can select paying with cryptocurrencies by clicking "I would like to pay using cryptocurrencies" on the right side.
                        </Typography>
                    </div>
                </Grid>
                <Grid item md={6} xs={12} justifyContent="center" flexDirection={"column"} display="flex" paddingRight={"32px"}>
                    <Typography variant="h6" fontWeight={"600"} marginTop={2} color="#000">
                        Add payment method    
                    </Typography>
                    {renderRedBox()}
                    <div className={styles.inputWrapper}>
                        <TextField
                            value={cardValue.card_number}
                            onChange={handleChange('card_number')}
                            fullWidth
                            size='small'
                            error={errorForm.card_number}
                            placeholder="Card Number" />
                    </div>
                    <Grid container spacing={4} className={styles.gridAvailability}>
                        <Grid item md={6} xs={12} justifyContent="center" alignItems="center" flexDirection={"column"} display="flex">
                            <div className={styles.inputWrapper}>
                                <TextField
                                    value={cardValue.expiry}
                                    onChange={handleChange('expiry')}
                                    fullWidth
                                    size='small'
                                    error={errorForm.expiry}
                                    placeholder="Valid Thru" />
                            </div>
                        </Grid>
                        <Grid item md={6} xs={12} justifyContent="center" alignItems="center" flexDirection={"column"} display="flex">
                            <div className={styles.inputWrapper}>
                                <TextField
                                    value={cardValue.cvc}
                                    onChange={handleChange('cvc')}
                                    fullWidth
                                    size='small'
                                    error={errorForm.cvc}
                                    placeholder="CVC" />
                            </div>
                        </Grid>
                    </Grid>
                    <div className={styles.btnWrapper}>
                        <DefaultButton label={"Add Credit Card"} onClick={handleSubmit} isLoading={isLoading} />
                        <DefaultButton
                            label={"I would like to pay using cryptocurrencies"}
                            onClick={() => {
                                if(typeof callbackSuccess === 'function') callbackSuccess('cryptocurrency')
                            }} />
                    </div>
                </Grid>
            </Grid>
                <div className={styles.ctnClose} onClick={handleHoverClose}>
                    <Iconify icon={'ant-design:close-outlined'} width={28} height={28} />
                </div>
          </div>
      </Popover>
    )
}