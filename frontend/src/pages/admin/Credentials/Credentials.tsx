import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Row, Col, Button } from 'antd';
import { useCredentialsQuery } from 'generated/graphql';
import { CredentialsModal } from './CredentialsModal';
import { CredentialsCard } from './CredentialsCard';

export type ModalState = null | {
  id?: string;
  name?: string;
  login?: string;
  password?: string;
};

export interface ModalData {
  id: string;
  name: string;
  login: string;
  password: string;
}

export const Credentials = () => {
  const [modal, setModal] = useState<ModalState>(null);
  const [type, setType] = useState<string>('edit');

  const closeModal = () => setModal(null);
  const openEditModal = (data: ModalData) => {
    setType('edit');
    setModal(data);
  };
  const openAddModal = () => {
    setType('add');
    setModal({ name: '', login: '', password: '' });
  };

  const { loading, data } = useCredentialsQuery();

  if (loading) {
    return null;
  }
  return (
    <>
      <Row justify="end">
        <Col>
          <Button
            style={{ marginBottom: '32px' }}
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={openAddModal}
          >
            <span>Dodaj dostęp</span>
          </Button>
        </Col>
      </Row>
      <CredentialsModal initialValues={modal} closeModal={closeModal} visible={Boolean(modal)} type={type} />
      <Row gutter={16}>
        {data!.credentials.map((credential) => (
          <CredentialsCard
            key={credential.id}
            openEditModal={() => openEditModal(credential)}
            credential={credential}
          />
        ))}
      </Row>
    </>
  );
};
