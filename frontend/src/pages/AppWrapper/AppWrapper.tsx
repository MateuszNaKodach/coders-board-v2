import React, { useState, ReactNode } from 'react';
import { Layout } from 'antd';
import { Redirect, withRouter } from 'react-router-dom';
import { RouteChildrenProps } from 'react-router';
import styled, { css } from 'styled-components';
import { down } from 'styled-breakpoints';
import { useMe } from 'hooks';
import AdminSidebar from './AdminSidebar';
import UserSidebar from './UserSidebar';
import Header from './Header';

export interface AppWrapperProps extends RouteChildrenProps {
  children?: ReactNode;
}

const StyledAppWrapper = styled(Layout)`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;

  ${down('md')} {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      transition: opacity 0.3s ease-out;
      ${({ hasSider }) => css`
        /* background-color: rgba(0, 0, 0, 0.8); */
        visibility: ${hasSider ? 'visible' : 'hidden'};
        opacity: ${hasSider ? 1 : 0};
      `}
    }
  }
`;

const Content = styled.main`
  margin: 64px 0 0 200px;
  padding: 32px;

  ${down('md')} {
    margin-left: 0;
  }

  ${down('xs')} {
    padding: 24px;
  }
`;

const AppWrapper = ({ children, location }: AppWrapperProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const me = useMe();

  if (!me) {
    return <Redirect to="/sign-in" />;
  }

  const isAdminView = location.pathname.includes('admin');
  const Sidebar = isAdminView ? AdminSidebar : UserSidebar;

  return (
    <StyledAppWrapper hasSider={!isCollapsed}>
      <Sidebar onCollapse={(collapsed) => setIsCollapsed(collapsed)} />
      <Layout>
        <Header />
        <Content>{children}</Content>
      </Layout>
    </StyledAppWrapper>
  );
};

AppWrapper.whyDidYouRender = true;

export default withRouter(AppWrapper);
