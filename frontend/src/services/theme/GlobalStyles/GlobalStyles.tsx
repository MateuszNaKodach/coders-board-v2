import React from 'react';
import { Global, css } from '@emotion/core';
import { normalizeCSS } from './normalizeCSS';

export const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        ${normalizeCSS}
      `}
    />
  );
};
