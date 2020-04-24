import React from 'react';

import {
  CloudServerOutlined,
  ClusterOutlined,
  DashboardOutlined,
  ProjectOutlined,
  TeamOutlined,
} from '@ant-design/icons';

import { Layout, Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router';

import { ReactComponent as Logo } from 'static/logo.svg';

export interface UserSidebarProps extends RouteComponentProps {
  onCollapse: (collapsed: boolean) => void;
}

const StyledSider = styled(Layout.Sider).attrs({
  breakpoint: 'lg',
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

const UserSidebar = ({ location, onCollapse, history }: UserSidebarProps) => {
  const key = location.pathname.split('/')[1];

  const handleClick = (e: ClickParam) => {
    history.push(`/${e.key}`);
  };

  return (
    <StyledSider onCollapse={onCollapse}>
      <LogoWrapper>
        <StyledLogo />
      </LogoWrapper>
      <Menu theme="dark" mode="inline" selectedKeys={[key]} onClick={handleClick}>
        <Menu.Item key="dashboard">
          <DashboardOutlined />
          <span>Panel glówny</span>
        </Menu.Item>
        <Menu.Item key="projects">
          <ProjectOutlined />
          <span>Projekty</span>
        </Menu.Item>
        <Menu.Item key="users">
          <TeamOutlined />
          <span>Członkowie</span>
        </Menu.Item>
        <Menu.Item key="materials">
          <CloudServerOutlined />
          <span>Materiały</span>
        </Menu.Item>
        <Menu.Item key="roles">
          <ClusterOutlined />
          <span>Role</span>
        </Menu.Item>
      </Menu>
    </StyledSider>
  );
};

export default withRouter(UserSidebar);
