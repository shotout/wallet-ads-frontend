import CookieConsent, { Cookies,  } from 'react-cookie-consent';
import Link from 'next/link';
import useStyles from './PopupStyle';
import { useState } from 'react';
import { Popover } from '@mui/material';

const Popup = () => {
  const [showPopover, setShowPopover] = useState(false)

  const styles = useStyles()

  function renderPopover(){
    return (
      <Popover
          id={"cookie-menu"}
          open={Boolean(showPopover)}
          anchorEl={"menu-cookie"}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          onClose={() => {setShowPopover(false)}}
          className={styles.ctnPopover}
      >
        <div className={styles.ctnContentPopup}>
          <span>Popup Showed</span>
        </div>
        </Popover>
    )
  }

  return (
    <div>
      <CookieConsent
        location="bottom"
        // enableDeclineButton
        buttonText="Accept"
        // declineButtonText="Cookie Settings"
        cookieName="cookies"
        style={{ background: 'black' }}
        contentStyle={{ height: '100%'}}
        styl
        buttonStyle={{
          width: 120,
          height: 40,
          border: '1px solid #fff',
          background: '#000',
          color: '#fff',
          marginTop: 20,
        }}
        expires={150}
      >
        <div className={styles.ctnRoot}>
          <div className={styles.ctnText}>
            We use cookies and similar technologies to enable services and functionality on our site and to understand your
            interaction with our service By clicking on accept, you agree to our use of such technologies for marketing and
            analytic.{' '}
            <span>
              <Link href="/cookies">
                <a style={{ color: 'white' }}>See Privacy Policy</a>
              </Link>
            </span>
          </div>
          <div className={styles.ctnBtn}>
            <div className={styles.btnManage} onClick={() => { setShowPopover(true)}}>
              <span>Manage Cookie</span>
            </div>
          </div>
        </div>
      </CookieConsent>
      {renderPopover()}
    </div>
  )
};

export default Popup;
