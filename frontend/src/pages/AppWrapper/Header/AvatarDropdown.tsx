import React from 'react';
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Menu, Dropdown } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import styled from 'styled-components';
import { useAuth } from 'hooks';
import { withRouter, RouteChildrenProps } from 'react-router';
import { History } from 'history';
import { MutationFunction } from '@apollo/react-common';
import { SignOutMutation, SignOutMutationVariables } from 'generated/graphql';

interface AvatarDropdownProps {
  history: History<History.LocationState>;
  image: string;
  name: string;
  signOut: MutationFunction<SignOutMutation, SignOutMutationVariables>;
}

const DropdownContent = styled.div`
  padding: 0 12px;
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;
  transition: color 0.3s ease-out, background-color 0.3s ease-out;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.slight};
  }

  .ant-avatar {
    margin-right: 12px;
  }
`;

const AvatarDropdown = ({ name, image, signOut, history }: AvatarDropdownProps) => {
  const handleMenuClick = ({ key }: ClickParam) => {
    if (key === 'signout') {
      signOut();
    }

    if (key === 'settings') {
      history.push('/settings');
    }
  };

  const menuHeaderDropdown = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="settings">
        <SettingOutlined />
        Ustawienia profilu
      </Menu.Item>
      <div className="ant-dropdown-menu-item-divider" />
      <Menu.Item key="signout">
        <LogoutOutlined />
        Wyloguj się
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown trigger={['click']} overlay={menuHeaderDropdown} className="AvatarDropdown">
      <DropdownContent>
        <Avatar src={image} alt={name} />
        <span>{name}</span>
      </DropdownContent>
    </Dropdown>
  );
};

AvatarDropdown.whyDidYouRender = true;

const MemorizedAvatarDropdown = React.memo(AvatarDropdown, (pp, np) => pp.image === np.image || pp.name === np.name);
MemorizedAvatarDropdown.displayName = 'AvatarDropdown';

const AvatarDropdownContainer = ({ history }: RouteChildrenProps) => {
  const { data, signOut } = useAuth();
  const { image, name } = data!.me!;

  return <MemorizedAvatarDropdown image={image} name={name} signOut={signOut} history={history} />;
};

export default withRouter(AvatarDropdownContainer);
