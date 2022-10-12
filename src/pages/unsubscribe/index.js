import { TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import DefaultButton from '../../components/default-button';
import Page from '../../components/Page';
import useStyles from './styles';
import { handleSubscribe } from '../../utils/requests';
import responseValidatorObj from '../../helpers/responseValidatorObj';
import AuthFooter from '../../components/auth-footer';
import { eventTrack } from '../../utils/tracker';
import CheckboxAds from '../../components/checkbox';
// Connect to web3 modal
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import WalletConnect from '@walletconnect/web3-provider';

const successImg = '/assets/unsubscribe.png';
const appIcon = '/assets/svg/wallet_logo.svg';

const defaultState = {
  walletAddres: null,
  snooze: '',
  unsubscribe: '',
  subscribe: '',
};

const defaultError = {
  snooze: null,
  unsubscribe: null,
  subscribe: null,
};

const defaultLoading = {
  snooze: false,
  unsubscribe: false,
  subscribe: false,
};

const INFURA_KEY = '480d26c0ec27437bbe760661545cbc31';

export const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: 'Web 3 Modal Demo',
      infuraId: INFURA_KEY,
    },
  },
  walletconnect: {
    package: WalletConnect,
    options: {
      infuraId: INFURA_KEY,
    },
  },
};

export default function Register() {
  const styles = useStyles();
  const [values, setValues] = useState(defaultState);
  const [errorMessage, setErrorMessage] = useState(defaultError);
  const [isLoading, setLoading] = useState(false);
  const [checkList, setChecklist] = useState({
    snooze: false,
    subscribe: false,
  });
  // const [web3Modal, setWeb3Modal] = useState(null);
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [network, setNetwork] = useState();
  const [loading, setIsLoading] = useState(defaultLoading);
  const [successSubmit, setSuccesSubmit] = useState(false);

  const web3Modal = new Web3Modal({
    cacheProvider: true, // very important
    network: 'mainnet',
    providerOptions,
  });

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      console.log(accounts[0]);
      if (accounts) setValues({ ...values, walletAddres: accounts[0] });
      setNetwork(network);
      return { status: true, walletAddr: accounts[0] };
    } catch (error) {
      // user close modal
    }
  };

  const handleChange = (prop) => (event) => {
    console.log(prop);
    if (errorMessage[prop]?.length > 0) {
      setErrorMessage({
        ...errorMessage,
        [prop]: '',
      });
    }
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async (prop) => {
    try {
      if (values[prop] === '') {
        setErrorMessage({
          ...errorMessage,
          [prop]: 'This field cannot be empty',
        });
        return;
      }
      const connectToWallet = await connectWallet();
      if (connectToWallet.status) {
        setIsLoading({ ...loading, [prop]: true });
        setValues({ ...values, [prop]: connectToWallet.walletAddr });
        const body = {
          _method: 'PATCH',
          flag: prop,
          wallet_address: connectToWallet.walletAddr,
          is_subscribe: prop === 'subscribe' ? true : false,
          snooze_ads: 30,
        };
        const response = await handleSubscribe(body);
        setSuccesSubmit(true);
      }
    } catch (err) {
      if (err.data) {
        if (err.data.errors) {
          setErrorMessage(responseValidatorObj(err.data.errors));
        }
      }
      setLoading(false);
    }
  };

  function renderHeader() {
    return (
      <div className={styles.ctnHeader}>
        <img src={appIcon} alt="wallet-ads" />
        {successSubmit ? '' : <span>Update your preferences or unsubscribe.</span>}
      </div>
    );
  }

  function renderSnoozeAds() {
    return (
      <div className={styles.ctnInput}>
        <Typography variant="h6" fontWeight={'700'} textAlign={'center'}>
          Snooze ads
        </Typography>
        <div className={styles.ctnTitle}>
          Don’t like the ad that you’re currently seeing? You can snooze ads now, just enter your Wallet Address.
        </div>
        <div className={styles.ctnForm}>
          <div className={styles.inputWrapper}>
            <TextField
              value={values.snooze}
              onChange={handleChange('snooze')}
              error={errorMessage.snooze}
              helperText={errorMessage.snooze}
              size="small"
              fullWidth
              placeholder="Your Wallet Address"
            />
          </div>
        </div>
        <div className={styles.checkBoxRoot}>
          <div onClick={() => setChecklist({ ...checkList, snooze: !checkList.snooze })}>
            <CheckboxAds isActive={checkList.snooze} />
          </div>
          <div className={styles.ctnSubTitle}>
            I confirm that I would like to snooze all advertisement activities and do not want to receive any special
            offers or information on exclusive projects.
          </div>
        </div>
        <DefaultButton
          onClick={() => handleSubmit('snooze')}
          eventName={'Snooze ads for 30 days'}
          isLoading={loading.snooze}
          ctnBtnStyle={styles.btnStyle}
          label={'Snooze ads for 30 days'}
          disabled={
            values.snooze === ''
              ? checkList.snooze === false
                ? true
                : false
              : values.snooze !== ''
              ? checkList.snooze === false
                ? true
                : false
              : false
          }
        />
      </div>
    );
  }

  function renderUnsubscribe() {
    return (
      <div className={styles.ctnInput} style={{ marginBottom: 100 }}>
        <Typography variant="h6" fontWeight={'700'} textAlign={'center'}>
          Unsubscribe from this advertiser
        </Typography>
        <div className={styles.ctnTitle2}>
          We're sad to see you go! You can enter your Wallet Address below if you really want to be excluded from all
          campaigns that are set up by this advertiser.
        </div>
        <div className={styles.ctnForm}>
          <div className={styles.inputWrapper}>
            <TextField
              value={values.unsubscribe}
              onChange={handleChange('unsubscribe')}
              error={errorMessage.unsubscribe}
              helperText={errorMessage.unsubscribe}
              size="small"
              fullWidth
              placeholder="Your Wallet Address"
            />
          </div>
        </div>

        <DefaultButton
          onClick={() => handleSubmit('unsubscribe')}
          eventName={'Unsubscribe'}
          isLoading={loading.unsubscribe}
          ctnBtnStyle={styles.btnStyle}
          disabled={values.unsubscribe === ''}
          label={'Unsubscribe'}
        />
        <div className={styles.line} />
        {renderSubscribe()}
      </div>
    );
  }

  function renderSubscribe() {
    return (
      <>
        <Typography variant="h6" fontWeight={'700'} textAlign={'center'}>
          Subscribe to WALLETADS
        </Typography>
        <div className={styles.ctnTitle2}>
          Enter your wallet address here to subscribe to WALLETADS and receive free airdrops, giveaways and much more!
        </div>
        <div className={styles.ctnForm}>
          <div className={styles.inputWrapper}>
            <TextField
              value={values.subscribe}
              onChange={handleChange('subscribe')}
              error={errorMessage.subscribe}
              helperText={errorMessage.subscribe}
              size="small"
              fullWidth
              placeholder="Your Wallet Address"
            />
          </div>
        </div>
        <div className={styles.checkBoxRoot}>
          <div onClick={() => setChecklist({ ...checkList, subscribe: !checkList.subscribe })}>
            <CheckboxAds isActive={checkList.subscribe} />
          </div>
          <div>
            I confirm that I would like to subscribe to WALLETADS to receive special offers, information on exclusive
            projects and more.
          </div>
        </div>
        <>{values.subscribe === '' && checkList.subscribe === true}</>
        <DefaultButton
          onClick={() => handleSubmit('subscribe')}
          eventName={'Subscribe'}
          isLoading={loading.subscribe}
          ctnBtnStyle={styles.btnStyle}
          label={'Subscribe'}
          disabled={
            values.subscribe === ''
              ? !checkList.subscribe
                ? true
                : false
              : values.subscribe !== ''
              ? !checkList.subscribe
                ? true
                : false
              : false
          }
        />
      </>
    );
  }

  function renderSuccess() {
    return (
      <div className={styles.ctnInput2}>
        <img src={successImg} alt="success" />
        <span>Your preferences have successfully been updated.</span>
        <DefaultButton
          onClick={() => (window.location.href = '/')}
          eventName={'Subscribe / unsubscribe'}
          ctnBtnStyle={styles.btnStyle}
          label={'Ok'}
        />
      </div>
    );
  }

  return (
    <Page title="Unsubcribe">
      <meta name="description" content="Create your WALLETADS account now!" />
      <div className={styles.ctnRoot}>
        {renderHeader()}
        {successSubmit ? (
          renderSuccess()
        ) : (
          <>
            {renderSnoozeAds()}
            {renderUnsubscribe()}
          </>
        )}

        <AuthFooter />
      </div>
    </Page>
  );
}

export async function getServerSideProps(context) {
  const UA = context.req.headers['user-agent'];
  const isMobile = Boolean(UA.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
  if (isMobile) {
    return {
      redirect: {
        permanent: false,
        destination: `/forbidden`,
      },
    };
  }
  return {
    props: {}, // will be passed to the page component as props
  };
}
