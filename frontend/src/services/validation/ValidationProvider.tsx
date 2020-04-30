import React, { createContext } from 'react';
import * as yup from 'yup';
import { FC } from '@typings/components';
import { Translations } from '@generated/translations';
import { useTranslation } from '../translation';

export const ValidationContext = createContext({ yup });

export const ValidationProvider: FC = ({ children }) => {
  const { t } = useTranslation('validation');

  const getMessage = (ruleName: Translations['validation'], count?: number) => (
    params: Partial<yup.TestMessageParams>,
  ): string => t(ruleName, { count }).replace('$path', params.label || t('This field'));

  yup.setLocale({
    mixed: {
      default: getMessage('default'),
      required: getMessage('required'),
      oneOf: (params) => getMessage('oneOf')(params).replace('$values', String(params.values)),
      notOneOf: (params) => getMessage('notOneOf')(params).replace('$values', String(params.values)),
    },
    string: {
      length: (params) => getMessage('length', params.length)(params).replace('$length', String(params.length)),
      min: (params) => getMessage('minStr', params.min)(params).replace('$min', String(params.min)),
      max: (params) => getMessage('maxStr', params.max)(params).replace('$max', String(params.max)),
      matches: (params) => getMessage('matches')(params).replace('$regex', String(params.regex)),
      email: getMessage('email'),
      url: getMessage('url'),
      trim: getMessage('trim'),
      lowercase: getMessage('lowercase'),
      uppercase: getMessage('uppercase'),
    },
    number: {
      min: (params) => getMessage('minNum')(params).replace('$min', String(params.min)),
      max: (params) => getMessage('maxNum')(params).replace('$max', String(params.max)),
      lessThan: (params) => getMessage('lessThan')(params).replace('$less', String(params.less)),
      moreThan: (params) => getMessage('moreThan')(params).replace('$more', String(params.more)),
      positive: getMessage('positive'),
      negative: getMessage('negative'),
      integer: getMessage('integer'),
    },
    date: {
      min: (params) => getMessage('minDate')(params).replace('$min', String(params.min)),
      max: (params) => getMessage('maxDate')(params).replace('$max', String(params.max)),
    },
    object: {
      noUnknown: getMessage('noUnknown'),
    },
    array: {
      min: (params) => getMessage('minArr')(params).replace('$min', String(params.min)),
      max: (params) => getMessage('maxArr')(params).replace('$max', String(params.max)),
    },
  });

  return <ValidationContext.Provider value={{ yup }}>{children}</ValidationContext.Provider>;
};
