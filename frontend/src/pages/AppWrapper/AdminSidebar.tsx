import React from 'react';
import { LockOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router';

import { ReactComponent as Logo } from 'static/logo.svg';

export interface AdminSidebarProps extends RouteComponentProps {
  onCollapse: (collapsed: boolean) => void;
}

const StyledSider = styled(Layout.Sider).attrs({
  breakpoint: 'md',
  collapsedWidth: '0',
})`
  position: fixed;
  height: 100vh;
  z-index: 2;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 64px;
`;

const StyledLogo = styled(Logo)`
  height: 32px;
  width: 160px;
`;

const AdminSidebar = ({ location, onCollapse, history }: AdminSidebarProps) => {
  const key = location.pathname.split('/')[2];

  const handleClick = (e: ClickParam) => {
    history.push(`/admin/${e.key}`);
  };

  return (
    <StyledSider onCollapse={onCollapse}>
      <LogoWrapper>
        <StyledLogo />
      </LogoWrapper>
      <Menu theme="dark" mode="inline" selectedKeys={[key]} onClick={handleClick}>
        <Menu.Item key="credentials">
          <LockOutlined />
          <span>Dostępy</span>
        </Menu.Item>
      </Menu>
    </StyledSider>
  );
};

export default withRouter(AdminSidebar);
