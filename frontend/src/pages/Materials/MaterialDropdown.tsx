import React, { useState } from 'react';
import { DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import styled from 'styled-components';
import { pick } from 'lodash';
import { Material, MaterialTag } from 'generated/graphql';

import MaterialsModal from './MaterialsModal';
import { showDeleteConfirm } from './utils';
import { MaterialFormValues } from './types';

interface MaterialDropdownProps {
  material: Material;
}

const MaterialDropdownContainer = styled(Dropdown)`
  position: absolute;
  top: 12px;
  right: 20px;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;

// eslint-disable-next-line no-undef
const MoreIcon = styled(EllipsisOutlined)`
  font-size: 20px;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const parseTagsToValues = (tags?: MaterialTag[] | null): string[] => (tags ? tags.map(({ name }) => name) : []);

const parseMaterialToValues = (material: Material): MaterialFormValues => ({
  ...pick(material, ['id', 'image', 'name', 'url']),
  tags: parseTagsToValues(material.tags),
});

const menu = (editMaterial: () => void, deleteMaterial: () => void) => (
  <Menu>
    <Menu.Item onClick={editMaterial}>
      <EditOutlined />
      <span>Edytuj</span>
    </Menu.Item>
    <Menu.Item onClick={deleteMaterial}>
      <DeleteOutlined />
      <span>Usuń</span>
    </Menu.Item>
  </Menu>
);

const MaterialDropdown = ({ material }: MaterialDropdownProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const destroyModal = () => setIsModalOpen(false);
  const editMaterial = () => setIsModalOpen(true);
  const deleteMaterial = () => showDeleteConfirm(material.id);

  return (
    <>
      <MaterialDropdownContainer overlay={menu(editMaterial, deleteMaterial)} trigger={['click']}>
        <MoreIcon />
      </MaterialDropdownContainer>
      {isModalOpen && <MaterialsModal values={parseMaterialToValues(material)} destroyModal={destroyModal} />}
    </>
  );
};

export default MaterialDropdown;
