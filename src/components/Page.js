/* eslint-disable @next/next/no-script-component-in-head */
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
// next
import Head from 'next/head';
import Script from 'next/script';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = '', meta, ...other }, ref) => (
  <>
    <Head>
      <title>{`${title} | WALLETADS`}</title>
      {meta}
      <Script strategy="afterInteractive" id="matomoAnalytics">
        {`var _paq = window._paq = window._paq || [];
          /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
          _paq.push(['trackPageView']);
          _paq.push(['enableLinkTracking']);
          (function() {
            var u="https://walletads.matomo.cloud/";
            _paq.push(['setTrackerUrl', u+'matomo.php']);
            _paq.push(['setSiteId', '1']);
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; g.src='//cdn.matomo.cloud/walletads.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
          })();`}
      </Script>
    </Head>

    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
));

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  meta: PropTypes.node,
};

export default Page;
