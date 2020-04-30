/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import emotionStyled, {
  StyledOptions,
  CreateStyledComponentExtrinsic,
  CreateStyledComponentBase,
} from '@emotion/styled';
import {
  compose,
  space,
  typography,
  color,
  layout,
  flexbox,
  border,
  background,
  position,
  grid,
  shadow,
} from 'styled-system';
import { Theme } from './types';

type JSXInEl = JSX.IntrinsicElements;

type Options = StyledOptions & { preserve?: string[] };

interface CreateStyled<Theme extends object = any> {
  <Tag extends React.ComponentType<any>, ExtraProps = {}>(tag: Tag, options?: Options): CreateStyledComponentExtrinsic<
    Tag,
    ExtraProps,
    Theme
  >;

  <Tag extends keyof JSXInEl, ExtraProps = {}>(tag: Tag, options?: Options): CreateStyledComponentBase<
    Omit<JSXInEl[Tag], 'color'>,
    ExtraProps,
    Theme
  >;
}

const all = compose(space, typography, color, layout, flexbox, border, background, position, grid, shadow);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const systemProps = new RegExp(`^(${all.propNames!.join('|')})$`);

const shouldForwardProp = (preserve: string[] = []) => (prop: string) =>
  preserve.includes(prop) || !systemProps.test(prop);

export const styled: CreateStyled<Theme> = (
  tag: React.ComponentType<any> | keyof JSXInEl,
  { preserve, ...options }: Options = {},
) => {
  const config = { shouldForwardProp: shouldForwardProp(preserve), ...options };

  return typeof tag === 'string' ? emotionStyled(tag, config) : emotionStyled(tag, config);
};
