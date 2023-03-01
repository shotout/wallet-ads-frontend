import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import useStyles from './styles';
import SuccessAddCampaign from '../../components/success-add-campaign';
import { routes } from '../../helpers/routes';
import { useRouter } from 'next/router';

const SetupForm = (e) => {
  const styles = useStyles();
  const stripe = useStripe();
  const elements = useElements();
  const baseUrl = window.location.origin;
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showModalSuccess, setModalSuccess] = useState(true);

  const router = useRouter();

  const handleSubmit = async (event) => {
    if (router.route == '/settings') {
      setIsLoading(!isLoading);
      // We don't want to let default form submission happen here,
      // which would refresh the page.
      event.preventDefault();

      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }

      const { error } = await stripe.confirmSetup({
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url: `${baseUrl}/settings`,
        },
      });

      if (error) {
        setIsLoading(false);
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Show error to your customer (for example, payment
        // details incomplete)
        setErrorMessage(error.message);
      } else {
        setIsLoading(false);
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
    } else {
      setIsLoading(!isLoading);
      // We don't want to let default form submission happen here,
      // which would refresh the page.ß
      event.preventDefault();

      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }

      const { error } = await stripe.confirmSetup({
        //`Elements` instance that was used to create the Payment Element
        elements,
        redirect: 'if_required',
        confirmParams: {
          // return_url: `${baseUrl}/settings`,
        },
      });

      if (error) {
        setIsLoading(false);
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Show error to your customer (for example, payment
        // details incomplete)
        setErrorMessage(error.message);
      } else {
        pay();
        //  Your customer will be redirected to your `return_url`. For some payment
        //  methods like iDEAL, your customer will be redirected to an intermediate
        //  site first to authorize the payment, then redirected to the `return_url`.
      }
    }
  };

  const pay = async () => {
    try {
      await e.payStripe();
      setIsLoading(false);
      setModalSuccess(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      {showModalSuccess ? (
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <Grid
            item
            sm={12}
            md={12}
            xs={12}
            width={e && e.addCard ? '50%' : null}
            marginLeft={e && e.addCard ? '25%' : null}
            marginTop={e && e.addCard ? 2 : null}
          >
            <button className={`${styles.ctnBtn}`} disabled={isLoading}>
              {isLoading ? 'Loading' : e && e.addCard ? 'Save Card & Pay' : 'Save'}
            </button>
          </Grid>
          {/* Show error message to your customers */}
          {errorMessage && <div>{errorMessage}</div>}
        </form>
      ) : (
        <SuccessAddCampaign
          isVisible={true}
          handleHoverClose={() => {
            window.location.href = routes.createCampaign;
          }}
        />
      )}
    </div>
  );
};

export default SetupForm;
