import React from 'react';
import { space } from 'styled-system';
import { Button as AntButton } from 'antd';
import { ButtonProps as AntButtonProps } from 'antd/lib/button';
import 'antd/lib/button/style/css';
import { styled, SpaceProps } from '@services/theme';

export type ButtonProps = AntButtonProps & SpaceProps;

const StyledButton = styled(AntButton, { preserve: ['size'] })(space);

export const Button = (props: ButtonProps) => <StyledButton {...props} />;
