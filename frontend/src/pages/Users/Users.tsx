import React, { useState } from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Table as UserTable, Avatar, Button, Modal, Spin, message } from 'antd';
import { ColumnProps } from 'antd/es/table';
import styled from 'styled-components';
import { useHasPermissions } from 'hooks';
import {
  useUsersQuery,
  useDeleteUserMutation,
  UsersDocument,
  UserDepartment,
  UserRole,
  UsersQuery,
} from 'generated/graphql';
import { UsersModal } from './UsersModal';

type UserQuery = UsersQuery['users'][0];

const { confirm } = Modal;

const imageRender = (image: string) => <Avatar src={image} alt="avatar" />;
const departmentRender = (departments: UserDepartment[]) => {
  let deptName = '';
  if (departments.length > 0) {
    deptName = departments[departments.length - 1].department.name;
  }
  return <span>{deptName}</span>;
};
const roleRender = (roles: UserRole[]) => {
  let userRole = '';
  if (roles.length > 0) {
    userRole = roles![roles.length - 1]!.role.name;
  }
  return <span>{userRole}</span>;
};

const columns: ColumnProps<UserQuery>[] = [
  {
    title: '',
    dataIndex: 'image',
    key: 'image',
    align: 'center',
    render: imageRender,
  },
  {
    title: 'Imię i nazwisko',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Rola w CodersCrew',
    dataIndex: 'roles',
    key: 'roles',
    render: roleRender,
  },
  {
    title: 'Obszar',
    key: 'departments',
    dataIndex: 'departments',
    render: departmentRender,
  },
  {
    title: 'E-mail',
    key: 'email',
    dataIndex: 'email',
  },
  {
    title: 'Telefon',
    key: 'phone',
    dataIndex: 'phone',
  },
];

const StyledButton = styled(Button)`
  margin: 3px;
  box-sizing: content-box;
  width: 40px;
  height: 30px;
`;

const getAdminColumns = (openEditModal: () => void, deleteUser: (variables: object) => void, setInitialValues: any) => {
  const ActionRender = (record: UserQuery) => {
    const { id, name, image, email, phone, profileURL } = record;
    const roles = record.roles!.length ? record.roles![0].role.id : '';
    const departments = record.departments!.length ? record.departments![0].department.id : '';
    const permissions = record.permissions[0];
    const currentValues = {
      id,
      name,
      image,
      profileURL,
      roles,
      departments,
      email,
      phone,
      permissions,
    };

    const handleEdit = () => {
      setInitialValues(currentValues);
      openEditModal();
    };

    const handleDelete = () => {
      confirm({
        title: 'Czy na pewno chcesz usunąć użytkownika?',
        async onOk() {
          await deleteUser({ variables: { id } });
          const hideLoading = message.loading('Trwa usuwanie użytkownika...', 0);
          hideLoading();
          message.success('Usunąłeś użytkownika', 4);
        },
        okText: 'Usuń',
        okType: 'danger',
        cancelText: 'Anuluj',
        icon: <DeleteOutlined style={{ color: '#cf1322' }} />,
      });
    };

    return (
      <span>
        <StyledButton key={`Edit${id}`} onClick={handleEdit}>
          Edytuj
        </StyledButton>
        <StyledButton key={`Delete${id}`} onClick={handleDelete}>
          Usuń
        </StyledButton>
      </span>
    );
  };

  return [
    ...columns,
    {
      title: 'Akcje',
      key: 'action',
      render: ActionRender,
    },
  ];
};

const Users = () => {
  const hasPermissions = useHasPermissions(['OWNER', 'ADMIN']);
  const refetchUsers = { refetchQueries: [{ query: UsersDocument }] };
  const [deleteUser] = useDeleteUserMutation(refetchUsers);
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[] | number[]>([]);

  const InitialValuesEmptyForm = {
    id: '',
    name: '',
    profileURL: undefined,
    roles: [],
    departments: [],
    email: '',
    phone: undefined,
    permissions: 'MEMBER',
    image: undefined,
  };

  const [initialValues, setInitialValues] = useState(InitialValuesEmptyForm);

  const openEditModal = () => {
    setModalType('edit');
    setVisible(true);
  };

  const openAddModal = () => {
    setModalType('add');
    setVisible(true);
  };

  const closeModal = () => setVisible(false);

  const { loading, data, error } = useUsersQuery();
  if (loading) return <Spin size="large" />;
  if (error) {
    const errorMsg = () => {
      message.error('Coś poszło nie tak');
    };
    return <div>{errorMsg}</div>;
  }

  const userList: UsersQuery['users'] = data!.users;

  // [TO DO] dorobić funkcjonalność edycji wielu userów
  const rowSelection: object = {
    onChange: (newSelectedRowKeys: string[] | number[], selectedRows: UsersQuery['users']) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };
  const hasSelected = selectedRowKeys.length > 0;
  const handleEditMany = () => {
    'TODO';
  };

  const handleAdd = () => {
    setInitialValues(InitialValuesEmptyForm);
    openAddModal();
  };

  if (hasPermissions) {
    return (
      <>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={handleEditMany} disabled={!hasSelected}>
            Edytuj wielu
          </Button>
          <span style={{ marginLeft: 8 }}>{hasSelected ? `Wybrano ${selectedRowKeys.length} elementów` : ''}</span>
          <Button
            onClick={handleAdd}
            type="primary"
            style={{ marginBottom: 16, float: 'right' }}
            icon={<PlusOutlined />}
          >
            Dodaj członka
          </Button>
        </div>
        <UserTable
          rowSelection={rowSelection}
          style={{ backgroundColor: 'white' }}
          columns={getAdminColumns(openEditModal, deleteUser, setInitialValues)}
          dataSource={userList}
          rowKey={(record) => record.id}
          pagination={false}
          size="middle"
        />
        <UsersModal type={modalType} visible={visible} closeModal={closeModal} initialValues={initialValues} />
      </>
    );
  }
  return (
    <UserTable
      style={{ backgroundColor: 'white' }}
      columns={columns}
      dataSource={userList}
      rowKey={(record) => record.id}
      pagination={false}
      size="middle"
    />
  );
};

export default Users;
