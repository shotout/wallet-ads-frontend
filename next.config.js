const { i18n } = require('./next-i18next.config');

module.exports = {
  env: {
    API_URL: process.env.API_URL,
    BACKEND_URL: process.env.BACKEND_URL,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
  },
  experimental: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  i18n,
};
