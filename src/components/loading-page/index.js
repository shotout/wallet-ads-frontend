import React from 'react';
import { Grid, Popover, Typography, Box } from '@mui/material';
import useStyles from './styles';
import Lottie from 'react-lottie';
import loadingAnimation from './loading';

export default function Index(props) {
  const styles = useStyles();
  const { show } = props;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Popover
      id={'success-campaign'}
      open={show}
      //   anchorEl={isVisible ? isVisible.sessionId : null}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      onClose={close}
      className={styles.ctnPopover}
      style={{ '&::WebkitScrollbar': { display: 'none' } }}
    >
    <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        overflow={'hidden'}
        className={styles.tr}
        style={{ '&::WebkitScrollbar': { display: 'none' } }}
      >
      <Typography color={'#fff'} position={'absolute'} zIndex={20000} variant={'body2'} bottom={38} fontSize={20} fontWeight={'bold'}left={'44%'}>
        20%
      </Typography>
      <Lottie options={defaultOptions} height={230} width={330} style={{ background: 'rgba(255,255,255,0.0)' }} />
      </Box>
    </Popover>
  );
}
