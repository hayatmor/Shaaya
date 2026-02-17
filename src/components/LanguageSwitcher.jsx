import React from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'he', flag: '🇮🇱', label: 'עברית' },
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch' }
];

const LanguageSwitcher = ({ className = '' }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const handleChange = (code) => {
    i18n.changeLanguage(code);
  };

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleChange(lang.code)}
          className={`text-lg sm:text-xl leading-none min-w-[32px] min-h-[32px] flex items-center justify-center rounded-full transition-all duration-200 ${
            currentLang === lang.code
              ? 'bg-white/10 ring-1 ring-white/20 scale-110'
              : 'opacity-60 hover:opacity-100 hover:bg-white/5'
          }`}
          aria-label={lang.label}
          title={lang.label}
        >
          {lang.flag}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
