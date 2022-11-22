import { Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import Iconify from '../../components/Iconify';
import DefaultButton from '../../components/default-button';
import Page from '../../components/Page';
import useStyles from './styles';
import { requestRegister } from '../../utils/requests';
import responseValidatorObj from '../../helpers/responseValidatorObj';
import Link from 'next/link';
import { routes } from '../../helpers/routes';
import AuthFooter from '../../components/auth-footer';
import { eventTrack, GTMTracker } from '../../utils/tracker';

const appIcon = '/assets/svg/wallet_logo.svg';
const emailBanner = '/assets/email_banner.png';
const menuIcon = '/assets/svg/menu.svg';

const defaultState = {
  company_name: '',
  tax_id: '',
  first_name: '',
  last_name: '',
  street: '',
  post_code: '',
  city: '',
  phone: '',
  email: '',
  password: '',
  password_confirmation: '',
  country: '',
};

export default function Register({ isMobile }) {
  const styles = useStyles();
  const [values, setValues] = useState(defaultState);
  const [errorMessage, setErrorMessage] = useState(defaultState);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [contentType, setContentType] = useState('register');
  const [showMenu, setShowMenu] = useState(false);

  const handleChange = (prop) => (event) => {
    if (errorMessage[prop]?.length > 0) {
      setErrorMessage({
        ...errorMessage,
        [prop]: '',
      });
    }
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await requestRegister(values);
      setContentType('success');
      GTMTracker({
        event: 'signup-succesful',
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
  };

  function renderHeader() {
    return (
      <div className={styles.ctnHeader}>
        <img src={appIcon} alt="wallet-ads" />
      </div>
    );
  }

  function renderMobileHeader() {
    return (
      <div className={styles.ctnMobileHeader}>
        <Link href={routes.walletads}>
          <img src={appIcon} alt="wallet-ads" />
        </Link>
        <div className="menu">
          <img onClick={() => setShowMenu(!showMenu)} src={menuIcon} alt="wallet-ads" />
        </div>
      </div>
    );
  }

  const renderMobileMenu = () => (
    <div className={styles.ctnMenuRoot}>
      <div className={styles.ctnMobileHeader}>
        <Link href={routes.walletads}>
          <img src={appIcon} alt="wallet-ads" />
        </Link>
        <div className="menu">
          <img onClick={() => setShowMenu(!showMenu)} src={menuIcon} alt="wallet-ads" />
        </div>
      </div>

      <div className={styles.ctnLink}>
        <Link href={routes.walletadsFeature}>
          <a target={'_blank'}>Features</a>
        </Link>
        <Link href={routes.walletadsExplore}>
          <a target={'_blank'}>Explore</a>
        </Link>
        <Link href={routes.walletadsContact}>
          <a target={'_blank'}>Contact</a>
        </Link>
        <Link href={routes.walletadsLogin}>
          <a target={'_blank'}>Login</a>
        </Link>
      </div>
    </div>
  );

  function renderDirect() {
    return (
      <div className={styles.ctnDirectRegister}>
        <span>Already have an account?</span>
        <div onClick={() => eventTrack('Login')}>
          <Link href={routes.login}>Login</Link>
        </div>
      </div>
    );
  }

  function renderInput() {
    if (contentType === 'register') {
      return (
        <div className={styles.ctnInput}>
          <div className={styles.ctnTitle}>
            <Typography variant="h4" fontWeight={'800'} textAlign={'center'}>
              Create an account
            </Typography>
          </div>
          <div className={styles.ctnForm}>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <div className={styles.inputWrapper}>
                  <TextField
                    value={values.company_name}
                    onChange={handleChange('company_name')}
                    error={errorMessage.company_name}
                    helperText={errorMessage.company_name}
                    size="small"
                    fullWidth
                    placeholder="Company Name"
                  />
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div className={styles.inputWrapper}>
                  <TextField
                    value={values.tax_id}
                    onChange={handleChange('tax_id')}
                    error={errorMessage.tax_id}
                    helperText={errorMessage.tax_id}
                    size="small"
                    fullWidth
                    placeholder="Tax ID"
                  />
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div className={styles.inputWrapper}>
                  <TextField
                    value={values.first_name}
                    onChange={handleChange('first_name')}
                    error={errorMessage.first_name}
                    helperText={errorMessage.first_name}
                    size="small"
                    fullWidth
                    placeholder="First Name"
                  />
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div className={styles.inputWrapper}>
                  <TextField
                    value={values.last_name}
                    onChange={handleChange('last_name')}
                    error={errorMessage.last_name}
                    helperText={errorMessage.last_name}
                    size="small"
                    fullWidth
                    placeholder="Last Name"
                  />
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div className={styles.inputWrapper}>
                  <TextField
                    value={values.street}
                    onChange={handleChange('street')}
                    error={errorMessage.street}
                    helperText={errorMessage.street}
                    size="small"
                    fullWidth
                    placeholder="Street address"
                  />
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <div className={styles.inputWrapper}>
                      <TextField
                        value={values.post_code}
                        onChange={handleChange('post_code')}
                        error={errorMessage.post_code}
                        helperText={errorMessage.post_code}
                        size="small"
                        fullWidth
                        placeholder="Post Code"
                      />
                    </div>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <div className={styles.inputWrapper}>
                      <TextField
                        value={values.city}
                        onChange={handleChange('city')}
                        error={errorMessage.city}
                        helperText={errorMessage.city}
                        size="small"
                        fullWidth
                        placeholder="City"
                      />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={6} xs={12}>
                <div className={styles.inputWrapper}>
                  <TextField
                    value={values.country}
                    onChange={handleChange('country')}
                    error={errorMessage.country}
                    helperText={errorMessage.country}
                    size="small"
                    fullWidth
                    placeholder="Country/Region"
                  />
                </div>
              </Grid>
              <Grid item md={6} xs={12} />
            </Grid>
            <div className={styles.ctnGridBottom} />
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <div className={styles.inputWrapper}>
                  <TextField
                    value={values.email}
                    onChange={handleChange('email')}
                    error={errorMessage.email}
                    helperText={errorMessage.email}
                    size="small"
                    fullWidth
                    placeholder="Email address"
                  />
                </div>
              </Grid>

              <Grid item md={6} xs={12}>
                <div className={styles.inputWrapper}>
                  <TextField
                    value={values.phone}
                    onChange={handleChange('phone')}
                    error={errorMessage.phone}
                    helperText={errorMessage.phone}
                    size="small"
                    fullWidth
                    placeholder="Telephone"
                  />
                </div>
              </Grid>

              <Grid item md={6} xs={12}>
                <div className={styles.inputWrapper}>
                  <TextField
                    value={values.password}
                    onChange={handleChange('password')}
                    error={errorMessage.password}
                    helperText={errorMessage.password}
                    size="small"
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <Iconify icon="eva:eye-fill" width={24} height={24} />
                            ) : (
                              <Iconify icon="eva:eye-off-fill" width={24} height={24} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Create Password"
                  />
                </div>
              </Grid>

              <Grid item md={6} xs={12}>
                <div className={styles.inputWrapper}>
                  <TextField
                    value={values.password_confirmation}
                    onChange={handleChange('password_confirmation')}
                    error={errorMessage.password_confirmation}
                    helperText={errorMessage.password_confirmation}
                    size="small"
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <Iconify icon="eva:eye-fill" width={24} height={24} />
                            ) : (
                              <Iconify icon="eva:eye-off-fill" width={24} height={24} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Confirm Password"
                  />
                </div>
              </Grid>
            </Grid>
          </div>
          <DefaultButton
            onClick={handleSubmit}
            eventName={'Create New Account Clicked'}
            isLoading={isLoading}
            ctnBtnStyle={styles.btnStyle}
            label={'Create account'}
          />
          {!isMobile && renderDirect()}
        </div>
      );
    }
    return null;
  }

  function renderSuccess() {
    if (contentType === 'success') {
      return (
        <div className={styles.ctnInput}>
          <div className={styles.ctnSuccess}>
            <img src={emailBanner} alt="success" />
            <Typography
              variant="h5"
              marginTop={3}
              marginBottom={2}
              fontWeight="800"
              lineHeight={1.3}
              textAlign={'center'}
            >
              We are currently validating your data and will send you a link to activate your account within the next 24
              hours.
            </Typography>
            <Typography variant="body1" textAlign={'center'}>
              Once you receive the activation email, please confirm your email address by clicking the button in the
              email.
            </Typography>
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <Page title="Sign up" description="Create your WALLETADS account now!">
      <meta name="description" />
      <div className={styles.ctnRoot}>
        {isMobile ? (
          <>
            <div>{renderMobileHeader()}</div>
            <div>{showMenu && renderMobileMenu()}</div>
          </>
        ) : (
          renderHeader()
        )}
        {renderInput()}
        {renderSuccess()}
        <AuthFooter />
      </div>
    </Page>
  );
}

export async function getServerSideProps(context) {
  const UA = context.req.headers['user-agent'];
  const isMobile = Boolean(UA.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));

  return {
    props: {
      isMobile,
    }, // will be passed to the page component as props
  };
}
