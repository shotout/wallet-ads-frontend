import { forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
// next
import Head from 'next/head';
// @mui
import { Box } from '@mui/material';
// matomo tracker
import { loadPageTracker } from '../utils/tracker';

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = '', meta, ...other }, ref) => {
  useEffect(() => {
    loadPageTracker({
      title,
    });
  }, []);

  return (
    <>
      <Head>
        <title>{`WALLETADS | ${title}`}</title>
        {meta}
      </Head>

      <Box ref={ref} {...other}>
        {children}
      </Box>
    </>
  );
});

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  meta: PropTypes.node,
};

export default Page;
