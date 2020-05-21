import { margin, layout, position, padding, display, flexbox, compose } from 'styled-system';
import { Card as AntCard } from 'antd';
import { CardProps as AntCardProps } from 'antd/lib/card';
import 'antd/lib/card/style/css';
import {
  styled,
  LayoutProps,
  PositionProps,
  MarginProps,
  PaddingProps,
  DisplayProps,
  FlexboxProps,
} from '@services/theme';

export type CardProps = AntCardProps &
  MarginProps &
  LayoutProps &
  PositionProps &
  PaddingProps &
  DisplayProps &
  FlexboxProps;

const styledSystemCard = compose(margin, layout, position);
const styledSystemCardBody = compose(padding, display, flexbox);

export const Card = styled(AntCard)<CardProps>((props) => {
  return {
    '&.ant-card': {
      ...styledSystemCard(props),
      display: 'block',
    },

    '.ant-card-body': {
      ...styledSystemCardBody(props),
    },
  };
});
