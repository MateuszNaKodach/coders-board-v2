import {
  SpaceProps as SystemSpaceProps,
  ColorProps as SystemColorProps,
  LayoutProps as SystemLayoutProps,
  TypographyProps as SystemTypographyProps,
  FlexboxProps as SystemFlexboxProps,
  BorderProps as SystemBorderProps,
  BackgroundProps as SystemBackgroundProps,
  PositionProps as SystemPositionProps,
  GridProps as SystemGridProps,
  ShadowProps as SystemShadowProps,
} from 'styled-system';

export type Theme = typeof import('./theme').theme;

export type ThemeColorKey =
  | 'primary.dark'
  | 'primary.main'
  | 'primary.light'
  | 'primary.border'
  | 'primary.background'
  | 'info.dark'
  | 'info.main'
  | 'info.light'
  | 'info.border'
  | 'info.background'
  | 'success.dark'
  | 'success.main'
  | 'success.light'
  | 'success.border'
  | 'success.background'
  | 'warning.dark'
  | 'warning.main'
  | 'warning.light'
  | 'warning.border'
  | 'warning.background'
  | 'error.dark'
  | 'error.main'
  | 'error.light'
  | 'error.border'
  | 'error.background'
  | 'background.base'
  | 'background.light'
  | 'background.body'
  | 'background.component'
  | 'border.base'
  | 'border.split'
  | 'text.title'
  | 'text.primary'
  | 'text.secondary'
  | 'text.disabled'
  | 'text.white'
  | 'common.white'
  | 'common.black';

export type SpaceProps = SystemSpaceProps<Theme>;
export type ColorProps = SystemColorProps<Theme, ThemeColorKey>;
export type LayoutProps = SystemLayoutProps<Theme>;
export type TypographyProps = SystemTypographyProps<Theme>;
export type FlexboxProps = SystemFlexboxProps<Theme>;
export type BorderProps = SystemBorderProps<Theme>;
export type BackgroundProps = SystemBackgroundProps<Theme>;
export type PositionProps = SystemPositionProps<Theme>;
export type GridProps = SystemGridProps<Theme>;
export type ShadowProps = SystemShadowProps<Theme>;
