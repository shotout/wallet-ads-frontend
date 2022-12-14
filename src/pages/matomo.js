import { getUserData } from '../helpers/auth';

export default function initMamoto() {
  // if (typeof window !== 'undefined') {
  //   const userDatas = getUserData();
  //   var _paq = (window._paq = window._paq || []);
  //   /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  //   _paq.push(['setUserId', userDatas ? userDatas.data?.email : null]);
  //   _paq.push(['trackPageView']);
  //   _paq.push(['enableLinkTracking']);
  //   (function () {
  //     var u = '//matomo.walletads.io/';
  //     _paq.push(['setTrackerUrl', u + 'matomo.php']);
  //     _paq.push(['setSiteId', '1']);
  //     var d = document,
  //       g = d.createElement('script'),
  //       s = d.getElementsByTagName('script')[0];
  //     g.async = true;
  //     g.src = u + 'matomo.js';
  //     s.parentNode.insertBefore(g, s);
  //   })();
  // }
}
