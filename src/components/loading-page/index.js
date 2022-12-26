import React from 'react';
import { Grid, Popover, Typography, Box } from '@mui/material';
import useStyles from './styles';
import Lottie from 'react-lottie';
import loadingAnimation from './loading';

export default function Index(props) {
  const styles = useStyles();
  const { show } = props;
  const [initLoad, setInitLoad] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      if (show) {
        setInitLoad(100);
      } else {
        if (initLoad < 90) {
          setInitLoad(Number(initLoad) + 10);
        }
      }
    }, 1000);
  }, [initLoad]);

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
      // open={true}
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
      style={{ '&::WebkitScrollbar': { display: 'none', overflow: 'hidden' } }}
    >
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        overflow={'hidden'}
        className={styles.tr}
        style={{ '&::WebkitScrollbar': { display: 'none', overflow: 'hidden' } }}
      >
        <Typography
          color={'#fff'}
          position={'absolute'}
          zIndex={20000}
          variant={'body2'}
          fontSize={20}
          fontWeight={'bold'}
          left={'44%'}
          marginTop={15}
        >
          {initLoad} %
        </Typography>
        <Lottie
          isClickToPauseDisabled={true}
          options={defaultOptions}
          height={230}
          width={330}
          style={{ background: 'rgba(255,255,255,0.0)' }}
        />
      </Box>
    </Popover>
  );
}
