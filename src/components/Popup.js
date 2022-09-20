import CookieConsent, { Cookies } from 'react-cookie-consent';
import Link from 'next/link';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import i18next from 'i18next';
import { useState } from 'react';
import useStyles from './PopupStyle';
import { Popover, Switch, Grid } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import Dialog, { DialogProps } from '@mui/material/Dialog';

const style = {
  position: 'absolute',
  // overflow: 'scroll',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Popup = () => {
  const [showPopover, setShowPopover] = useState(false);
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isOpen, setIsOpen] = useState(true);
  if (!isOpen) {
    return null;
  }
  function renderPopover() {
    return (
      <Popover
        id={'cookie-menu'}
        open={Boolean(showPopover)}
        anchorEl={'menu-cookie'}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        onClose={() => {
          setShowPopover(false);
        }}
        className={styles.ctnPopover}
      >
        {/* <div className={styles.ctnContentPopup}>
          <span>Popup Showed</span>
        </div> */}
      </Popover>
    );
  }

  return (
    <div>
      <I18nextProvider i18n={i18n}>
        <CookieConsent
          location="bottom"
          buttonText={i18next.t('Accept')}
          cookieName="cookies"
          style={{ background: 'black' }}
          contentStyle={{ height: '100%' }}
          buttonStyle={{
            background: 'white',
            color: '#503B3B',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
          declineButtonStyle={{ color: 'white', background: 'black', border: '1px solid #FFFFFF' }}
          expires={150}
        >
          <div className={styles.ctnRoot}>
            <div className={styles.ctnText}>
              <span>
                {i18next.t('CookieConsentText')}{' '}
                <Link href="/cookies">
                  <a style={{ color: 'white' }}>{i18next.t('PrivacyPolicy')}</a>
                </Link>
              </span>
            </div>
            <div className={styles.ctnBtn}>
              <div
                className={styles.btnManage}
                onClick={() => {
                  setShowPopover(true);
                }}
              >
                <span>
                  <Button
                    style={{
                      color: 'white',
                      background: 'black',
                      fontSize: '10px',
                    }}
                    onClick={handleOpen}
                  >
                    {i18next.t('CookieSettings')}
                  </Button>
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <Fade in={open}>
                      {/* <DialogContent> */}
                      <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h4">
                          Advanced Cookie Settings
                        </Typography>
                        <Divider sx={{ mt: 2 }} />
                        <Typography gutterBottom id="transition-modal-description" sx={{ mt: 2 }} variant="h6">
                          Essential Cookies
                        </Typography>
                        <Grid container spacing={3}>
                          <Grid item xs={10}>
                            <Typography id="transition-modal-description">
                              These cookies enable core functionality such as security, verification of identity and
                              network management. These cookies can’t be disabled.
                            </Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <Switch />
                          </Grid>
                        </Grid>

                        <Divider sx={{ mt: 1 }} />
                        <Typography gutterBottom id="transition-modal-description" sx={{ mt: 1 }} variant="h6">
                          Enable Marketing Cookies
                        </Typography>
                        <Grid container spacing={3}>
                          <Grid item xs={10}>
                            <Typography id="transition-modal-description">
                              These cookies are used to track advertising effectiveness to provide a more relevant
                              service and deliver better ads to suit your interests.
                            </Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <Switch />
                          </Grid>
                        </Grid>

                        <Divider sx={{ mt: 1 }} />
                        <Typography gutterBottom id="transition-modal-description" sx={{ mt: 1 }} variant="h6">
                          Enable Functional Cookies
                        </Typography>
                        <Grid container spacing={3}>
                          <Grid item xs={10}>
                            <Typography id="transition-modal-description">
                              These cookies collect data to remember choices users make to improve and give a more
                              personalised experience.
                            </Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <Switch />
                          </Grid>
                        </Grid>

                        <Divider sx={{ mt: 1 }} />
                        <Typography gutterBottom id="transition-modal-description" sx={{ mt: 1 }} variant="h6">
                          Enable Analytics Cookies
                        </Typography>
                        <Grid container spacing={3}>
                          <Grid item xs={10}>
                            <Typography id="transition-modal-description">
                              These cookies help us to understand how visitors interact with our website, discover
                              errors and provide a better overall analytics.
                            </Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <Switch />
                          </Grid>
                        </Grid>
                        <br />
                        {/* <Divider sx={{ mt: 1 }} /> */}
                        <Box component="span" m={1} display="flex" justifyContent="space-between" alignItems="center">
                          <Button
                            disabled
                            style={{
                              color: 'white',
                              background: 'white',
                              position: 'center',
                            }}
                          >
                            exit
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            sx={{ height: 40 }}
                            style={{
                              color: 'white',
                              background: 'black',
                              position: 'center',
                            }}
                            onClick={() => setIsOpen(false)}
                          >
                            Save Changes
                          </Button>
                        </Box>
                      </Box>
                      {/* </DialogContent> */}
                    </Fade>
                  </Modal>
                </span>
                {/* CookieSettings */}
              </div>
            </div>
          </div>
        </CookieConsent>
      </I18nextProvider>
      {/* {renderPopover()} */}
    </div>
  );
};

export default Popup;
