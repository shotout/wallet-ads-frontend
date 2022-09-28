import { IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { setAuthorizationCookie } from '../../helpers/auth';
import responseValidatorObj from '../../helpers/responseValidatorObj';
import { requestLogin, verifyAccount } from '../../utils/requests';
import DefaultButton from '../../components/default-button';
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';
import useStyles from './styles';
import AuthFooter from '../../components/auth-footer';
import { routes } from '../../helpers/routes';
import nookies from 'nookies';

const appIcon = '/assets/svg/wallet_logo.svg';

const defaultErrorState = {
  email: null,
  password: null,
  errorValidation: null,
};

export default function Login({ isVerifyValid, changePassword }) {
  const styles = useStyles();
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
    isLoading: false,
  });
  const [errorMessage, setErrorMessage] = useState(defaultErrorState);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleSubmit = async () => {
    try {
      setErrorMessage({
        email: null,
        password: null,
        errorValidation: null,
      });
      setValues({ ...values, isLoading: true });
      const body = {
        email: values.email,
        password: values.password,
      };
      const res = await requestLogin(body);
      setAuthorizationCookie(res);
      window.location.href = '/';
      // setValues({ ...values, isLoading: false })
    } catch (err) {
      if (err.data) {
        if (err.data.errors) {
          setErrorMessage(responseValidatorObj(err.data.errors));
        }
        if (err.data.message && !err.data.errors) {
          setErrorMessage({
            email: null,
            password: null,
            errorValidation: err.data.message,
          });
        }
      }
      setValues({ ...values, isLoading: false });
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function renderHeader() {
    return (
      <div className={styles.ctnHeader}>
        <img src={appIcon} alt="wallet-ads" />
      </div>
    );
  }

  function renderForgotPassword() {
    return (
      <div className={styles.ctnForgotPassword}>
        <Link href={routes.forgotPassword}>
          <span>Forgot Password</span>
        </Link>
      </div>
    );
  }

  function renderDirectRegister() {
    return (
      <div className={styles.ctnDirectRegister}>
        <span>New here?</span>
        <div>
          <Link href={routes.register}>Create an account now</Link>
        </div>
      </div>
    );
  }

  function renderRedBox() {
    if (errorMessage.errorValidation) {
      return (
        <div className={styles.ctnRedBox}>
          <Typography variant="body1" color="#fff" textAlign={'center'}>
            {errorMessage.errorValidation}
          </Typography>
        </div>
      );
    }
    return null;
  }

  function renderGreenBox() {
    if (isVerifyValid === 'valid' || changePassword === 'success') {
      return (
        <div className={styles.ctnGreenBox}>
          <Typography variant="body1" color="#fff" textAlign={'center'}>
            {changePassword
              ? 'Your password has been successfully changed! You can now login with you new password.'
              : 'Your account has been activated. You can now login with your email address and your password.'}
          </Typography>
        </div>
      );
    }
    if (isVerifyValid === 'invalid') {
      return (
        <div className={styles.ctnRedBox}>
          <Typography variant="body1" color="#fff" textAlign={'center'}>
            Token expired.
          </Typography>
        </div>
      );
    }
    return null;
  }

  function renderInput() {
    return (
      <div className={styles.ctnInput}>
        <div className={styles.ctnTitle}>
          <Typography variant="h4" fontWeight={'800'} textAlign={'center'}>
            Login
          </Typography>
        </div>
        {renderRedBox()}
        {renderGreenBox()}
        <div className={styles.ctnForm}>
          <div className={styles.inputWrapper}>
            <TextField
              value={values.email}
              onChange={handleChange('email')}
              fullWidth
              error={errorMessage.email}
              helperText={errorMessage.email}
              placeholder="Email"
            />
          </div>
          <div className={styles.inputWrapper}>
            <TextField
              fullWidth
              placeholder="Password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              error={errorMessage.password}
              helperText={errorMessage.password}
              onChange={handleChange('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                      {values.showPassword ? (
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
          {renderForgotPassword()}
        </div>
        <DefaultButton onClick={handleSubmit} isLoading={values.isLoading} label={'Login'} />
        {renderDirectRegister()}
      </div>
    );
  }

  return (
    <Page title="Login">
      <meta name="description" content="Login to your WALLETADS account now!" />
      <div className={styles.ctnRoot}>
        {renderHeader()}
        {renderInput()}
        <AuthFooter />
      </div>
    </Page>
  );
}

export async function getServerSideProps(context) {
  const { verify, pwdreset } = context.query;
  try {
    if (verify) {
      await verifyAccount(verify, context);
    }
    const UA = context.req.headers['user-agent'];
    const isMobile = Boolean(UA.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
    nookies.destroy(context, 'authorization', { path: '/' });
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
        isVerifyValid: verify ? 'valid' : null,
        changePassword: pwdreset ? 'success' : null,
      }, // will be passed to the page component as props
    };
  } catch (err) {
    console.log('Error verify:', err);
    return {
      props: {
        isVerifyValid: verify ? 'invalid' : null,
        changePassword: pwdreset ? 'success' : null,
      }, // will be passed to the page component as props
    };
  }
}
