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
import { eventTrack } from '../../utils/tracker';

const appIcon = '/assets/svg/wallet_logo.svg';
const emailBanner = '/assets/email_banner.png';

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

export default function Register() {
  const styles = useStyles();
  const [values, setValues] = useState(defaultState);
  const [errorMessage, setErrorMessage] = useState(defaultState);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [contentType, setContentType] = useState('register');

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
            <Typography variant="h6" fontWeight={'800'} textAlign={'center'}>
              Snooze ads
            </Typography>
          </div>
          <div className={styles.ctnTitle}>
            <Typography variant={'subtitle2'} fontWeight={'800'} textAlign={'center'}>
              Don’t like the ad that you’re currently seeing? You can snooze ads now for 30 or 90 days.
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
            </Grid>
          </div>
          <DefaultButton
            onClick={handleSubmit}
            eventName={'Create New Account Clicked'}
            isLoading={isLoading}
            ctnBtnStyle={styles.btnStyle}
            label={'Create account'}
          />
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
    <Page title="Sign Up">
      <meta name="description" content="Create your WALLETADS account now!" />
      <div className={styles.ctnRoot}>
        {renderHeader()}
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
  if (isMobile) {
    return {
      redirect: {
        permanent: false,
        destination: `/forbidden`,
      },
    };
  }
  return {
    props: {}, // will be passed to the page component as props
  };
}
