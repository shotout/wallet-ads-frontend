export const eventTrack = (eventName) => {
  if (window && window._paq) {
    console.log(eventName);
    window._paq.push(['trackEvent', eventName]);
  }
};

export const loadPageTracker = (payload) => {
  if (window && window._paq) {
    console.log(payload);
    window._paq.push(['setDocumentTitle', payload.title]);
    window._paq.push(['trackPageView']);
  }
};
