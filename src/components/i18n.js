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
        ModalTitle: "Advanced Cookie Settings",
        EssentialTitle: "Essential Cookies",
        EssentialDesc: "These cookies enable core functionality such as security, verification of identity and network management. These cookies can’t be disabled.",
        MarketingTitle: "Enable Marketing Cookies",
        MarketingDesc: "These cookies are used to track advertising effectiveness to provide a more relevant service and deliver better ads to suit your interests.",
        FunctionalityTitle: "Enable Functional Cookies",
        FunctionalityDesc: "These cookies collect data to remember choices users make to improve and give a more personalised experience.",
        AnalyticTitle: "Enable Analytics Cookies",
        AnalyticDesc: "These cookies help us to understand how visitors interact with our website, discover errors and provide a better overall analytics.",
        SaveChanges: "Save Changes"
      },
    },
    de: {
      translations: {
        CookieConsentText:
          'Wir verwenden Cookies und ähnliche Technologien, um Dienste und Funktionen auf unserer Website zu ermöglichen und Ihre Interaktion mit unserer Website zu verstehen. Indem Sie auf Akzeptieren klicken, erklären Sie sich damit einverstanden, dass wir solche Technologien für Marketing und Analysen verwenden.',
        Accept: 'Akzeptieren',
        PrivacyPolicy: 'Datenschutzerklärung anzeigen',
        CookieSettings: 'Cookie Einstellungen',
        ModalTitle: "Erweiterte Cookie Einstellungen",
        EssentialTitle: "Essenzielle Cookies",
        EssentialDesc: "Diese Cookies ermöglichen Kernfunktionen wie Sicherheit, Identitätsprüfung und Netzwerkverwaltung. Diese Cookies können nicht deaktiviert werden.",
        MarketingTitle: "Marketing-Cookies aktivieren",
        MarketingDesc: "Diese Cookies werden verwendet, um die Werbewirksamkeit zu verfolgen, um einen relevanteren Service bereitzustellen und bessere Anzeigen zu liefern, die Ihren Interessen entsprechen.",
        FunctionalityTitle: "Funktionale Cookies aktivieren",
        FunctionalityDesc: "Diese Cookies sammeln Daten, um sich an Entscheidungen zu erinnern, die Benutzer treffen, um sie zu verbessern und ein personalisierteres Erlebnis zu bieten.",
        AnalyticTitle: "Analytics-Cookies aktivieren",
        AnalyticDesc: "Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren, Fehler zu entdecken und eine bessere Gesamtanalyse bereitzustellen.",
        SaveChanges: "Speichern"
      },
    }
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
