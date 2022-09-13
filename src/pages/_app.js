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

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';


// const stripePromise = loadStripe('pk_live_51LcRhPDKJFuPZhC4e8vwI5EGotJV9L07hZA5D3qqOmJjSDWK1PRv447YubnDP2Rt3Hm6rUhmEPfMaoFR9zcN5ajY00OcQS3hZj');
const stripePromise = loadStripe('pk_test_51LcRhPDKJFuPZhC477dIkviGDuKDS9vYyxGqH5RGH11LdnU9O1hl83bINQUOTxM9PjSfCA0jjiasDroLtyN4mEdo00LaTnnleG');

// ----------------------------------------------------------------------

MyApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.object,
  settings: PropTypes.object,
};

function MyApp(props) {
  const { Component, pageProps, settings } = props;

  const getLayout = Component.getLayout ?? ((page) => page);
  const options = {
    // passing the client secret obtained from the server
    clientSecret: 'pi_123_secret_123',
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />

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

                        <Elements stripe={stripePromise}>
                          {getLayout(<Component {...pageProps} />)}
                        </Elements>
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

  return {
    ...appProps,
    settings,
  };
};

export default MyApp
