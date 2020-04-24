import React from 'react';
import styled from 'styled-components';
import { down } from 'styled-breakpoints';
import { Layout, Radio } from 'antd';
import { withRouter, RouteChildrenProps } from 'react-router';
import { RadioChangeEvent } from 'antd/lib/radio';
import { useHasPermissions, useOnlineStatus } from 'hooks';
import AvatarDropdown from './AvatarDropdown';

const StatusInfo = () => {
  const onlineStatus = useOnlineStatus();
  return (
    <div style={{ marginRight: '30px' }}>
      <h1 style={{ color: onlineStatus ? 'green' : 'red', margin: '0' }}>{onlineStatus ? 'Online' : 'Offline'}</h1>
    </div>
  );
};

export type HeaderProps = RouteChildrenProps;

const StyledHeader = styled(Layout.Header)`
  position: fixed;
  top: 0;
  left: 200px;
  right: 0;
  display: flex;
  align-items: center;
  padding: 0 24px;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 1;

  .ant-radio-group {
    margin-right: 32px;
  }

  > div:first-child {
    margin-left: auto;
  }

  ${down('md')} {
    left: 0;
  }
`;

const Header = ({ location, history }: HeaderProps) => {
  const hasPermissions = useHasPermissions(['OWNER', 'ADMIN']);
  const value = location.pathname.includes('admin') ? 'admin' : 'user';

  const handleChange = (e: RadioChangeEvent) => {
    if (e.target.value === 'user') {
      history.push('/dashboard');
    } else {
      history.push('/admin/dashboard');
    }
  };

  return (
    <StyledHeader>
      <StatusInfo />
      {hasPermissions && (
        <Radio.Group value={value} onChange={handleChange}>
          <Radio.Button value="user">Użytkownik</Radio.Button>
          <Radio.Button value="admin">Administrator</Radio.Button>
        </Radio.Group>
      )}
      <AvatarDropdown />
    </StyledHeader>
  );
};

export default withRouter(Header);
