import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuthorizationHeader } from '../helpers/auth';
import { routes } from '../helpers/routes';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname == '/') {
      if (getAuthorizationHeader() && getAuthorizationHeader().Authorization) {
        router.push(routes.createCampaign);
      } else {
        router.push(routes.login);
      }
    }
  });

  return null;
}
