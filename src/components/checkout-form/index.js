import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import useStyles from './styles';
import SuccessAddCampaign from '../../components/success-add-campaign';
import { routes } from '../../helpers/routes';

const SetupForm = (e) => {
  const styles = useStyles();
  const stripe = useStripe();
  const elements = useElements();
  const baseUrl = window.location.origin;
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showModalSuccess, setModalSuccess] = useState(true);

  const handleSubmit = async (event) => {
    setModalSuccess(false);
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button className={`${styles.ctnBtn}`} disabled={isLoading}>
        {isLoading ? 'Loading' : 'Save'}
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default SetupForm;
