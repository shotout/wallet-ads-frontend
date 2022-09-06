import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuthorizationHeader } from '../helpers/auth';


export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname == '/') {
      if(getAuthorizationHeader().Authorization){
        router.push('/dashboard/add-campaign');  
      }else{
        router.push('/login');
      }
    }
  });

  return null;
}
