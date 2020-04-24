import React from 'react';
import { MoreOutlined } from '@ant-design/icons';
import { Col, Menu, Dropdown, Modal, message } from 'antd';
import styled, { css } from 'styled-components';
// import { CredentialsDocument, useDeleteCredentialMutation } from 'generated/graphql';

const ItemContainer = styled.div`
  padding: 16px 23px 16px 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 4px;
  margin-bottom: 20px;
  box-sizing: border-box;
  ${({ theme }) => css`
    color: ${theme.colors.text.primary};
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.border};
  `}
`;

const Credential = styled.div`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Name = styled.h2`
  color: ${({ theme }) => theme.colors.text.title};
  margin-bottom: 8px;
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
`;

const Login = styled.p`
  margin-bottom: 4px;
  font-weight: 600;
`;

const Password = styled(Login)`
  margin: 0;
`;

interface CredentialTypes {
  id: string;
  name: string;
  login: string;
  password: string;
}

interface CredentialsCardPropsTypes {
  credential: CredentialTypes;
  openEditModal(): void;
}

export const CredentialsCard = ({ credential, openEditModal }: CredentialsCardPropsTypes) => {
  const { id, name, login, password } = credential;
  const { confirm } = Modal;
  // const refetchCredentials = { refetchQueries: [{ query: CredentialsDocument }] };
  // const [deleteCredential] = useDeleteCredentialMutation(refetchCredentials);

  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={openEditModal}>
        <span>Edytuj</span>
      </Menu.Item>
      <Menu.Item
        key="1"
        onClick={() =>
          confirm({
            title: 'Czy chcesz usunąć dany dostęp?',
            onOk() {
              // deleteCredential({ variables: { where: { id } } });
              setTimeout(() => {
                message.success('Usunięto dostęp');
              }, 600);
            },
          })
        }
      >
        <span>Usuń</span>
      </Menu.Item>
    </Menu>
  );

  const dropdown = (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter">
      <div className="ant-dropdown-link">
        <MoreOutlined style={{ cursor: 'pointer' }} />
      </div>
    </Dropdown>
  );

  return (
    <Col sm={12} md={8} lg={6}>
      <ItemContainer key={id}>
        <Credential>
          <Name>{name}</Name>
          <Login>
            Login:
            {login}
          </Login>
          <Password>
            Hasło:
            {password}
          </Password>
        </Credential>
        <div>{dropdown}</div>
      </ItemContainer>
    </Col>
  );
};
