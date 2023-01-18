import { Grid, IconButton, InputAdornment, InputLabel, TextField, Typography, Popover, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import DefaultButton from '../../components/default-button';
import AvatarPicker from '../../components/avatar-picker';
import HeaderUser from '../../components/header-user';
import Page from '../../components/Page';
import useStyles from './styles';
import Layout from '../../layouts';
import Iconify from '../../components/Iconify';
import { getUserData, setAuthorizationCookie } from '../../helpers/auth';
import responseValidatorObj from '../../helpers/responseValidatorObj';
import { handleUpdateProfile } from '../../utils/requests';
import { requestResetPassword } from '../../utils/requests';

const mailSuccess = '/assets/svg/mail_success.svg';
const trashIcon = '/assets/trash.png';
const deleteIcon = '/assets/delete_icon.png';
const editIcon = '/assets/edit_icon.png';
const cardLock = '/assets/lock.png';
const ccImage = '/assets/credit_card.png';
const cardVisa = '/assets/visa.png';
const cardMC = '/assets/mastercard.png';
const cardAE = '/assets/americanexpress.png';
const cardUP = '/assets/unionpay.png';
const cardCVC = '/assets/cvc.jpg';

SettingUser.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

const defaultState = {
  country: '',
  company_name: '',
  tax_id: '',
  first_name: '',
  last_name: '',
  street: '',
  post_code: '',
  city: '',
  phone: '',
  email: '',
  passwordFirst: '',
  password: '',
  password_confirmation: '',
  photo: { url: null },
  newPassword: '',
  cardNumber: '',
  expiration: '',
  cvc: '',
  forgotEmail: '',
};

var conditionER = false;
var conditionDPM = false;
var conditionSCP = false;
var conditionFP = false;
var conditionCP = false;
var conditionPM = false;
var conditionAPM = false;

export default function SettingUser({ userData }) {
  const styles = useStyles();

  const [timer, setTimer] = useState(0);
  const [sent, setSent] = useState(false);
  const [count, setCount] = useState(false);
  const [ERCondition, setERCondition] = useState(false);
  const [DPMCondition, setDPMCondition] = useState(false);
  const [msgAddPayment, setMsgAddPayment] = useState(false);
  const [SCPCondition, setSCPCondition] = useState(false);
  const [FPCondition, setFPCondition] = useState(false);
  const [CPCondition, setCPCondition] = useState(false);
  const [PMCondition, setPMCondition] = useState(false);
  const [APMCondition, setAPMCondition] = useState(false);
  const [avatarSource, setAvatarSource] = useState(null);
  const [values, setValues] = useState(userData.data);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(defaultState);

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => setTimer(timer - 1), 1000);
    } else {
      setCount(false);
    }
  }, [timer]);

  const handleChangePicture = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setAvatarSource(
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRemoveAvatar = () => {
    setAvatarSource(null);
    setValues({
      ...values,
      photo: { url: null },
    });
  };

  const handleSubmitER = async () => {
    try {
      setErrorMessage({
        email: null,
      });
      setValues({ ...values, isLoading: true });
      const body = {
        email: values.email,
      };
      const res = await requestResetPassword(body);
      res.status === 'success' && setSent(true);
      setValues({ ...values, isLoading: false });
      setFPCondition(false);
      setERCondition(true);
    } catch (err) {
      if (err.data) {
        if (err.data.errors) {
          setErrorMessage(responseValidatorObj(err.data.errors));
        }
        if (err.data.message && !err.data.errors) {
          setErrorMessage({
            email: null,
          });
        }
      }
      setValues({ ...values, isLoading: false });
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const form = new FormData();
      form.append('company_name', values.company_name);
      form.append('tax_id', values.tax_id);
      form.append('first_name', values.first_name);
      form.append('last_name', values.last_name);
      form.append('street', values.street);
      form.append('post_code', values.post_code);
      form.append('city', values.city);
      form.append('phone', values.phone);
      form.append('email', values.email);
      form.append('country', values.country);
      {
        values.password && form.append('password', values.password);
      }
      {
        values.password_confirmation && form.append('password_confirmation', values.password_confirmation);
      }
      {
        avatarSource && form.append('photo', avatarSource);
      }
      form.append('_method', 'PATCH');
      const res = await handleUpdateProfile(form);
      setAuthorizationCookie({
        ...userData,
        data: res.data,
      });
      setLoading(false);
    } catch (err) {
      if (err.data) {
        if (err.data.errors) {
          setErrorMessage(responseValidatorObj(err.data.errors));
        }
      }
      setLoading(false);
    }
    setSCPCondition(false);
    setAPMCondition(false);
  };

  function resendEmail() {
    handleSubmitER();
    setCount(true);
    setTimer(45);
  }

  const resetStateDPM = (e) => {
    conditionDPM = !conditionDPM;
    setDPMCondition(conditionDPM);
  };

  const resetStateSCP = (e) => {
    if (e) {
      setCPCondition(false);
      return setSCPCondition(false);
    }
    conditionSCP = !conditionSCP;
    setSCPCondition(conditionSCP);
  };

  const resetStateER = () => {
    conditionER = !conditionER;
    setERCondition(conditionER);
  };

  const resetStateFP = () => {
    conditionFP = !conditionFP;
    setFPCondition(conditionFP);
  };

  const resetStateAPM = async (e) => {
    setTimeout(() => {
      setPMCondition(false);
    }, 200);
    conditionAPM = !conditionAPM;
    setAPMCondition(conditionAPM);

    if (e) setMsgAddPayment(true);
    else setMsgAddPayment(false);
  };

  const resetStatePM = () => {
    conditionPM = !conditionPM;
    setPMCondition(conditionPM);
  };

  const resetStateCP = () => {
    conditionCP = !conditionCP;
    setCPCondition(conditionCP);
    values.password = '';
    values.newPassword = '';
    values.password_confirmation = '';
    errorMessage.password = '';
  };

  function popupDeletePM() {
    return (
      <Popover
        id={'success-campaign'}
        open={DPMCondition}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        onClose={resetStateDPM}
        className={styles.ctnPopover}
        style={{ '&::WebkitScrollbar': { display: 'none' } }}
      >
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          overflow={'hidden'}
          style={{ '&::WebkitScrollbar': { display: 'none' } }}
        >
          <div className={styles.ctnWrapperPopup} style={{ '&::WebkitScrollbar': { display: 'none' } }}>
            <div className="content">
              <div className={styles.header}>
                <div style={{ width: '99%' }}>
                  <Typography
                    variant="h4"
                    sx={{ color: '#000' }}
                    fontWeight="800"
                    marginLeft={4}
                    textAlign="center"
                    width={'100%'}
                  >
                    Confirm delete
                  </Typography>
                </div>

                <Iconify
                  icon={'ant-design:close-outlined'}
                  onClick={resetStateDPM}
                  width={28}
                  height={28}
                  marginLeft={4}
                  className={styles.ctnClose}
                />
              </div>
            </div>
            <Grid container justifyContent="center" alignItems="center">
              <img src={trashIcon} alt="Trash" />
            </Grid>
            <Grid item width={300} md={6} xs={12}>
              <Typography fontWeight="500" textAlign="center" width={'100%'} marginTop={4}>
                Are you want to delete this payment method?
              </Typography>
            </Grid>
            <Grid container>
              <Grid item md={5.6} xs={12} marginRight={2}>
                <DefaultButton
                  eventName={'Yes'}
                  ctnBtnStyle={styles.btnSave}
                  label={'Yes'}
                  isLoading={isLoading}
                  onClick={resetStateDPM}
                />
              </Grid>
              <Grid item md={5.4} xs={12}>
                <DefaultButton
                  eventName={'Cancel'}
                  ctnBtnStyle={styles.btnSave}
                  label={'Cancel'}
                  isLoading={isLoading}
                  onClick={resetStateDPM}
                />
              </Grid>
            </Grid>
          </div>
        </Box>
      </Popover>
    );
  }

  function popupSaveChangePasword() {
    return (
      <Popover
        id={'success-campaign'}
        open={SCPCondition}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        onClose={resetStateSCP}
        className={styles.ctnPopover}
        style={{ '&::WebkitScrollbar': { display: 'none' } }}
      >
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          overflow={'hidden'}
          style={{ '&::WebkitScrollbar': { display: 'none' } }}
        >
          <div className={styles.ctnWrapperPopup} style={{ '&::WebkitScrollbar': { display: 'none' } }}>
            <div className="content">
              <div className={styles.header}>
                <div style={{ width: '99%' }}>
                  <Typography
                    variant="h4"
                    sx={{ color: '#000' }}
                    fontWeight="800"
                    marginLeft={4}
                    textAlign="center"
                    width={'100%'}
                  >
                    Change Password
                  </Typography>
                </div>

                <Iconify
                  icon={'ant-design:close-outlined'}
                  onClick={resetStateSCP}
                  width={28}
                  height={28}
                  marginLeft={4}
                  className={styles.ctnClose}
                />
              </div>
            </div>
            <Grid container justifyContent="center" alignItems="center">
              <img src={cardLock} alt="Lock" />
            </Grid>
            <Grid item width={300} md={6} xs={12} lg={12}>
              <Typography fontWeight="500" textAlign="center" width={'100%'} marginTop={4}>
                Your password has been updated.
              </Typography>
            </Grid>
            <DefaultButton
              eventName={'Close'}
              ctnBtnStyle={styles.btnSave}
              label={'Close'}
              isLoading={isLoading}
              onClick={() => resetStateSCP(true)}
            />
          </div>
        </Box>
      </Popover>
    );
  }

  function popupEmailReset() {
    return (
      <Popover
        id={'success-campaign'}
        open={ERCondition}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        onClose={resetStateER}
        className={styles.ctnPopover}
        style={{ '&::WebkitScrollbar': { display: 'none' } }}
      >
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          overflow={'hidden'}
          style={{ '&::WebkitScrollbar': { display: 'none' } }}
        >
          <div className={styles.ctnInput}>
            <div className={styles.header}>
              <div style={{ width: '99%' }}>
                <Typography
                  variant="h4"
                  sx={{ color: '#000' }}
                  fontWeight="800"
                  marginLeft={4}
                  textAlign="center"
                  width={'100%'}
                >
                  Email has been sent!
                </Typography>
              </div>

              <Iconify
                icon={'ant-design:close-outlined'}
                onClick={resetStateER}
                width={28}
                height={28}
                marginLeft={4}
                className={styles.ctnClose}
              />
            </div>
            <div className={styles.ctnLogo}>
              <img src={mailSuccess} alt="wallet-ads" />
            </div>
            <div className={styles.ctnGreenBox}>
              <Typography variant="body1" color="#fff" textAlign={'center'}>
                We have sent an email with a password recovery link to your email inbox. Please follow the instructions
                in the email to reset your password.
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle1" color="#000" textAlign={'center'}>
                {count ? (
                  <>
                    You did not receive the email? Check your spam folder or wait{' '}
                    <span className={styles.ctnTimer}>
                      {timer} {timer > 1 ? 'seconds' : 'second'}{' '}
                    </span>
                    to resend the recovery email.
                  </>
                ) : (
                  <>
                    You did not receive the email? Check your spam folder or{' '}
                    <span onClick={resendEmail} className={styles.ctnLink}>
                      resend email.
                    </span>
                  </>
                )}
              </Typography>
            </div>
          </div>
        </Box>
      </Popover>
    );
  }

  function popupForgotPasword() {
    return (
      <Popover
        id={'success-campaign'}
        open={FPCondition}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        onClose={resetStateFP}
        className={styles.ctnPopover}
        style={{ '&::WebkitScrollbar': { display: 'none' } }}
      >
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          overflow={'hidden'}
          style={{ '&::WebkitScrollbar': { display: 'none' } }}
        >
          <div className={styles.ctnWrapperPopup} style={{ '&::WebkitScrollbar': { display: 'none' } }}>
            <div className="content">
              <div className={styles.header}>
                <div style={{ width: '99%' }}>
                  <Typography
                    variant="h4"
                    sx={{ color: '#000' }}
                    fontWeight="800"
                    marginLeft={4}
                    textAlign="center"
                    width={'100%'}
                  >
                    Forgot Password?
                  </Typography>
                </div>

                <Iconify
                  icon={'ant-design:close-outlined'}
                  onClick={resetStateFP}
                  width={28}
                  height={28}
                  marginLeft={4}
                  className={styles.ctnClose}
                />
              </div>
            </div>
            <Grid item width={300} md={6} xs={12} lg={12}>
              <Typography fontWeight="800" textAlign="center" width={'100%'} marginBottom={2}>
                Enter your email address and you will receive an email with instructions on how to reset your password.
              </Typography>
            </Grid>
            <TextField
              value={values.forgotEmail}
              onChange={handleChange('forgotEmail')}
              error={errorMessage.forgotEmail}
              helperText={errorMessage.forgotEmail}
              size="small"
              fullWidth
            />
            <DefaultButton
              eventName={'ResetPassword'}
              ctnBtnStyle={styles.btnSave}
              label={'Reset Password'}
              isLoading={values.isLoading}
              onClick={handleSubmitER}
            />
          </div>
        </Box>
      </Popover>
    );
  }

  function popupAddPaymentMethod() {
    return (
      <Popover
        id={'success-campaign'}
        open={APMCondition}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        onClose={resetStateAPM}
        className={styles.ctnPopover}
        style={{ '&::WebkitScrollbar': { display: 'none' } }}
      >
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          overflow={'hidden'}
          style={{ '&::WebkitScrollbar': { display: 'none' } }}
        >
          <div className={styles.ctnWrapperPopup} style={{ '&::WebkitScrollbar': { display: 'none' } }}>
            <div className="content">
              <div className={styles.header}>
                <div style={{ width: '99%' }}>
                  <Typography
                    variant="h4"
                    sx={{ color: '#000' }}
                    fontWeight="800"
                    marginLeft={4}
                    textAlign="center"
                    width={'100%'}
                  >
                    {msgAddPayment ? 'Edit your payment details' : 'Add a payment method'}
                  </Typography>
                </div>

                <Iconify
                  icon={'ant-design:close-outlined'}
                  onClick={resetStateAPM}
                  width={28}
                  height={28}
                  marginLeft={4}
                  className={styles.ctnClose}
                />
              </div>
            </div>
            <Grid container spacing={2}>
              <Grid item md={12} xs={12}>
                <div className={styles.inputWrapper}>
                  {msgAddPayment ? (
                    <Grid
                      container
                      spacing={-36}
                      marginTop={0.5}
                      justifyContent="center"
                      alignItems="center"
                      className={styles.ctnCardSet}
                    >
                      <Grid item sm={4} md={1} xs={12}>
                        <img src={cardMC} alt="MasterCard" />
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid
                      container
                      spacing={-20}
                      justifyContent="center"
                      alignItems="center"
                      className={styles.ctnCardSet}
                    >
                      <Grid item sm={4} md={1} xs={12}>
                        <img src={cardVisa} alt="Visa" />
                      </Grid>
                      <Grid item sm={4} md={1} xs={12}>
                        <img src={cardMC} alt="MasterCard" />
                      </Grid>
                      <Grid item sm={4} md={1} xs={12}>
                        <img src={cardAE} alt="AmericanExpress" />
                      </Grid>
                      <Grid item sm={4} md={1} xs={12}>
                        <img src={cardUP} alt="Unionpay" />
                      </Grid>
                    </Grid>
                  )}

                  <InputLabel shrink>Card Number</InputLabel>
                  <TextField
                    value={values.cardNumber}
                    onChange={handleChange('cardNumber')}
                    error={errorMessage.cardNumber}
                    helperText={errorMessage.cardNumber}
                    size="small"
                    fullWidth
                  />
                </div>
              </Grid>
              <Grid item md={5.4} xs={12}>
                <div className={styles.inputWrapper}>
                  <InputLabel shrink>Expiration</InputLabel>
                  <TextField
                    value={values.expiration}
                    onChange={handleChange('expiration')}
                    error={errorMessage.expiration}
                    helperText={errorMessage.expiration}
                    size="small"
                    fullWidth
                  />
                </div>
              </Grid>
              <Grid item md={5.4} xs={12}>
                <div className={styles.inputWrapper}>
                  <InputLabel shrink>CVC</InputLabel>
                  <TextField
                    value={values.cvc}
                    onChange={handleChange('cvc')}
                    error={errorMessage.cvc}
                    helperText={errorMessage.cvc}
                    size="small"
                    fullWidth
                  />
                </div>
              </Grid>
              <Grid item md={1.2} xs={12}>
                <img src={cardCVC} className={styles.ctnCvc} alt="Visa" />
              </Grid>
              <Grid item md={12} xs={12}>
                <div className={styles.inputWrapper}>
                  <InputLabel shrink>Country</InputLabel>
                  <TextField
                    value={values.country}
                    onChange={handleChange('country')}
                    error={errorMessage.country}
                    helperText={errorMessage.country}
                    size="small"
                    fullWidth
                  />
                </div>
              </Grid>
              <div style={{ width: '99%', marginLeft: 16 }}>
                <Typography variant="body5" sx={{ color: '#000' }} fontWeight="300" width={'100%'}>
                  {msgAddPayment
                    ? 'By providing your card details, you consent to WALLETADS charging your card for future payments in accordance with its terms.'
                    : ''}
                </Typography>
              </div>
            </Grid>
            <Grid container spacing={4} justifyContent="center" alignItems="center">
              <Grid item sm={6} md={6} xs={12}>
                <DefaultButton
                  eventName={'Save'}
                  ctnBtnStyle={styles.btnSave}
                  label={msgAddPayment ? 'Update' : 'Save'}
                  isLoading={isLoading}
                  onClick={handleSubmit}
                />
              </Grid>
            </Grid>
          </div>
        </Box>
      </Popover>
    );
  }

  function popupPaymentMethod() {
    return (
      <Popover
        id={'success-campaign'}
        open={PMCondition}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        onClose={resetStatePM}
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
          <div className={styles.ctnWrapperPopup} style={{ '&::WebkitScrollbar': { display: 'none' } }}>
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
                  onClick={resetStatePM}
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
                    onClick={() => resetStateAPM()}
                    ctnBtnStyle={styles.btnStyle}
                    label={'Add credit card'}
                    eventName={'Pay with stripe'}
                  />
                </Grid>
                <Grid item sm={6} md={6} xs={12}>
                  <DefaultButton
                    ctnBtnStyle={`${styles.btnStyle} ${styles.btnBlack}`}
                    label={'I would like to pay using cryptocurrencies'}
                    eventName={'Pay with crypto'}
                  />
                </Grid>
              </Grid>
            </div>
          </div>
        </Box>
      </Popover>
    );
  }

  function popupChangePassword() {
    return (
      <Popover
        id={'success-campaign'}
        open={CPCondition}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        onClose={resetStateCP}
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
          <div className={styles.ctnWrapperPopup} style={{ '&::WebkitScrollbar': { display: 'none' } }}>
            <div className="content">
              <div className={styles.header}>
                <div style={{ width: '99%' }}>
                  <Typography
                    variant="h4"
                    sx={{ color: '#000' }}
                    fontWeight="800"
                    marginLeft={4}
                    textAlign="center"
                    width={'100%'}
                  >
                    Change Password
                  </Typography>
                </div>

                <Iconify
                  icon={'ant-design:close-outlined'}
                  onClick={resetStateCP}
                  width={28}
                  height={28}
                  marginLeft={4}
                  className={styles.ctnClose}
                />
              </div>
            </div>
            <Grid item md={6} xs={12} lg={12}>
              <div className={styles.inputWrapper}>
                <InputLabel shrink>Current Password</InputLabel>
                <TextField
                  value={values.password}
                  onChange={handleChange('password')}
                  error={errorMessage.password}
                  helperText={errorMessage.password}
                  size="small"
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                />
              </div>
              <div onClick={resetStateFP} className={styles.forgotPassword}>
                <Typography variant="body3" fontWeight="800" marginLeft={30} textAlign="right" width={'100%'}>
                  Forgot password
                </Typography>
              </div>
            </Grid>
            <Grid item md={6} xs={12} lg={12}>
              <div className={styles.inputWrapper}>
                <InputLabel shrink>New Password</InputLabel>
                <TextField
                  value={values.newPassword}
                  onChange={handleChange('newPassword')}
                  error={errorMessage.newPassword}
                  helperText={errorMessage.newPassword}
                  size="small"
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                />
              </div>
            </Grid>
            <Grid item md={6} xs={12} lg={12}>
              <div className={styles.inputWrapper}>
                <InputLabel shrink>Confirm New Password</InputLabel>
                <TextField
                  value={values.password_confirmation}
                  onChange={handleChange('password_confirmation')}
                  error={errorMessage.password_confirmation}
                  helperText={errorMessage.password_confirmation}
                  size="small"
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                />
              </div>
            </Grid>
            <DefaultButton
              eventName={'Save'}
              ctnBtnStyle={styles.btnSave}
              label={'Save'}
              isLoading={isLoading}
              onClick={handleSubmit}
            />
          </div>
        </Box>
      </Popover>
    );
  }

  function renderTitle() {
    return (
      <div className={styles.ctnTitle}>
        <Typography variant="h6">Edit Profile</Typography>
      </div>
    );
  }

  function renderProfilePicture() {
    return (
      <div className={styles.ctnProfilePicture}>
        <AvatarPicker
          initialPhoto={values.photo && values.photo.url}
          onRemove={handleRemoveAvatar}
          avatarSource={
            avatarSource === null
              ? null
              : typeof avatarSource === 'string'
              ? avatarSource
              : avatarSource.preview || null
          }
          onDrop={handleChangePicture}
        />
        <DefaultButton
          eventName={'Edit Profile'}
          ctnBtnStyle={styles.btnSave}
          label={'Save Changes'}
          isLoading={isLoading}
          onClick={handleSubmit}
        />
      </div>
    );
  }

  function renderForm() {
    return (
      <div className={styles.ctnForm}>
        <Grid container spacing={6}>
          <Grid item md={9} sm={12}>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <div className={styles.inputWrapper}>
                  <InputLabel shrink>Company Name</InputLabel>
                  <TextField
                    value={values.company_name}
                    onChange={handleChange('company_name')}
                    error={errorMessage.company_name}
                    helperText={errorMessage.company_name}
                    size="small"
                    fullWidth
                  />
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div className={styles.inputWrapper}>
                  <InputLabel shrink>Tax ID</InputLabel>
                  <TextField
                    value={values.tax_id}
                    onChange={handleChange('tax_id')}
                    error={errorMessage.tax_id}
                    helperText={errorMessage.tax_id}
                    size="small"
                    fullWidth
                  />
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div className={styles.inputWrapper}>
                  <InputLabel shrink>First Name</InputLabel>
                  <TextField
                    value={values.first_name}
                    onChange={handleChange('first_name')}
                    error={errorMessage.first_name}
                    helperText={errorMessage.first_name}
                    size="small"
                    fullWidth
                  />
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div className={styles.inputWrapper}>
                  <InputLabel shrink>Last Name</InputLabel>
                  <TextField
                    value={values.last_name}
                    onChange={handleChange('last_name')}
                    error={errorMessage.last_name}
                    helperText={errorMessage.last_name}
                    size="small"
                    fullWidth
                  />
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div className={styles.inputWrapper}>
                  <InputLabel shrink>Email</InputLabel>
                  <TextField
                    value={values.email}
                    onChange={handleChange('email')}
                    error={errorMessage.email}
                    helperText={errorMessage.email}
                    size="small"
                    fullWidth
                  />
                </div>
              </Grid>

              <Grid item md={6} xs={12}>
                <div className={styles.inputWrapper}>
                  <InputLabel shrink>Telephone</InputLabel>
                  <TextField
                    value={values.phone}
                    onChange={handleChange('phone')}
                    error={errorMessage.phone}
                    helperText={errorMessage.phone}
                    size="small"
                    fullWidth
                  />
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div className={styles.inputWrapper}>
                  <InputLabel shrink>Street address</InputLabel>
                  <TextField
                    value={values.street}
                    onChange={handleChange('street')}
                    error={errorMessage.street}
                    helperText={errorMessage.street}
                    size="small"
                    fullWidth
                  />
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <div className={styles.inputWrapper}>
                      <InputLabel shrink>Post Code</InputLabel>
                      <TextField
                        value={values.post_code}
                        onChange={handleChange('post_code')}
                        error={errorMessage.post_code}
                        helperText={errorMessage.post_code}
                        size="small"
                        fullWidth
                      />
                    </div>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <div className={styles.inputWrapper}>
                      <InputLabel shrink>City</InputLabel>
                      <TextField
                        value={values.city}
                        onChange={handleChange('city')}
                        error={errorMessage.city}
                        helperText={errorMessage.city}
                        size="small"
                        fullWidth
                      />
                    </div>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item md={6} xs={12}>
                <div className={styles.inputWrapper}>
                  <InputLabel shrink>Contry/Region</InputLabel>
                  <TextField
                    value={values.country}
                    onChange={handleChange('country')}
                    error={errorMessage.country}
                    helperText={errorMessage.country}
                    size="small"
                    fullWidth
                  />
                </div>
              </Grid>

              <Grid item md={6} xs={12} />
            </Grid>
          </Grid>
          <Grid item md={3} sm={12}>
            {renderProfilePicture()}
          </Grid>
        </Grid>
        <div className={styles.ctnGridBottom} />
        <Grid container spacing={42}>
          <Grid item md={6} xs={12}>
            <div className={styles.inputWrapper}>
              <InputLabel shrink>Password</InputLabel>
              <TextField
                value={values.passwordFirst}
                onChange={handleChange('passwordFirst')}
                error={errorMessage.passwordFirst}
                helperText={errorMessage.passwordFirst}
                size="small"
                fullWidth
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                        {showPassword ? (
                          <Iconify icon="eva:eye-fill" width={24} height={24} />
                        ) : (
                          <Iconify icon="eva:eye-off-fill" width={24} height={24} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div onClick={resetStateCP} className={styles.changePassword}>
              <Typography variant="body3" textAlign={'left'}>
                Change Password
              </Typography>
            </div>
          </Grid>
        </Grid>
        <div className={styles.ctnGridBottom} />
        <Grid container spacing={2}>
          <Grid item md={9} sm={12}>
            <Typography variant="h6" textAlign={'left'}>
              Payment Method
            </Typography>
            <Grid container justifyContent="left" alignItems="center">
              <Grid onClick={() => resetStateAPM()} item sm={3} md={0.5} xs={12}>
                <img src={cardMC} alt="MasterCard" />
              </Grid>
              <Grid onClick={() => resetStateAPM()} item md={6} sm={12}>
                <Typography fontWeight="900" variant="h6" textAlign={'left'}>
                  MasterCard . {'[LAST 4 CARD DIGITS]'}
                </Typography>
              </Grid>
              <Grid item md={2} sm={4} marginLeft={-10}>
                <div onClick={() => resetStateAPM(true)} className={styles.ctnOption}>
                  <img src={editIcon} alt="edit" />
                </div>
              </Grid>
              <Grid item md={2} sm={4} marginLeft={-14}>
                <div onClick={resetStateDPM} className={styles.ctnOption}>
                  <img src={deleteIcon} alt="delete" />
                </div>
              </Grid>
            </Grid>
            <Grid onClick={() => resetStateAPM()} item md={9} sm={12}>
              <Typography marginLeft={5} fontWeight="900" variant="body4" textAlign={'left'}>
                Expires on {'[MM/YY]'}
              </Typography>
            </Grid>
            {/* <Typography variant="body4" textAlign={'left'}>
              No payment method selected
            </Typography> */}
          </Grid>
          <div className={styles.ctnGridRadius}>
            <Typography onClick={resetStatePM} variant="body5" textAlign={'center'}>
              {/* Add Payment Method */}
              Change payment method
            </Typography>
          </div>
        </Grid>
      </div>
    );
  }

  function renderContent() {
    return (
      <div className={styles.ctnContent}>
        <div className={styles.ctnCard}>
          {renderTitle()}
          {renderForm()}
          {popupChangePassword()}
          {popupPaymentMethod()}
          {popupAddPaymentMethod()}
          {popupForgotPasword()}
          {popupSaveChangePasword()}
          {popupDeletePM()}
          {popupEmailReset()}
        </div>
      </div>
    );
  }

  return (
    <Page title="Edit Profile">
      <div className={styles.ctnRoot}>
        <div className={styles.ctnWrapper}>
          <HeaderUser />
          {renderContent()}
        </div>
      </div>
    </Page>
  );
}

export async function getServerSideProps(context) {
  try {
    const userData = getUserData(context);
    const UA = context.req.headers['user-agent'];
    const isMobile = Boolean(UA.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
    if (isMobile) {
      return {
        redirect: {
          permanent: false,
          destination: `/forbidden`,
        },
      };
    }
    return {
      props: {
        userData,
      }, // will be passed to the page component as props
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: `/login`,
      },
    };
  }
}
