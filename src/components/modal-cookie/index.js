import CookieConsent from 'react-cookie-consent';
import Link from 'next/link';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import i18next from 'i18next';
import { useEffect, useState } from 'react';
import useStyles from './PopupStyle';
import { Switch, Grid, Popover } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { routes } from '../../helpers/routes';
import { getConsentCookie, setConsentCookie } from '../../helpers/auth';
import _ from 'lodash'

const ModalCookie = ({ countryId }) => {
  const styles = useStyles();
  const [values, setFormValues] = useState({
    essentialCookie: true,
    marketingCookie: true,
    functionalCookie: true,
    analyticCookie: true,
    acceptCookie: null
  })
  const [showPopover, setShowPopover] = useState(false)

  useEffect(() => {
    const initialCookie = getConsentCookie()
    if(!_.isEmpty(initialCookie)){
      setFormValues(initialCookie)
    }
    if(countryId === 'de'){
      i18n.changeLanguage('de')
    }
  }, [])

  const handleSubmit = (status) => {
    const objCookie = {
      ...values,
      acceptCookie: status
    }
    setConsentCookie(objCookie)
    setFormValues(objCookie)
  }

  const handleChange = (prop) => (event) => {
    setFormValues({ ...values, [prop]: event.target.checked });
  };

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
            <Typography id="transition-modal-title" variant="h4" component="h4">
              {i18next.t("ModalTitle")}
            </Typography>
                <Divider sx={{ mt: 2 }} />
                <Typography gutterBottom id="transition-modal-description" sx={{ mt: 1 }} variant="h6">
                  {i18next.t("EssentialTitle")}
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={10}>
                    <Typography id="transition-modal-description">
                    {i18next.t("EssentialDesc")}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Switch disabled checked={values.essentialCookie} onChange={handleChange('essentialCookie')} />
                  </Grid>
                </Grid>

                <Divider sx={{ mt: 1 }} />
                <Typography gutterBottom id="transition-modal-description" sx={{ mt: 1 }} variant="h6">
                {i18next.t("MarketingTitle")}
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={10}>
                    <Typography id="transition-modal-description">
                    {i18next.t("MarketingDesc")}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                  <Switch checked={values.marketingCookie} onChange={handleChange('marketingCookie')} />
                  </Grid>
                </Grid>

                <Divider sx={{ mt: 1 }} />
                <Typography gutterBottom id="transition-modal-description" sx={{ mt: 1 }} variant="h6">
                {i18next.t("FunctionalityTitle")}
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={10}>
                    <Typography id="transition-modal-description">
                    {i18next.t("FunctionalityDesc")}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Switch checked={values.functionalCookie} onChange={handleChange('functionalCookie')} />
                  </Grid>
                </Grid>

                <Divider sx={{ mt: 1 }} />
                <Typography gutterBottom id="transition-modal-description" sx={{ mt: 1 }} variant="h6">
                  {i18next.t("AnalyticTitle")}
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={10}>
                    <Typography id="transition-modal-description">
                    {i18next.t("AnalyticDesc")}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Switch checked={values.analyticCookie} onChange={handleChange('analyticCookie')} />
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
                    onClick={() => {handleSubmit('accept')}}
                  >
                    {i18next.t('SaveChanges')}
                  </Button>
                </Box>
          </div>
        </Popover>
    )
  }

  return (
      <I18nextProvider i18n={i18n} defaultNS={countryId}>
        <div className={`${styles.ctnRootTop} ${i18next.resolvedLanguage === 'de' ? styles.ctnRootDe : ''}`}>
        <CookieConsent
          location="bottom"
          buttonText={i18next.t('Accept')}
          declineButtonText="x"
          cookieName="cookies-agreement"
          cookieValue={true}
          hideOnAccept
          declineCookieValue={false}
          style={{ background: 'black', alignItems: 'center' }}
          buttonClasses="button-ctn"
          contentStyle={{ height: '100%' }}
          onAccept={() => {handleSubmit('accept')}}
          onDecline={() => {handleSubmit('decline')}}
          buttonStyle={{
            background: 'white',
            color: '#000',
            fontSize: '12px',
            fontWeight: '600',
            // fontFamily: 'Muli !important',
            fontFamily: 'Muli',
            height: 28,
          }}
          declineButtonStyle={{ color: 'white', background: 'black', border: '1px solid #FFFFFF' }}
          expires={365}
          visible={values.acceptCookie === null ? 'show' : 'hidden'}
        >
          <div className={styles.ctnRoot}>
            <div className={styles.ctnText}>
              <span>
                {i18next.t('CookieConsentText')}{' '}
                <Link href={`${routes.privacy}?init_lang=${(i18next.resolvedLanguage === 'de' || countryId === 'de' ? 'de' : 'en')}`}>
                  <a style={{ color: 'white' }}>{i18next.t('PrivacyPolicy')}</a>
                </Link>
              </span>
            </div>
            <div className={`${styles.ctnBtn} ${i18next.resolvedLanguage === 'de' ? styles.ctnBtnDe : ''}`}>
              <div
                className={styles.btnManage}
                onClick={() => {
                  setShowPopover(true);
                }}
              >
                <span>
                  {i18next.t('CookieSettings')}
                </span>
              </div>
              {renderPopover()}
            </div>
          </div>
        </CookieConsent>
      </div>
      </I18nextProvider>
  );
};

export default ModalCookie;
