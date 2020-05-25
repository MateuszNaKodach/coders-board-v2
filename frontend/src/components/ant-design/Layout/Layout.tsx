import React from 'react';
import { compose, space, layout, flexbox } from 'styled-system';
import { Layout as AntLayoute } from 'antd';
import { LayoutProps as AntLayoutProps, SiderProps as AntSiderProps } from 'antd/lib/layout';
import 'antd/lib/layout/style/css';
import { styled, SpaceProps, LayoutProps as StyledSystemLayoutProps, FlexboxProps } from '@services/theme';

export type LayoutProps = AntLayoutProps & SpaceProps & StyledSystemLayoutProps & FlexboxProps;
export type SiderProps = Omit<AntSiderProps, 'theme'> & LayoutProps;

const styledSystem = compose(space, layout, flexbox);

const StyledLayout = styled(AntLayoute)(styledSystem);
const StyledLayouteHeader = styled(AntLayoute.Header)(styledSystem);
const StyledLayouteContent = styled(AntLayoute.Content)(styledSystem);
const StyledLayouteFooter = styled(AntLayoute.Footer)(styledSystem);

export const Layout = (props: LayoutProps) => <StyledLayout {...props} />;

Layout.Header = (props: LayoutProps) => <StyledLayouteHeader {...props} />;
Layout.Content = (props: LayoutProps) => <StyledLayouteContent {...props} />;
Layout.Footer = (props: LayoutProps) => <StyledLayouteFooter {...props} />;
Layout.Sider = styled(AntLayoute.Sider)<SiderProps>(styledSystem);
