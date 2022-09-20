import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: {
      translations: {
        CookieConsentText:
          'We use cookies and similar technologies to enable services and functionality on our site and to understand your interaction with our service By clicking on accept, you agree to our use of such technologies for marketing and analytic.',
        Accept: 'Accept',
        PrivacyPolicy: 'See Privacy Policy',
        CookieSettings: 'Cookie Settings',
      },
    },
    de: {
      translations: {
        CookieConsentText:
          'Wir verwenden Cookies und ähnliche Technologien, um Dienste und Funktionen auf unserer Website zu ermöglichen und Ihre Interaktion mit unserer Website zu verstehen. Indem Sie auf Akzeptieren klicken, erklären Sie sich damit einverstanden, dass wir solche Technologien für Marketing und Analysen verwenden.',
        Accept: 'Akzeptieren',
        PrivacyPolicy: 'Datenschutzerklärung anzeigen',
        CookieSettings: 'Cookie Einstellungen',
      },
    },
    id: {
      translations: {
        CookieConsentText:
          'Kami menggunakan cookie dan teknologi serupa untuk mengaktifkan layanan dan fungsionalitas di situs kami dan untuk memahami interaksi Anda dengan layanan kami. Dengan mengklik terima, Anda menyetujui penggunaan kami atas teknologi tersebut untuk pemasaran dan analitik.',
        Accept: 'Terima',
        PrivacyPolicy: 'Lihat Privacy Policy',
        CookieSettings: 'Pengaturan Cookie',
      },
    },
  },
  fallbackLng: 'de',

  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ',',
  },

  react: {
    wait: true,
  },
});

export default i18n;
