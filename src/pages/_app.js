/* eslint-disable @next/next/no-script-component-in-head */
// scroll bar
import 'simplebar/src/simplebar.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

import '../theme/css-import.css';
import '../theme/overrides.css';
import PropTypes from 'prop-types';
import cookie from 'cookie';
// next
import Head from 'next/head';
import Script from 'next/script';
import App from 'next/app';
// utils
import { getSettings } from '../utils/settings';
// contexts
import { SettingsProvider } from '../contexts/SettingsContext';
import { CollapseDrawerProvider } from '../contexts/CollapseDrawerContext';
// theme// redux
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from '../redux/store';
import ThemeProvider from '../theme';
// components
import RtlLayout from '../components/RtlLayout';
import ProgressBar from '../components/ProgressBar';
import ThemeColorPresets from '../components/ThemeColorPresets';
import MotionLazyContainer from '../components/animate/MotionLazyContainer';

import MuiCoreTheme from '../theme/MuiCoreTheme';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import ModalCookie from '../components/modal-cookie';
import Axios from 'axios';
const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

// ----------------------------------------------------------------------

MyApp.propTypes = {
  Component: PropTypes.any,
  countryId: PropTypes.any,
  pageProps: PropTypes.object,
  settings: PropTypes.object,
};

function MyApp(props) {
  const { Component, pageProps, settings, countryId } = props;
  const getLayout = Component.getLayout ?? ((page) => page);
  const options = {
    // passing the client secret obtained from the server
    clientSecret: 'pi_123_secret_123',
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            console.log('Matomo Component')

            var _paq = (window._paq = window._paq || []);
            /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function () {
              var u = 'https://walletads.matomo.cloud/';
              _paq.push(['setTrackerUrl', u + 'matomo.php']);
              _paq.push(['setSiteId', '1']);
              var d = document,
                g = d.createElement('script'),
                s = d.getElementsByTagName('script')[0];
              g.async = true;
              g.src = '//cdn.matomo.cloud/walletads.matomo.cloud/matomo.js';
              s.parentNode.insertBefore(g, s);
            })();
          `,
          }}
        />
      </Head>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <CollapseDrawerProvider>
            <SettingsProvider defaultSettings={settings}>
              <ThemeProvider>
                <MuiCoreTheme>
                  <MotionLazyContainer>
                    <ThemeColorPresets>
                      <RtlLayout>
                        <ProgressBar />
                        <Elements stripe={stripePromise}>{getLayout(<Component {...pageProps} />)}</Elements>
                        <ModalCookie countryId={countryId} />
                      </RtlLayout>
                    </ThemeColorPresets>
                  </MotionLazyContainer>
                </MuiCoreTheme>
              </ThemeProvider>
            </SettingsProvider>
          </CollapseDrawerProvider>
        </PersistGate>
      </ReduxProvider>
    </>
  );
}

// ----------------------------------------------------------------------

MyApp.getInitialProps = async (context) => {
  const appProps = await App.getInitialProps(context);

  const cookies = cookie.parse(context.ctx.req ? context.ctx.req.headers.cookie || '' : document.cookie);

  const settings = getSettings(cookies);
  const res = await Axios.get('https://ipapi.co/json/');
  return {
    ...appProps,
    settings,
    countryId: (res.data.country || '').toLowerCase(),
  };
};

export default MyApp;
