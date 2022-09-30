import { useState } from 'react';
import { IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import Iconify from '../../components/Iconify';
import responseValidatorObj from '../../helpers/responseValidatorObj';
import Page from '../../components/Page';
import AuthFooter from '../../components/auth-footer';
import useStyles from './styles';
import DefaultButton from '../../components/default-button';
import { requestCheckToken, handleResetPassword } from '../../utils/requests';
import nookies from 'nookies';

const appIcon = '/assets/svg/wallet_logo.svg';

const defaultState = {
  email: '',
  password: '',
  password_confirmation: '',
  isLoading: false,
};

const defaultErrorState = {
  password: null,
  token: false,
};

export default function ChangePassword({ isVerifyValid, token, datas }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const styles = useStyles();

  const [values, setValues] = useState(defaultState);
  const [errorMessage, setErrorMessage] = useState(defaultErrorState);
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = (type) => {
    switch (type) {
      case 'new':
        setShowPassword({ ...showPassword, newPassword: !showPassword.newPassword });
        break;
      case 'confirm':
        setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword });
        break;
      default:
      // do nothing
    }
  };

  const handleSubmit = async () => {
    try {
      setErrorMessage({
        password: null,
        token: false,
      });
      setValues({ ...values, isLoading: true });
      const body = {
        token,
        password: values.password,
        password_confirmation: values.password_confirmation,
      };
      const res = await handleResetPassword(body);
      window.location.href = '/login?pwdreset=success';
      setValues({ ...values, isLoading: false });
    } catch (err) {
      if (err.data) {
        if (err.data.errors) {
          setErrorMessage(responseValidatorObj(err.data.errors));
        }
        if (err.data.message && !err.data.errors) {
          console.log(err.data.message);
          setErrorMessage({
            password: null,
            token: true,
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

  function renderInput() {
    return (
      <div className={styles.ctnInput}>
        <div className={styles.ctnTitle}>
          <Typography variant="h4" fontWeight={'800'} textAlign={'center'}>
            Change Password
          </Typography>
        </div>
        {renderGreenBox()}
        <div className={styles.ctnForm}>
          <div className={styles.inputWrapperDisabled}>
            <TextField
              fullWidth
              value={datas.data?.email}
              onChange={handleChange('email')}
              error={errorMessage.email}
              helperText={errorMessage.email}
              placeholder="Email"
              className={styles.btnDisabled}
              disabled
            />
          </div>
          <div className={styles.inputWrapper}>
            <TextField
              value={values.password}
              onChange={handleChange('password')}
              error={errorMessage.password}
              helperText={errorMessage.password}
              fullWidth
              type={showPassword.newPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handleClickShowPassword('new')}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword.newPassword ? (
                        <Iconify icon="eva:eye-fill" width={24} height={24} />
                      ) : (
                        <Iconify icon="eva:eye-off-fill" width={24} height={24} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              placeholder="New password"
            />
          </div>
          <div className={styles.inputWrapper}>
            <TextField
              value={values.password_confirmation}
              onChange={handleChange('password_confirmation')}
              error={errorMessage.password}
              helperText={errorMessage.password}
              fullWidth
              type={showPassword.confirmPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handleClickShowPassword('confirm')}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword.confirmPassword ? (
                        <Iconify icon="eva:eye-fill" width={24} height={24} />
                      ) : (
                        <Iconify icon="eva:eye-off-fill" width={24} height={24} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              placeholder="Confirm new password"
            />
          </div>
        </div>
        <DefaultButton onClick={handleSubmit} isLoading={values.isLoading} label={'Reset Password'} />
      </div>
    );
  }

  function renderGreenBox() {
    console.log(isVerifyValid);
    if (isVerifyValid === 'valid') {
      return (
        <div className={styles.ctnGreenBox}>
          <Typography variant="body1" color="#fff" textAlign={'center'}>
            Please create a new password below to reset and change your password.
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

  return (
    <Page title="Forgot Password">
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
  const { verify } = context.query;
  let datas;
  try {
    if (verify) {
      const data = {
        token: verify,
      };
      datas = await requestCheckToken(data);
    } else {
      return {
        redirect: {
          permanent: false,
          destination: `/`,
        },
      };
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
        token: verify ?? null,
        datas,
      }, // will be passed to the page component as props
    };
  } catch (err) {
    return {
      props: {
        isVerifyValid: verify ? 'invalid' : null,
        token: verify ?? null,
      }, // will be passed to the page component as props
    };
  }
}
