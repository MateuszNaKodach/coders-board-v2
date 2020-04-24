import React, { ReactNode } from 'react';
import { ApiOutlined, BarChartOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import styled, { css } from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router';

interface SettingsWrapperProps extends RouteComponentProps {
  children: ReactNode;
}

const MenuItem = Menu.Item;

const SettingsWrapperContainer = styled.div`
  display: flex;
  padding: 16px 0;
  border-radius: 4px;

  ${({ theme }) => css`
    border: 1px solid ${theme.colors.border};
    background-color: ${theme.colors.white};
  `}
`;

const StyledMenu = styled(Menu)`
  width: 216px;
`;

const Content = styled.div`
  padding: 8px 40px;
`;

const SettingsWrapper = ({ children, location, history }: SettingsWrapperProps) => {
  const key = location.pathname.split('/')[2];

  const handleClick = (e: ClickParam) => {
    history.push(`/settings/${e.key}`);
  };

  return (
    <SettingsWrapperContainer>
      <StyledMenu selectedKeys={[key]} onClick={handleClick}>
        <MenuItem key="profile">
          <InfoCircleOutlined />
          <span>Informacje podstawowe</span>
        </MenuItem>
        <MenuItem key="skills">
          <BarChartOutlined />
          <span>Umiejętności</span>
        </MenuItem>
        <MenuItem key="integrations">
          <ApiOutlined />
          <span>Integracje</span>
        </MenuItem>
      </StyledMenu>
      <Content>{children}</Content>
    </SettingsWrapperContainer>
  );
};

export default withRouter(SettingsWrapper);
