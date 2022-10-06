import { useEffect, useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import { useRouter } from 'next/router';

export default function Index() {
  const stripe = useStripe();
  const router = useRouter();
  const [q, setQ] = useState(null);

  useEffect(() => {
    console.log(router.query);
    const params = router.query;
    setQ(params);
    renderCheckOut(params);
  }, [q]);

  const renderCheckOut = (params) => {
    console.log(params.promo);
    console.log(params.sessionId);
    stripe.redirectToCheckout({
      promo: params?.promo,
      sessionId: params?.sessionId,
    });
  };

  return <div>index</div>;
}
