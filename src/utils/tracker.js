export const eventTrack = (eventName) => {
  if (window && window._paq) {
    window._paq.push(['trackEvent', 'Link Clicked', 'click', eventName]);
  }
};

export const loadPageTracker = (payload) => {
  if (window && window._paq) {
    console.log(payload);
    window._paq.push(['setDocumentTitle', payload.title]);
    window._paq.push(['trackPageView']);
  }
};

export const setUserID = (payload) => {
  if (window && window._paq) {
    console.log(payload);
    window._paq.push(['setUserId', payload.email]);
  }
};

export const trackGoal = (payload) => {
  if (window && window._paq) {
    window._paq.push(['trackGoal', 'Login']);
  }
};
