import { Grid, Popover, Typography, FormGroup, TextField, Box } from '@mui/material';
import { useState } from 'react';
import { handleSubmitPromo, payCyrptoCurrency } from '../../utils/requests';
import DefaultButton from '../default-button';
import Iconify from '../Iconify';
import useStyles from './styles';
import responseValidatorObj from './../../helpers/responseValidatorObj';
import { trackGoal } from '../../utils/tracker';
import LoadingPage from '../../components/loading-page';

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
  createCampaignID,
  totalBudget,
  isPaymentLoading,
}) {
  const styles = useStyles();
  const [loading, setLoading] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [isPromoAvail, setIsPromoAvail] = useState(false);
  const [errorMsg, setErrorMsg] = useState(defaultErr);
  const [values, setValues] = useState({
    promoCode: '',
    isApplied: false,
    isLoading: false,
    promoVal: '',
    isSubmit: false,
    campaignId: null,
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
  };

  const handlePaymentChoose = async (type) => {
    setLoadingBtn(true);
    if (errorMsg.errorValidation || errorMsg.promoCodeErr) {
      handleSubmit();
    } else {
      if (type === 'crypto') {
        setLoading(true);
        handleChooseCrypto();
      } else {
        directStripe(values.promoCode);
      }
    }
  };

  const handleChooseCrypto = async () => {
    const campaign = await createCampaignID();
    payCyrptoCurrency({
      promo: values.promoCode,
      campaign_id: values.campaignId ?? campaign.data.id,
    });
    trackGoal({ id: 4, amount: totalBudget });
    if (typeof callbackSuccess === 'function') callbackSuccess('cryptocurrency');
    handleHoverClose();
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
        budget: totalBudget,
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
      // anchorReference={'none'}
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
      style={{ '&::WebkitScrollbar': { display: 'none' } }}
    >
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        overflow={'hidden'}
        className={styles.tr}
        style={{ '&::WebkitScrollbar': { display: 'none' } }}
      >
        <div className={styles.ctnWrapper} style={{ '&::WebkitScrollbar': { display: 'none' } }}>
          <div className="content">
            <div className={styles.header}>
              <div style={{ width: '99%' }}>
                <Typography
                  variant="h4"
                  sx={{ color: '#000' }}
                  marginLeft={4}
                  fontWeight="800"
                  textAlign="center"
                  width={'100%'}
                >
                  Add payment method
                </Typography>
              </div>

              {/* <div className={styles.ctnClose} onClick={resetState}> */}
              <Iconify
                icon={'ant-design:close-outlined'}
                onClick={resetState}
                width={28}
                height={28}
                className={styles.ctnClose}
              />
              {/* </div> */}
            </div>
            <Grid container spacing={4} className={styles.gridAvailability}>
              <Grid item sm={6} md={4} xs={12}>
                <img src={ccImage} className={styles.ccStyle} alt="Credit" />
              </Grid>
              <Grid
                item
                sm={6}
                md={8}
                xs={12}
                justifyContent="center"
                alignItems="center"
                flexDirection={'column'}
                display="flex"
              >
                <Typography variant="body1" align="justify">
                  Please add your payment details to set up and schedule campaigns on WALLETADS. You can select paying
                  with cryptocurrencies by clicking "I would like to pay using cryptocurrencies" below.
                </Typography>
              </Grid>
              <Grid item sm={6} md={6} xs={12}>
                <DefaultButton
                  onClick={() => handlePaymentChoose('cc')}
                  ctnBtnStyle={styles.btnStyle}
                  label={'Add credit card'}
                  eventName={'Pay with stripe'}
                  isLoading={isPaymentLoading || loadingBtn}
                  disabled={isPaymentLoading || loading}
                />
              </Grid>
              <Grid item sm={6} md={6} xs={12}>
                <DefaultButton
                  ctnBtnStyle={`${styles.btnStyle} ${styles.btnBlack}`}
                  onClick={() => handlePaymentChoose('crypto')}
                  label={'I would like to pay using cryptocurrencies'}
                  eventName={'Pay with crypto'}
                  isLoading={loading || loadingBtn}
                  disabled={loading || isPaymentLoading}
                />
              </Grid>
            </Grid>
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
        <LoadingPage show={isPaymentLoading || loading} />
      </Box>
    </Popover>
  );
}
