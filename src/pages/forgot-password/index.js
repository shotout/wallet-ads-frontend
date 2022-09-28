import React from 'react';
import { IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';
import AuthFooter from '../../components/auth-footer';
import useStyles from './styles';
import DefaultButton from '../../components/default-button';
import { routes } from '../../helpers/routes';

const appIcon = '/assets/svg/wallet_logo.svg';

export default function forgotPassword() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const styles = useStyles();

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
            Forgot Password
          </Typography>
        </div>
        <div className={styles.ctnTextNote}>
          <Typography variant="h6" fontWeight={'800'} textAlign={'center'}>
            Enter your email address and you will receive an email with instructions on how to reset your password.
          </Typography>
        </div>
        <div className={styles.ctnForm}>
          <div className={styles.inputWrapper}>
            <TextField
              fullWidth
              // value={values.email}
              // onChange={handleChange('email')}
              // fullWidth
              // error={errorMessage.email}
              // helperText={errorMessage.email}
              placeholder="Email"
            />
          </div>
        </div>
        <DefaultButton label={'Reset Password'} />
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
        {renderInput()}
        <AuthFooter />
      </div>
    </Page>
  );
}
