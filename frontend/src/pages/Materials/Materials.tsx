import React, { useState } from 'react';
import { Row, Col, Button } from 'antd';
import styled from 'styled-components';
import { useMaterialsQuery } from 'generated/graphql';
import { PlusOutlined } from '@ant-design/icons';
import MaterialItem from './MaterialItem';
import MaterialsModal from './MaterialsModal';

const MaterialsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddMaterialButton = styled(Button)`
  margin-left: auto;
  margin-bottom: 32px;
`;

const MaterialsList = styled(Row)`
  position: relative;
  top: -24px;
`;

const StyledCol = styled(Col)`
  margin-top: 24px;
`;

const Materials = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, loading } = useMaterialsQuery();

  if (loading) return <div>Wczytywanie materiałów...</div>;

  const openModal = () => setIsModalOpen(true);
  const destroyModal = () => setIsModalOpen(false);

  return (
    <>
      <MaterialsContainer>
        <AddMaterialButton type="primary" icon={<PlusOutlined />} onClick={openModal}>
          Dodaj materiał
        </AddMaterialButton>
        <MaterialsList gutter={24}>
          {data!.materials.map((material) => (
            <StyledCol key={material.id} xs={24} xl={12}>
              <MaterialItem {...material} />
            </StyledCol>
          ))}
        </MaterialsList>
      </MaterialsContainer>
      {isModalOpen && <MaterialsModal destroyModal={destroyModal} />}
    </>
  );
};

export default Materials;
