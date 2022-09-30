import { useState, useEffect } from 'react';
import { TextField, Typography } from '@mui/material';
import Link from 'next/link';
import Page from '../../components/Page';
import AuthFooter from '../../components/auth-footer';
import useStyles from './styles';
import DefaultButton from '../../components/default-button';
import { routes } from '../../helpers/routes';
import { requestResetPassword } from '../../utils/requests';
import responseValidatorObj from '../../helpers/responseValidatorObj';

const appIcon = '/assets/svg/wallet_logo.svg';
const mailSuccess = '/assets/svg/mail_success.svg';

export default function ForgotPassword() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const styles = useStyles();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [values, setValues] = useState({
    email: '',
    isLoading: false,
  });

  const [errorMessage, setErrorMessage] = useState({
    email: null,
  });

  const [sent, setSent] = useState(false);
  const [count, setCount] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => setTimer(timer - 1), 1000);
    } else {
      setCount(false);
    }
  }, [timer]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async () => {
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

  function renderHeader() {
    return (
      <div className={styles.ctnHeader}>
        <img src={appIcon} alt="wallet-ads" />
      </div>
    );
  }

  function resendEmail() {
    handleSubmit();
    setCount(true);
    setTimer(45);
  }

  function renderSuccessSentMail() {
    return (
      <div className={styles.ctnInput}>
        <div className={styles.ctnTitle}>
          <Typography variant="h4" fontWeight={'800'} textAlign={'center'}>
            Email has been sent!
          </Typography>
        </div>
        <div className={styles.ctnLogo}>
          <img src={mailSuccess} alt="wallet-ads" />
        </div>
        <div className={styles.ctnGreenBox}>
          <Typography variant="body1" color="#fff" textAlign={'center'}>
            We have sent an email with a password recovery link to your email inbox. Please follow the instructions in
            the email to reset your password.
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle1" color="#000" textAlign={'center'}>
            {count ? (
              <>
                You did not receive the email? Check your spam folder or wait{' '}
                <span className={styles.ctnTimer}>
                  {timer} {timer > 1 ? 'seconds' : 'second'}
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
    );
  }

  function renderInput() {
    return (
      <div className={styles.ctnInput}>
        <div className={styles.ctnTitle}>
          <Typography variant="h4" fontWeight={'800'} textAlign={'center'}>
            Forgot Password
          </Typography>
        </div>
        <div className={styles.ctnTextNote}>
          <Typography variant="subtitle1" fontWeight={'700'} textAlign={'center'}>
            Enter your email address and you will receive an email with instructions on how to reset your password.
          </Typography>
        </div>
        <div className={styles.ctnForm}>
          <div className={styles.inputWrapper}>
            <TextField
              fullWidth
              value={values.email}
              onChange={handleChange('email')}
              error={errorMessage.email}
              type="email"
              helperText={errorMessage.email}
              placeholder="Email"
            />
          </div>
        </div>
        <DefaultButton onClick={handleSubmit} isLoading={values.isLoading} label={'Reset Password'} />
        {renderDirectRegister()}
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

  return (
    <Page title="Forgot Password">
      <meta name="description" content="Login to your WALLETADS account now!" />
      <div className={styles.ctnRoot}>
        {renderHeader()}
        {sent ? renderSuccessSentMail() : renderInput()}
        <AuthFooter />
      </div>
    </Page>
  );
}

export async function getServerSideProps(context) {
  try {
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
  } catch (err) {
    console.log('Error verify:', err);
  }
}
