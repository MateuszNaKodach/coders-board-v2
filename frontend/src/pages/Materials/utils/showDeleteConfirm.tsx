import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { deleteMaterial } from '../resolvers';

const { confirm } = Modal;

export const showDeleteConfirm = (materialId: string) => {
  confirm({
    title: 'Czy jesteś pewiem, że chcesz usunąć ten materiał?',
    content: 'Tej operacji nie będziesz mógł cofnąć.',
    onOk: async () => {
      await deleteMaterial(materialId);
    },
    okText: 'Usuń materiał',
    okType: 'danger',
    cancelText: 'Pozostaw materiał',
    icon: <DeleteOutlined style={{ color: '#cf1322' }} />,
    maskClosable: true,
  });
};
