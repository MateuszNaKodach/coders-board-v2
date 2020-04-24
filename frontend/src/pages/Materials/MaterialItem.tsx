import React from 'react';
import styled, { css } from 'styled-components';
import { Material } from 'generated/graphql';
import MaterialDropdown from './MaterialDropdown';

const MaterialContainer = styled.div`
  display: flex;
  width: 100%;
  height: 80px;

  &:hover {
    .ant-dropdown-trigger {
      visibility: visible;
      opacity: 1;
    }
  }

  ${({ theme }) => css`
    background-color: ${theme.colors.componentBackground};
    border: 1px solid ${theme.colors.border};
    border-radius: 4px;
  `}
`;

const Content = styled.div`
  width: 100%;
  padding: 16px 24px;
`;

const Image = styled.div<{ src: string }>`
  position: relative;
  width: 136px;
  min-width: 136px;
  background: url("${(props) => props.src}") no-repeat center/cover;
  border-radius: 4px 0 0 4px;

  + ${Content} {
    width: calc(100% - 136px);
  }
`;

const Name = styled.h4`
  width: fit-content;
  margin: 0;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  line-height: 22px;
  font-weight: 600;

  ${({ theme }) => css`
    color: ${theme.colors.text.title};
  `}
`;

const Tags = styled.div`
  position: relative;
  left: -4px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 20px;
  overflow: hidden;
`;

const Tag = styled.div`
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
  margin-left: 4px;
  cursor: pointer;

  ${({ theme }) => css`
    color: ${theme.colors.text.secondary};
  `}
`;

const MaterialItem = (material: Material) => {
  const { image, name, tags } = material;

  return (
    <MaterialContainer>
      {image && <Image src={image} />}
      <Content>
        <Name>{name}</Name>
        {tags && (
          <Tags>
            {tags.map((tag) => (
              <Tag key={tag.id}>#{tag.name}</Tag>
            ))}
          </Tags>
        )}
      </Content>
      <MaterialDropdown material={material} />
    </MaterialContainer>
  );
};

export default MaterialItem;
