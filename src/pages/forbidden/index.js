import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import React from 'react';
import Link from 'next/link';
import AuthFooter from '../../components/auth-footer';
import useStyles from './styles';
import { routes } from './../../helpers/routes';
import { Router } from 'next/router';

const disableAsset = '/assets/disable.png';
const appIcon = '/assets/svg/wallet_logo.svg';
const menuIcon = '/assets/svg/menu.svg';

export default function NoMobile() {
  const styles = useStyles();
  const [showMenu, setShowMenu] = useState(false);
  function renderHeader() {
    return (
      <div className={styles.ctnHeader}>
        <Link href={routes.walletads}>
          <img src={appIcon} alt="wallet-ads" />
        </Link>
        <div className="menu">
          <img onClick={() => setShowMenu(!showMenu)} src={menuIcon} alt="wallet-ads" />
        </div>
      </div>
    );
  }

  const renderMenu = () => (
    <div className={styles.ctnMenuRoot}>
      <div className={styles.ctnHeader}>
        <Link href={routes.walletads}>
          <img src={appIcon} alt="wallet-ads" />
        </Link>
        <div className="menu">
          <img onClick={() => setShowMenu(!showMenu)} src={menuIcon} alt="wallet-ads" />
        </div>
      </div>

      <div className={styles.ctnLink}>
        <Link href={routes.walletadsFeature}>
          <a target={'_blank'}>Feature</a>
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

  return (
    <Box
      sx={{
        display: 'flex',
        height: 1,
        flexDirection: 'column',
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(203, 180, 223, 0.5) 100%)',
      }}
    >
      <div>{renderHeader()}</div>
      <div>{showMenu && renderMenu()}</div>
      <div className={styles.ctnWrapper}>
        <img src={disableAsset} alt="disable" />
        <Typography variant="h4" className={styles.txtDesc} textAlign="center">
          To enter the <b>WALLETADS Campaign Dashboard</b>, please use a desktop device for the best experience. Thank
          you!
        </Typography>
      </div>
      <div className={styles.ctnFooter}>
        <AuthFooter />
      </div>
    </Box>
  );
}
