import { Grid, Popover, Typography, FormGroup, TextField } from '@mui/material';
import { useState } from 'react';
import { handleSubmitPromo, payCyrptoCurrency } from '../../utils/requests';
import DefaultButton from '../default-button';
import Iconify from '../Iconify';
import useStyles from './styles';
import responseValidatorObj from './../../helpers/responseValidatorObj';

const ccImage = '/assets/credit_card.png';

const defaultErr = {
  promoCodeErr: null,
  errorValidation: null,
};

export default function AddPaymentMethod({
  isVisible = null,
  handleHoverClose,
  callbackSuccess,
  directStripe,
  onClose,
  showCreditCard,
}) {
  const styles = useStyles();
  const [loading, setLoading] = useState(false);
  const [isPromoAvail, setIsPromoAvail] = useState(false);
  const [errorMsg, setErrorMsg] = useState(defaultErr);
  const [values, setValues] = useState({
    promoCode: '',
    isApplied: false,
    isLoading: false,
    promoVal: '',
    isSubmit: false,
  });

  const resetState = () => {
    setValues({
      promoCode: '',
      isApplied: false,
      isLoading: false,
      promoVal: '',
      isSubmit: false,
    });
    setErrorMsg({
      promoCodeErr: null,
      errorValidation: null,
    });
    onClose();
    handleHoverClose();
  };

  const cancelPromo = () => {
    setIsPromoAvail(!isPromoAvail);
    setErrorMsg({
      promoCodeErr: null,
      errorValidation: null,
    });
  };

  const handlePaymentChoose = async (type) => {
    if (errorMsg.errorValidation || errorMsg.promoCodeErr) {
      handleSubmit();
    } else {
      if (type === 'crypto') {
        handleChooseCrypto();
      } else {
        directStripe(values.promoCode);
      }
    }
    // }
  };

  const handleChooseCrypto = async () => {
    handleHoverClose();
    setLoading(true);
    payCyrptoCurrency({
      promo: values.promoCode,
      campaign_id: showCreditCard.campaignId,
    });
    if (typeof callbackSuccess === 'function') callbackSuccess('cryptocurrency');
    setLoading(false);
  };

  const handleSubmit = async () => {
    try {
      setErrorMsg({
        promoCodeErr: null,
        errorValidation: null,
      });
      setValues({ ...values, isLoading: true, isSubmit: true });
      const body = {
        code: values.promoCode,
        campaign_id: showCreditCard.campaignId,
      };
      const res = await handleSubmitPromo(body);
      setErrorMsg({
        promoCodeErr: null,
        errorValidation: null,
      });
      setValues({ ...values, isLoading: false, isPromoAvail: false, isApplied: true });
    } catch (err) {
      if (err.data) {
        if (err.data.errors) {
          console.log('err', err);
          setErrorMsg({
            promoCodeErr: err.data.errors.code,
            errorValidation: null,
          });
        }
        if (err.data.message && !err.data.errors) {
          setErrorMsg({
            promoCodeErr: null,
            errorValidation: err.data.message,
          });
        }
      }
      setValues({ ...values, isLoading: false, isSubmit: true });
    }
  };

  function renderRedBox() {
    if (errorMsg.errorValidation) {
      return (
        <div className={styles.ctnErrText}>
          <Typography variant="body1" color="#E83155">
            {errorMsg.errorValidation}
          </Typography>
        </div>
      );
    }
    return null;
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const renderFormPromoCode = () => (
    <>
      <div className={styles.ctnGroup}>
        <TextField
          fullWidth
          className={styles.ctnInput}
          size="small"
          placeholder="Enter promo code"
          variant="outlined"
          onChange={handleChange('promoCode')}
          value={values.promoCode}
          error={errorMsg.promoCodeErr}
          helperText={errorMsg.promoCodeErr}
        />
        {/* <input className={styles.ctnInput} /> */}
        <DefaultButton
          isLoading={values.isLoading}
          ctnBtnStyle={styles.ctnApply}
          onClick={handleSubmit}
          label={'Apply'}
        />
        <Typography variant="body1" color="#000" textAlign={'center'}>
          <span onClick={cancelPromo} className={styles.ctnCancel}>
            Cancel
          </span>
        </Typography>
      </div>
      <div className={styles.ctnErrTextWrapper}>{renderRedBox()}</div>
    </>
  );

  return (
    <Popover
      id={'success-campaign'}
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
      onClose={resetState}
      className={styles.ctnPopover}
    >
      <div className={styles.ctnWrapper}>
        <div className="content">
          <Typography variant="h4" sx={{ color: '#000' }} marginBottom={4} fontWeight="800" textAlign="center">
            Add payment method
          </Typography>
          <Grid container spacing={4} className={styles.gridAvailability}>
            <Grid item md={4} xs={12}>
              <img src={ccImage} className={styles.ccStyle} alt="Credit" />
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
              justifyContent="center"
              alignItems="center"
              flexDirection={'column'}
              display="flex"
            >
              <Typography variant="body1">
                Please add your payment details to set up and schedule campaigns on wallet ads. You can select paying
                with cryptocurrencies by clicking "I would like to pay using cryptocurrencies" below.
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <DefaultButton
                onClick={() => handlePaymentChoose('cc')}
                ctnBtnStyle={styles.btnStyle}
                label={'Add credit card'}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <DefaultButton
                isLoading={loading}
                ctnBtnStyle={`${styles.btnStyle} ${styles.btnBlack}`}
                onClick={() => handlePaymentChoose('crypto')}
                label={'I would like to pay using cryptocurrencies'}
              />
            </Grid>
          </Grid>
          <div className={styles.ctnClose} onClick={resetState}>
            <Iconify icon={'ant-design:close-outlined'} width={28} height={28} />
          </div>
        </div>
        <div
          className={`${styles.ctnPromo} ${isPromoAvail && styles.ctnBackgroundBlue} ${
            values.isApplied && styles.ctnBackgroundSuccess
          }`}
        >
          {!values.isApplied ? (
            isPromoAvail ? (
              renderFormPromoCode()
            ) : (
              <Typography variant="body1" color="#000" textAlign={'center'} className={styles.ctnPromoText}>
                Do you have a promo code?{' '}
                <span onClick={() => setIsPromoAvail(!isPromoAvail)} className={styles.ctnLink}>
                  Click here.
                </span>
              </Typography>
            )
          ) : (
            <>
              <Typography variant="subtitle1" color="#fff" textAlign={'center'}>
                <span className={styles.ctnBold}> {`Promo code ${values.promoCode} was successfully applied!`}</span>
              </Typography>
              <Typography variant="subtitle1" color="#fff" textAlign={'center'}>
                Your discount of <span className={styles.ctnBold}>USD500</span> will be shown on the invoice.
              </Typography>
            </>
          )}
        </div>
      </div>
    </Popover>
  );
}
