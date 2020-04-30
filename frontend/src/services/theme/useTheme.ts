import { useTheme as useEmotionTheme } from 'emotion-theming';
import { Theme } from './types';

export const useTheme = (): Theme => useEmotionTheme();
