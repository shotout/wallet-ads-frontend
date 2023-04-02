import { Grid, Popover, Typography, FormGroup, TextField, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { handleSubmitPromo, payCyrptoCurrency, updatePaymentCC, savePaymentCC } from '../../utils/requests';
import DefaultButton from '../default-button';
import Iconify from '../Iconify';
import useStyles from './styles';
import responseValidatorObj from './../../helpers/responseValidatorObj';
import { trackGoal } from '../../utils/tracker';
import LoadingPage from '../../components/loading-page';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../../components/checkout-form';
import { normalizeCurrency } from '../../helpers/currency';
import { paramCase } from 'change-case';

const stripePromise = loadStripe(process.env.STRIPE_KEY);
const options = { clientSecret: 'pi_3MTp2YIIpTIg11XJ1OxafLsF_secret_i6tJ48R9jFANmkT3WagK3O42E' };

const ccImage = '/assets/credit_card.png';

const defaultErr = {
  promoCodeErr: null,
  errorValidation: null,
};

const cardVisa = '/assets/visa.png';
const cardMC = '/assets/mastercard.png';
const cardAE = '/assets/americanexpress.png';
const cardUP = '/assets/unionpay.png';
const cardCVC = '/assets/cvc.jpg';
const editIcon = '/assets/edit_icon.png';

const imageObj = {
  visa: cardVisa,
  mastercard: cardMC,
  amex: cardAE,
  unionpay: cardUP,
};

const strObj = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  amex: 'American Express',
  unionpay: 'Union Pay',
};

export default function AddPaymentMethod({
  dataCheckUser,
  dataPaymentDetails,
  dataPaymentMethod,
  dataCost,
  dataPayment,
  dataForm,
  isVisible = null,
  handleHoverClose,
  callbackSuccess,
  directStripe,
  onClose,
  showCreditCard,
  createCampaignID,
  totalBudget,
  isPaymentLoading,
  resetClientSecret,
  params,
}) {
  const styles = useStyles();
  const [condLay1, setCondLay1] = useState(true);
  const [condLay2, setCondLay2] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(null);
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
    setCondLay2(true);
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

  const setConLay2Action = async (stype) => {
    setCondLay2(false);
    const form = new FormData();
    form.append('payment_data', 1);
    form.append('_method', 'PATCH');
    await updatePaymentCC(form);
    // if (dataPaymentMethod != 1 || dataPaymentMethod != 2) {
    //   await savePaymentCC(form);
    // }
  };

  const handlePaymentChoose = async (type) => {
    setLoadingBtn(type);
    if (errorMsg.errorValidation || errorMsg.promoCodeErr) {
      handleSubmit();
    } else {
      if (type === 'crypto') {
        setLoading(true);
        handleChooseCrypto();
      } else {
        setLoading(true);
        directStripe(values.promoCode);

        const form = new FormData();
        form.append('payment_data', 1);
        if (dataPaymentMethod != 1 || dataPaymentMethod != 2) {
          await savePaymentCC(form);
        } else {
          form.append('_method', 'PATCH');
          await updatePaymentCC(form);
        }
      }
    }
  };

  const handleChooseCrypto = async () => {
    const campaign = await createCampaignID();
    payCyrptoCurrency({
      promo: values.promoCode,
      campaign_id: values.campaignId ?? campaign.data.id,
    });

    const form = new FormData();
    form.append('payment_data', 2);
    form.append('_method', 'PATCH');
    await updatePaymentCC(form);

    trackGoal({ id: 4, amount: totalBudget });
    if (typeof callbackSuccess === 'function') callbackSuccess('cryptocurrency');
    handleHoverClose();
    localStorage.removeItem('dataAfterSave');
    sessionStorage.removeItem('dataAfterSave');
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

  const resetClientSecretThis = async () => {
    await resetClientSecret();
    setCondLay2(false);
  };

  const renderFormPromoCode = () => (
    <>
      <div className={styles.ctnGroup}>
        <div style={{ marginTop: 50, width: '100%' }}>
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
        </div>
        {/* <input className={styles.ctnInput} /> */}
        <DefaultButton
          isLoading={values.isLoading}
          ctnBtnStyle={styles.ctnApply}
          onClick={handleSubmit}
          label={'Apply'}
        />
        <Typography variant="body1" color="#000" textAlign={'center'} marginTop={6}>
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
        {/* <div className={styles.ctnWrapper} style={{ '&::WebkitScrollbar': { display: 'none' } }}>
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
              <Iconify
                icon={'ant-design:close-outlined'}
                onClick={resetState}
                width={28}
                height={28}
                className={styles.ctnClose}
              />
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
                  isLoading={isPaymentLoading || loadingBtn == 'cc'}
                  disabled={isPaymentLoading || loading || loadingBtn == 'crypto'}
                />
              </Grid>
              <Grid item sm={6} md={6} xs={12}>
                <DefaultButton
                  ctnBtnStyle={`${styles.btnStyle} ${styles.btnBlack}`}
                  onClick={() => handlePaymentChoose('crypto')}
                  label={'I would like to pay using cryptocurrencies'}
                  eventName={'Pay with crypto'}
                  isLoading={loading || loadingBtn == 'crypto'}
                  disabled={loading || isPaymentLoading || loadingBtn == 'cc'}
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
        </div> */}
        <div>
          {condLay1 && condLay2 ? (
            <div className={styles.ctnWrapper} style={{ '&::WebkitScrollbar': { display: 'none' } }}>
              <div className="content">
                <div className={styles.header}>
                  <div style={{ width: '99%' }}>
                    <Typography
                      variant="h5"
                      sx={{ color: '#000' }}
                      marginLeft={4}
                      fontWeight="800"
                      textAlign="center"
                      width={'100%'}
                    >
                      Confirm payment
                    </Typography>
                  </div>

                  <Iconify
                    icon={'ant-design:close-outlined'}
                    onClick={resetState}
                    width={20}
                    height={20}
                    className={styles.ctnClose}
                  />
                </div>
                <Grid container spacing={1} className={styles.gridAvailability}>
                  <Grid item sm={6} md={6} xs={12}>
                    <Typography variant="h4" sx={{ color: '#000' }} fontWeight="700" width={'100%'}>
                      Summary
                    </Typography>
                    <Typography variant="h5" sx={{ color: '#000' }} fontWeight="400" width={'100%'}>
                      {dataForm.campaign_name}
                    </Typography>
                  </Grid>
                  <Grid item sm={6} md={6} xs={12}>
                    <Typography
                      variant="h3"
                      sx={{ color: '#000' }}
                      marginRight={10}
                      fontWeight="700"
                      textAlign="right"
                      width={'100%'}
                    >
                      {`$ ${normalizeCurrency(normalizeCurrency(dataCost))}.00`}
                    </Typography>
                  </Grid>
                  <Grid item sm={12} md={12} xs={12} marginBottom={2}>
                    <div style={{ borderTop: '1px solid #C9D3D8' }} />
                  </Grid>
                  <Grid item sm={12} md={12} xs={12} marginY={-2} marginBottom={0}>
                    <Typography variant="h7" sx={{ color: '#000' }} fontWeight="300" width={'100%'}>
                      Please Choose your preferred payment method for this campaign.
                    </Typography>
                  </Grid>
                  {dataPaymentMethod == 2 ? (
                    <Grid item container spacing={4} sm={12} md={12} xs={12}>
                      <Grid item sm={6} md={6} xs={12}>
                        <DefaultButton
                          ctnBtnStyle={`${styles.btnStyle} ${styles.btnBlack}`}
                          onClick={() => handlePaymentChoose('crypto')}
                          label={'I would like to pay using cryptocurrencies'}
                          eventName={'Pay with crypto'}
                          isLoading={loading || loadingBtn == 'crypto'}
                          disabled={loading || isPaymentLoading || loadingBtn == 'cc'}
                        />
                      </Grid>
                      <Grid item sm={6} md={6} xs={12}>
                        <DefaultButton
                          onClick={() => setCondLay2(false)}
                          ctnBtnStyle={styles.btnStyle}
                          label={'Add credit card'}
                          eventName={'Pay with stripe'}
                          isLoading={isPaymentLoading || loadingBtn == 'cc'}
                          disabled={isPaymentLoading || loading || loadingBtn == 'crypto'}
                        />
                      </Grid>
                    </Grid>
                  ) : dataPaymentMethod == 1 ? (
                    <Grid item container spacing={4} sm={12} md={12} xs={12}>
                      <Grid item sm={6} md={6} xs={12}>
                        <DefaultButton
                          id="paycc"
                          onClick={() => handlePaymentChoose('cc')}
                          ctnBtnStyle={styles.btnStyle}
                          label={'Pay With Credit Card'}
                          eventName={'Pay with stripe'}
                          isLoading={isPaymentLoading || loadingBtn == 'cc'}
                          disabled={isPaymentLoading || loading || loadingBtn == 'crypto'}
                        />
                      </Grid>
                      <Grid item sm={6} md={6} xs={12}>
                        <DefaultButton
                          ctnBtnStyle={`${styles.btnStyle} ${styles.btnBlack}`}
                          onClick={() => handlePaymentChoose('crypto')}
                          label={'I would like to pay using cryptocurrencies'}
                          eventName={'Pay with crypto'}
                          isLoading={loading || loadingBtn == 'crypto'}
                          disabled={loading || isPaymentLoading || loadingBtn == 'cc'}
                        />
                      </Grid>
                      <Grid container marginLeft={4}>
                        <Grid
                          item
                          sm={2}
                          md={1}
                          xs={12}
                          display={'flex'}
                          justifyContent={'flex-start'}
                          alignItems={'center'}
                        >
                          <img
                            src={imageObj[dataPaymentDetails?.card_type] ?? cardCVC}
                            alt="MasterCard"
                            style={{ width: 200 }}
                          />
                        </Grid>
                        <Grid item md={4} sm={12} display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
                          <Typography fontWeight="900" variant="h6" marginTop={1} marginLeft={2}>
                            {strObj[dataPaymentDetails?.card_type]} <span>&bull;</span> {dataPaymentDetails?.card_last4}
                          </Typography>
                        </Grid>
                        <Grid item md={2} sm={4} display={'flex'} flexDirection={'row'}>
                          <div onClick={() => resetClientSecretThis()} className={styles.ctnOption}>
                            <img src={editIcon} alt="edit" style={{ width: 30, marginTop: 12 }} />
                          </div>
                        </Grid>
                      </Grid>
                      <Grid container md={9} sm={12}>
                        <Grid item sm={10} md={10} xs={12} display={'flex'} marginLeft={8}>
                          <Typography
                            marginLeft={3}
                            fontWeight="500"
                            variant="h6"
                            fontFamily={'Public Sans,sans-serif'}
                            color={'grey'}
                          >
                            Expires on {dataPaymentDetails?.card_exp_month} / {dataPaymentDetails?.card_exp_year}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid item container spacing={4} sm={12} md={12} xs={12}>
                      <Grid item sm={6} md={6} xs={12}>
                        <DefaultButton
                          onClick={() => setConLay2Action()}
                          ctnBtnStyle={styles.btnStyle}
                          label={'Add credit card'}
                          eventName={'Pay with stripe'}
                          isLoading={isPaymentLoading || loadingBtn == 'cc'}
                          disabled={isPaymentLoading || loading || loadingBtn == 'crypto'}
                        />
                      </Grid>
                      <Grid item sm={6} md={6} xs={12}>
                        <DefaultButton
                          ctnBtnStyle={`${styles.btnStyle} ${styles.btnBlack}`}
                          onClick={() => handlePaymentChoose('crypto')}
                          label={'I would like to pay using cryptocurrencies'}
                          eventName={'Pay with crypto'}
                          isLoading={loading || loadingBtn == 'crypto'}
                          disabled={loading || isPaymentLoading || loadingBtn == 'cc'}
                        />
                      </Grid>
                    </Grid>
                  )}
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
                      <span className={styles.ctnBold}>
                        {`Promo code ${values.promoCode} was successfully applied!`}
                      </span>
                    </Typography>
                    <Typography variant="subtitle1" color="#fff" textAlign={'center'}>
                      Your discount of <span className={styles.ctnBold}>USD500</span> will be shown on the invoice.
                    </Typography>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className={styles.ctnWrapper} style={{ '&::WebkitScrollbar': { display: 'none' } }}>
              <div className="content">
                <div className={styles.header}>
                  <div style={{ width: '99%' }}>
                    <Typography
                      variant="h5"
                      sx={{ color: '#000' }}
                      marginLeft={4}
                      fontWeight="800"
                      textAlign="center"
                      width={'100%'}
                    >
                      Confirm payment
                    </Typography>
                  </div>

                  <Iconify
                    icon={'ant-design:close-outlined'}
                    onClick={resetState}
                    width={20}
                    height={20}
                    className={styles.ctnClose}
                  />
                </div>
                <Grid container spacing={0} className={styles.gridAvailability}>
                  <Grid item sm={6} md={6} xs={12}>
                    <Typography variant="h5" sx={{ color: '#000' }} fontWeight="700" width={'100%'}>
                      Summary
                    </Typography>
                    <Typography variant="h5" sx={{ color: '#000' }} fontWeight="400" width={'100%'}>
                      {dataForm.campaign_name}
                    </Typography>
                  </Grid>
                  <Grid item sm={6} md={6} xs={12}>
                    <Typography
                      variant="h3"
                      sx={{ color: '#000' }}
                      marginRight={10}
                      fontWeight="700"
                      textAlign="right"
                      width={'100%'}
                    >
                      {`$ ${normalizeCurrency(normalizeCurrency(dataCost))}.00`}
                    </Typography>
                  </Grid>
                  <Grid item sm={12} md={12} xs={12} marginTop={1}>
                    <div style={{ borderTop: '1px solid #C9D3D8' }} />
                  </Grid>
                  <Grid item sm={12} md={12} xs={12} marginBottom={1} marginTop={1}>
                    <Typography
                      variant="h5"
                      sx={{ color: '#000' }}
                      marginRight={10}
                      fontWeight="700"
                      textAlign="center"
                      width={'100%'}
                    >
                      Add a Card
                    </Typography>
                  </Grid>
                  <Grid item sm={12} md={11.8} xs={12} marginLeft={1.8} marginRight={1.8}>
                    <Elements stripe={stripePromise} options={{ clientSecret: dataPayment }}>
                      <CheckoutForm
                        addCard={true}
                        payStripe={directStripe}
                        checkUser={dataCheckUser}
                        createCampaign={createCampaignID}
                      />
                    </Elements>
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
                      <span className={styles.ctnBold}>
                        {`Promo code ${values.promoCode} was successfully applied!`}
                      </span>
                    </Typography>
                    <Typography variant="subtitle1" color="#fff" textAlign={'center'}>
                      Your discount of <span className={styles.ctnBold}>USD500</span> will be shown on the invoice.
                    </Typography>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        <LoadingPage show={isPaymentLoading || loading} />
      </Box>
    </Popover>
  );
}
