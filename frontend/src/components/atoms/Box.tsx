import {
  space,
  color,
  layout,
  border,
  typography,
  flexbox,
  shadow,
  grid,
  compose,
  position,
  background,
} from 'styled-system';
import {
  styled,
  SpaceProps,
  ColorProps,
  LayoutProps,
  BorderProps,
  TypographyProps,
  FlexboxProps,
  ShadowProps,
  GridProps,
} from '@services/theme';

export type BoxProps = SpaceProps &
  ColorProps &
  LayoutProps &
  BorderProps &
  TypographyProps &
  FlexboxProps &
  ShadowProps &
  GridProps;

export const Box = styled('div')<BoxProps>(
  compose(space, color, layout, border, typography, flexbox, shadow, grid, position, background),
);
