import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import he from './he.json';
import en from './en.json';
import de from './de.json';

i18n.use(initReactI18next).init({
  resources: {
    he: { translation: he },
    en: { translation: en },
    de: { translation: de }
  },
  lng: 'he',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

// Set initial direction
document.documentElement.lang = 'he';
document.documentElement.dir = 'rtl';

// Listen for language changes to update dir/lang
i18n.on('languageChanged', (lng) => {
  const isRtl = lng === 'he';
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
});

export default i18n;
