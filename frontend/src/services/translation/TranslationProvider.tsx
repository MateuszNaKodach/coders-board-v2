import React, { useEffect, memo } from 'react';
import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import { I18nextProvider } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { useEffectOnce } from 'react-use';
import { FC } from '@typings/components';
import { useKeySequence } from '@hooks/useKeySequence';
import { translationFiles } from '@generated/translationFiles';

type Language = 'pl' | 'en';

export type TranslationProviderProps = {
  language?: Language;
};

export const PureTranslationProvider: FC<TranslationProviderProps> = memo(
  ({ children, language }) => {
    useKeySequence('langg', () => {
      const newLang = i18n.language === 'pl' ? 'en' : 'pl';

      i18n.loadLanguages(newLang, () => {
        i18n.changeLanguage(newLang);
      });
    });

    useEffectOnce(() => {
      i18n
        .use(XHR)
        .use(LanguageDetector)
        .init({
          lng: language,
          fallbackLng: 'en',
          load: 'languageOnly',
          whitelist: ['pl', 'en'],
          ns: translationFiles,
          interpolation: {
            escapeValue: false,
          },
        });
    });

    useEffect(() => {
      if (language && i18n.languages && language !== i18n.languages[0]) {
        i18n.loadLanguages(language, () => {
          i18n.changeLanguage(language);
        });
      }
    }, [language]);

    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
  },
  (prevProps, nextProps) => prevProps.language === nextProps.language || !nextProps.language,
);

export const TranslationProvider: FC = ({ children }) => {
  return <PureTranslationProvider>{children}</PureTranslationProvider>;
};
