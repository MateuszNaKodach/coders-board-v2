import React, { ComponentProps } from 'react';
import clsx from 'clsx';
import AntTypography from 'antd/lib/typography';
import 'antd/lib/typography/style/css';
import { space, layout, compose, typography, color } from 'styled-system';
import { styled, ColorProps, LayoutProps, SpaceProps, TypographyProps } from '@services/theme';

type StyledSystemProps = SpaceProps & LayoutProps & TypographyProps & ColorProps;

type WithTextSize = {
  small?: boolean;
  large?: boolean;
};

type TitleProps = ComponentProps<typeof AntTypography.Title> & StyledSystemProps;

type ParagraphProps = ComponentProps<typeof AntTypography.Paragraph> & StyledSystemProps & WithTextSize;

type TextProps = ComponentProps<typeof AntTypography.Text> & StyledSystemProps & WithTextSize;

const styledSystem = compose(space, layout, typography, color);

export const Title = styled(AntTypography.Title)<TitleProps>((props) => {
  const { theme } = props;
  const { fontSizes, lineHeights, fontWeights, fonts } = theme;

  const shared = {
    marginBottom: 'unset',
    marginTop: 'unset',
    color: theme.colors.text.title,
    ...styledSystem(props),
  };

  return {
    '&.ant-typography': {
      fontFamily: fonts.main,

      'h1&': {
        ...shared,
        fontSize: fontSizes.h1,
        lineHeight: lineHeights.h1,
        fontWeight: fontWeights.bold,
      },

      'h2&': {
        ...shared,
        fontSize: fontSizes.h2,
        lineHeight: lineHeights.h2,
        fontWeight: fontWeights.bold,
      },

      'h3&': {
        ...shared,
        fontSize: fontSizes.h3,
        lineHeight: lineHeights.h3,
        fontWeight: fontWeights.bold,
      },

      'h4&': {
        ...shared,
        fontSize: fontSizes.h4,
        lineHeight: lineHeights.h4,
        fontWeight: fontWeights.bold,
      },
    },
  };
});

const StyledText = styled(AntTypography.Text)<Omit<TextProps, 'small'>>((props) => {
  const { theme } = props;
  const { fontSizes, lineHeights, fontWeights, fonts } = theme;

  return {
    ...styledSystem(props),
    fontFamily: fonts.main,
    fontSize: fontSizes.normal,
    lineHeight: lineHeights.normal,
    fontWeight: fontWeights.normal,

    '&.small': {
      fontSize: fontSizes.small,
      lineHeight: lineHeights.small,
    },

    '&.large': {
      fontSize: fontSizes.large,
      lineHeight: lineHeights.large,
    },
  };
});

export const Text = ({ small, large, ...props }: TextProps) => {
  const className = clsx(props.className, { small }, { large });

  return <StyledText {...props} className={className} />;
};

const StyledParagraph = styled(AntTypography.Paragraph)<Omit<ParagraphProps, 'small'>>((props) => {
  const { theme } = props;
  const { fontSizes, lineHeights, fontWeights, fonts } = theme;

  return {
    fontFamily: fonts.main,
    fontSize: fontSizes.normal,
    lineHeight: lineHeights.normal,
    fontWeight: fontWeights.normal,

    '&.ant-typography': {
      marginBottom: 'unset',
      ...styledSystem(props),
    },

    '&.small': {
      fontSize: fontSizes.small,
      lineHeight: lineHeights.small,
    },

    '&.large': {
      fontSize: fontSizes.large,
      lineHeight: lineHeights.large,
    },

    '.ant-typography-expand, .ant-typography-edit, .ant-typography-copy': {
      color: theme.colors.primary.main,
    },
  };
});

export const Paragraph = ({ small, large, ...props }: ParagraphProps) => {
  const className = clsx(props.className, { small }, { large });

  return <StyledParagraph {...props} className={className} />;
};
