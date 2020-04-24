import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';

const LoadingOverlay = styled.main`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .ant-spin-text {
    margin-top: 12px;
    margin-bottom: 0;
    font-size: 16px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Preloader = () => (
  <LoadingOverlay>
    <div>
      <Spin size="large" />
      <h1 className="ant-spin-text">Wczytywanie CodersBoard...</h1>
    </div>
  </LoadingOverlay>
);
