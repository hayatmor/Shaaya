import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import he from './he.json';
import en from './en.json';
import de from './de.json';

const SUPPORTED = ['he', 'en', 'de'];

// Saved choice > browser language > Hebrew
const detectLanguage = () => {
  try {
    const saved = localStorage.getItem('shaaya-lang');
    if (SUPPORTED.includes(saved)) return saved;
  } catch { /* localStorage unavailable */ }
  const browser = (navigator.language || '').slice(0, 2).toLowerCase();
  return SUPPORTED.includes(browser) ? browser : 'he';
};

const initialLang = detectLanguage();

i18n.use(initReactI18next).init({
  resources: {
    he: { translation: he },
    en: { translation: en },
    de: { translation: de }
  },
  lng: initialLang,
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

// Set initial direction
document.documentElement.lang = initialLang;
document.documentElement.dir = initialLang === 'he' ? 'rtl' : 'ltr';

// Listen for language changes to update dir/lang and persist the choice
i18n.on('languageChanged', (lng) => {
  const isRtl = lng === 'he';
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
  try {
    localStorage.setItem('shaaya-lang', lng);
  } catch { /* localStorage unavailable */ }
});

export default i18n;
